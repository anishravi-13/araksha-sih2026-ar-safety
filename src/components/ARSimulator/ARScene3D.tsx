import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ScenarioId } from '../../types';

interface ARScene3DProps {
  scenarioId: ScenarioId;
  stepProgress: number; // 0 to 5
  hazardActive: boolean;
  cameraPassthrough: boolean;
  onObjectClick?: (objectName: string) => void;
  isExtinguishing?: boolean;
}

export const ARScene3D: React.FC<ARScene3DProps> = ({
  scenarioId,
  stepProgress,
  hazardActive,
  cameraPassthrough,
  onObjectClick,
  isExtinguishing = false
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particleGroupRef = useRef<THREE.Points | null>(null);
  const foamParticlesRef = useRef<THREE.Points | null>(null);
  const dynamicMeshesRef = useRef<{ [key: string]: THREE.Object3D }>({});
  const animFrameId = useRef<number | null>(null);
  const isMouseDownRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraAngleRef = useRef({ x: 0, y: 1.8, z: 4.8 });

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    if (!cameraPassthrough) {
      scene.background = new THREE.Color(scenarioId === 'gas_leak' ? 0x090d16 : 0x0f172a);
      // Atmospheric fog
      scene.fog = new THREE.FogExp2(scenarioId === 'gas_leak' ? 0x090d16 : 0x0f172a, 0.05);
    } else {
      scene.background = null;
    }

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 4.8);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing & tone mapping for rich visuals
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, scenarioId === 'gas_leak' ? 0.45 : 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff3e0, 1.5);
    keyLight.position.set(4, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Hazard strobe light (red / emergency amber)
    const strobeLight = new THREE.PointLight(0xff1e00, 0, 16);
    strobeLight.position.set(0, 3.2, 0);
    scene.add(strobeLight);

    // 5. Floor & Runway Grid
    const floorGeo = new THREE.PlaneGeometry(20, 24);
    const floorMat = new THREE.MeshStandardMaterial({ 
      color: scenarioId === 'gas_leak' ? 0x111622 : 0x1e293b, 
      roughness: 0.75,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid lines for AR spatial anchoring
    const grid = new THREE.GridHelper(20, 20, 0xf59e0b, 0x334155);
    grid.position.y = 0.01;
    scene.add(grid);

    dynamicMeshesRef.current = {};

    // 6. BUILD VIBRANT 3D OBJECTS PER SCENARIO
    if (scenarioId === 'gas_leak') {
      // Underground Mine Drift Environment
      // Timber Cribbing & Support Beams
      const timberMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
      for (let z = -8; z <= 4; z += 3) {
        // Left Column
        const leftPost = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.2, 0.35), timberMat);
        leftPost.position.set(-2.8, 1.6, z);
        leftPost.castShadow = true;
        scene.add(leftPost);
        // Right Column
        const rightPost = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.2, 0.35), timberMat);
        rightPost.position.set(2.8, 1.6, z);
        rightPost.castShadow = true;
        scene.add(rightPost);
        // Top Crossbeam
        const topBeam = new THREE.Mesh(new THREE.BoxGeometry(5.9, 0.35, 0.35), timberMat);
        topBeam.position.set(0, 3.1, z);
        topBeam.castShadow = true;
        scene.add(topBeam);
      }

      // Mine Tracks
      const trackMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
      const rail1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 20), trackMat);
      rail1.position.set(-0.7, 0.05, 0);
      scene.add(rail1);
      const rail2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 20), trackMat);
      rail2.position.set(0.7, 0.05, 0);
      scene.add(rail2);

      // Sleepers
      const sleeperMat = new THREE.MeshStandardMaterial({ color: 0x451a03 });
      for (let z = -9; z <= 6; z += 1.2) {
        const sleeper = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.06, 0.2), sleeperMat);
        sleeper.position.set(0, 0.03, z);
        scene.add(sleeper);
      }

      // Gas Particle Cloud (Methane CH4 / Toxic vapour)
      const particleCount = 350;
      const particleGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 4.5;
        posArray[i + 1] = Math.random() * 2.8 + 0.3;
        posArray[i + 2] = (Math.random() - 0.5) * 7 - 1;
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.22,
        color: 0x10b981,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });
      const gasParticles = new THREE.Points(particleGeo, particleMat);
      scene.add(gasParticles);
      particleGroupRef.current = gasParticles;

      // Auxiliary Ventilation Duct Tube & Fan
      const ductMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.3, roughness: 0.4 });
      const ventDuct = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 14, 24), ductMat);
      ventDuct.rotation.x = Math.PI / 2;
      ventDuct.position.set(2.2, 2.7, 0);
      ventDuct.castShadow = true;
      scene.add(ventDuct);
      dynamicMeshesRef.current['ventDuct'] = ventDuct;

      // Ventilation Fan Blades inside mouth
      const fanGroup = new THREE.Group();
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
      for (let b = 0; b < 4; b++) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.02), bladeMat);
        blade.rotation.z = (b * Math.PI) / 2;
        fanGroup.add(blade);
      }
      fanGroup.position.set(2.2, 2.7, 3);
      scene.add(fanGroup);
      dynamicMeshesRef.current['fanBlades'] = fanGroup;

      // Multi-Gas Detector handheld device placed on inspection stand
      const detectorGroup = new THREE.Group();
      const detBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.6, 0.15),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 })
      );
      const detScreen = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.25, 0.02),
        new THREE.MeshBasicMaterial({ color: 0x10b981 })
      );
      detScreen.position.set(0, 0.1, 0.08);
      detectorGroup.add(detBody);
      detectorGroup.add(detScreen);
      detectorGroup.position.set(-1.2, 1.2, 1.5);
      detectorGroup.name = 'detector';
      scene.add(detectorGroup);
      dynamicMeshesRef.current['detector'] = detectorGroup;

      // Glowing Green Laser Escape Route Arrows on Ground
      const arrowGroup = new THREE.Group();
      const arrowMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      for (let z = 3; z >= -7; z -= 2) {
        const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.5, 12), arrowMat);
        arrow.rotation.x = -Math.PI / 2;
        arrow.position.set(0, 0.06, z);
        arrowGroup.add(arrow);
      }
      scene.add(arrowGroup);
      dynamicMeshesRef.current['arrows'] = arrowGroup;

    } else if (scenarioId === 'loto') {
      // Industrial Machinery & LOTO Station
      // Heavy Conveyor Drive & Machine Housing
      const machineMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.4, roughness: 0.3 });
      const machineBody = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.3, 2.2), machineMat);
      machineBody.position.set(0, 0.65, -0.8);
      machineBody.castShadow = true;
      machineBody.receiveShadow = true;
      scene.add(machineBody);

      // Rotating Conveyor Belt Rollers
      const rollerGroup = new THREE.Group();
      const rollerMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
      for (let i = -1.4; i <= 1.4; i += 0.55) {
        const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 2.0, 18), rollerMat);
        roller.rotation.z = Math.PI / 2;
        roller.position.set(0, 1.45, -0.8 + i * 0.4);
        rollerGroup.add(roller);
      }
      scene.add(rollerGroup);
      dynamicMeshesRef.current['rollers'] = rollerGroup;

      // 415V Heavy Duty Control Cabinet
      const panelMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.35, metalness: 0.3 });
      const panel = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.3, 0.45), panelMat);
      panel.position.set(-2.2, 1.25, 0.2);
      panel.castShadow = true;
      panel.name = 'breaker_panel';
      scene.add(panel);
      dynamicMeshesRef.current['panel'] = panel;

      // Main Breaker Switch Lever
      const handleMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.5 });
      const leverHandle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.4, 0.18), handleMat);
      leverHandle.position.set(-2.2, 1.55, 0.45);
      leverHandle.name = 'switch_handle';
      scene.add(leverHandle);
      dynamicMeshesRef.current['switchHandle'] = leverHandle;

      // Padlock & Locking Hasp (Golden Brass)
      const lockMat = new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.9, roughness: 0.15 });
      const lock = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.24, 0.1), lockMat);
      lock.position.set(-2.2, 1.35, 0.5);
      lock.name = 'padlock';
      lock.visible = stepProgress >= 2;
      scene.add(lock);
      dynamicMeshesRef.current['padlock'] = lock;

      // DGMS Warning Danger Tag
      const tagMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
      const dangerTag = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.32, 0.02), tagMat);
      dangerTag.position.set(-2.2, 1.15, 0.52);
      dangerTag.name = 'danger_tag';
      dangerTag.visible = stepProgress >= 3;
      scene.add(dangerTag);
      dynamicMeshesRef.current['dangerTag'] = dangerTag;

      // Zero-Energy Test Push Button
      const buttonMat = new THREE.MeshStandardMaterial({ color: 0x10b981 });
      const testBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.06, 16), buttonMat);
      testBtn.rotation.x = Math.PI / 2;
      testBtn.position.set(-2.2, 0.85, 0.45);
      testBtn.name = 'test_btn';
      scene.add(testBtn);
      dynamicMeshesRef.current['testBtn'] = testBtn;

    } else if (scenarioId === 'fire_evacuation') {
      // Factory Floor Electrical Fire
      // Industrial Machinery Unit
      const machineMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
      const machine = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 1.8), machineMat);
      machine.position.set(0, 0.8, -1.8);
      machine.castShadow = true;
      scene.add(machine);

      // Fire Particles Simulation
      const fireCount = 400;
      const fireGeo = new THREE.BufferGeometry();
      const firePos = new Float32Array(fireCount * 3);
      for (let i = 0; i < fireCount * 3; i += 3) {
        firePos[i] = (Math.random() - 0.5) * 1.8;
        firePos[i + 1] = Math.random() * 2.2 + 1.2;
        firePos[i + 2] = (Math.random() - 0.5) * 1.8 - 1.8;
      }
      fireGeo.setAttribute('position', new THREE.BufferAttribute(firePos, 3));
      const fireMat = new THREE.PointsMaterial({
        size: 0.3,
        color: 0xff3b00,
        transparent: true,
        opacity: stepProgress >= 4 ? 0.05 : stepProgress >= 3 ? 0.3 : 0.85,
        blending: THREE.AdditiveBlending
      });
      const fireParticles = new THREE.Points(fireGeo, fireMat);
      scene.add(fireParticles);
      particleGroupRef.current = fireParticles;

      // 3D Fire Extinguisher (Universal PASS Tool)
      const extGroup = new THREE.Group();
      const cylMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.25, metalness: 0.3 });
      const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.85, 24), cylMat);
      cylinder.castShadow = true;
      extGroup.add(cylinder);

      // Handle & Nozzle
      const handleMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.7 });
      const extHandle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 0.15), handleMat);
      extHandle.position.set(0, 0.5, 0);
      extGroup.add(extHandle);

      // Extinguisher Hose
      const hoseMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.8 });
      const hose = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6, 12), hoseMat);
      hose.position.set(0.15, 0.2, 0.15);
      hose.rotation.z = Math.PI / 6;
      extGroup.add(hose);

      extGroup.position.set(1.4, 0.45, 0.8);
      extGroup.name = 'extinguisher';
      scene.add(extGroup);
      dynamicMeshesRef.current['extinguisher'] = extGroup;

      // White Extinguisher Foam Spray Stream
      const foamCount = 200;
      const foamGeo = new THREE.BufferGeometry();
      const foamPos = new Float32Array(foamCount * 3);
      for (let i = 0; i < foamCount * 3; i += 3) {
        foamPos[i] = 1.4 - Math.random() * 1.5;
        foamPos[i + 1] = 0.6 + Math.random() * 1.2;
        foamPos[i + 2] = 0.8 - Math.random() * 2.8;
      }
      foamGeo.setAttribute('position', new THREE.BufferAttribute(foamPos, 3));
      const foamMat = new THREE.PointsMaterial({
        size: 0.2,
        color: 0xffffff,
        transparent: true,
        opacity: stepProgress >= 3 ? 0.7 : 0,
        blending: THREE.AdditiveBlending
      });
      const foamParticles = new THREE.Points(foamGeo, foamMat);
      scene.add(foamParticles);
      foamParticlesRef.current = foamParticles;

      // Emergency Exit Doorway in the Distance
      const exitDoor = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 3.0, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4 })
      );
      exitDoor.position.set(0, 1.5, 7.5);
      scene.add(exitDoor);

      const exitSign = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.3, 0.05),
        new THREE.MeshBasicMaterial({ color: 0x4ade80 })
      );
      exitSign.position.set(0, 3.2, 7.4);
      scene.add(exitSign);
    }

    // 7. ORBIT / PAN INTERACTION (Mouse drag / touch)
    const handleMouseDown = (e: MouseEvent) => {
      isMouseDownRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDownRef.current || !cameraRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      cameraAngleRef.current.x = Math.max(-2, Math.min(2, cameraAngleRef.current.x - deltaX * 0.005));
      cameraAngleRef.current.y = Math.max(1.0, Math.min(3.0, cameraAngleRef.current.y + deltaY * 0.005));

      cameraRef.current.position.x = cameraAngleRef.current.x;
      cameraRef.current.position.y = cameraAngleRef.current.y;
      cameraRef.current.lookAt(0, 1.2, 0);

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
    };

    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      if (!mountRef.current || !onObjectClick || !cameraRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseVector, cameraRef.current);
      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        const topObject = intersects[0].object;
        onObjectClick(topObject.name || '3d_interactive_element');
      }
    };

    mountRef.current.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    mountRef.current.addEventListener('click', handleClick);

    // 8. ANIMATION LOOP
    const clock = new THREE.Clock();
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Hazard strobe animation
      if (hazardActive && strobeLight) {
        strobeLight.intensity = Math.sin(elapsedTime * 9) > 0 ? 3.5 : 0.2;
      } else if (strobeLight) {
        strobeLight.intensity = 0;
      }

      // Fan rotation (Gas leak scenario)
      if (dynamicMeshesRef.current['fanBlades']) {
        const speed = stepProgress >= 3 ? 15 : 1;
        dynamicMeshesRef.current['fanBlades'].rotation.z += speed * 0.02;
      }

      // Conveyor roller rotation (LOTO scenario - stops when locked out)
      if (dynamicMeshesRef.current['rollers']) {
        if (stepProgress < 2) {
          dynamicMeshesRef.current['rollers'].children.forEach(r => {
            r.rotation.x += 0.04;
          });
        }
      }

      // Gas particles movement
      if (particleGroupRef.current) {
        const positions = particleGroupRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += stepProgress >= 3 ? 0.03 : 0.012;
          if (positions[i] > 3.6) {
            positions[i] = scenarioId === 'gas_leak' ? 0.3 : 1.2;
          }
        }
        particleGroupRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Foam spray animation
      if (foamParticlesRef.current && stepProgress >= 3) {
        const positions = foamParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 2; i < positions.length; i += 3) {
          positions[i] -= 0.08;
          if (positions[i] < -2.5) {
            positions[i] = 0.8;
          }
        }
        foamParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousedown', handleMouseDown);
        mountRef.current.removeEventListener('click', handleClick);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [scenarioId, cameraPassthrough]);

  // Update dynamic elements when stepProgress updates
  useEffect(() => {
    if (dynamicMeshesRef.current['switchHandle']) {
      dynamicMeshesRef.current['switchHandle'].rotation.z = stepProgress >= 2 ? Math.PI / 2 : 0;
    }
    if (dynamicMeshesRef.current['padlock']) {
      dynamicMeshesRef.current['padlock'].visible = stepProgress >= 3;
    }
    if (dynamicMeshesRef.current['dangerTag']) {
      dynamicMeshesRef.current['dangerTag'].visible = stepProgress >= 4;
    }
    if (foamParticlesRef.current) {
      const mat = foamParticlesRef.current.material as THREE.PointsMaterial;
      mat.opacity = stepProgress === 3 || isExtinguishing ? 0.75 : 0;
    }
  }, [stepProgress, isExtinguishing]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Helpful drag-to-look hint */}
      <div className="absolute bottom-2 left-2 pointer-events-none px-2.5 py-1 bg-slate-900/80 backdrop-blur-md rounded-lg text-[10px] text-slate-400 border border-slate-700/60 flex items-center space-x-1.5">
        <span>🔄 Drag to rotate view</span>
        <span>•</span>
        <span className="text-amber-400 font-semibold">Click elements to interact</span>
      </div>
    </div>
  );
};
