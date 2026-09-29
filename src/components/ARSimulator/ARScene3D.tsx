import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ScenarioId } from '../../types';

interface ARScene3DProps {
  scenarioId: ScenarioId;
  stepProgress: number; // 0 to 4
  hazardActive: boolean;
  cameraPassthrough: boolean;
  onObjectClick?: (objectName: string) => void;
}

export const ARScene3D: React.FC<ARScene3DProps> = ({
  scenarioId,
  stepProgress,
  hazardActive,
  cameraPassthrough,
  onObjectClick
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particleGroupRef = useRef<THREE.Points | null>(null);
  const dynamicMeshesRef = useRef<{ [key: string]: THREE.Object3D }>({});
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    if (!cameraPassthrough) {
      scene.background = new THREE.Color(scenarioId === 'gas_leak' ? 0x07090e : 0x111827);
    } else {
      scene.background = null; // transparent for camera feed overlay
    }

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 4.5);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing and alpha transparency for AR overlay
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, scenarioId === 'gas_leak' ? 0.35 : 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffeedd, 1.2);
    mainLight.position.set(3, 8, 4);
    mainLight.castShadow = true;
    scene.add(mainLight);

    // Hazard strobe light (red / amber)
    const strobeLight = new THREE.PointLight(0xff2200, 0, 15);
    strobeLight.position.set(0, 3, 0);
    scene.add(strobeLight);

    // 5. Floor & Industrial Environment
    const floorGeo = new THREE.PlaneGeometry(16, 24);
    const floorMat = new THREE.MeshStandardMaterial({ 
      color: scenarioId === 'gas_leak' ? 0x181a20 : 0x242833, 
      roughness: 0.85 
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid lines for AR spatial anchoring
    const grid = new THREE.GridHelper(16, 16, 0xf59e0b, 0x374151);
    grid.position.y = 0.01;
    scene.add(grid);

    // 6. Build Scenario-Specific 3D Models
    dynamicMeshesRef.current = {};

    if (scenarioId === 'gas_leak') {
      // Underground Mine Shaft Props
      // Timber Support Beams (Cribbing)
      for (let z = -6; z <= 4; z += 3) {
        const postMat = new THREE.MeshStandardMaterial({ color: 0x5c4033 });
        // Left post
        const leftPost = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3, 0.3), postMat);
        leftPost.position.set(-2.5, 1.5, z);
        scene.add(leftPost);
        // Right post
        const rightPost = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3, 0.3), postMat);
        rightPost.position.set(2.5, 1.5, z);
        scene.add(rightPost);
        // Top beam
        const topBeam = new THREE.Mesh(new THREE.BoxGeometry(5.3, 0.3, 0.3), postMat);
        topBeam.position.set(0, 3, z);
        scene.add(topBeam);
      }

      // Mine Cart Tracks
      const trackMat = new THREE.MeshStandardMaterial({ color: 0x71717a, metalness: 0.8 });
      const rail1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 20), trackMat);
      rail1.position.set(-0.6, 0.05, 0);
      scene.add(rail1);
      const rail2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 20), trackMat);
      rail2.position.set(0.6, 0.05, 0);
      scene.add(rail2);

      // Gas Hazard Particle Cloud (Methane / Toxic dust)
      const particleCount = 200;
      const particleGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 4;
        posArray[i + 1] = Math.random() * 2.5 + 0.2;
        posArray[i + 2] = (Math.random() - 0.5) * 6 - 2;
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.18,
        color: 0x10b981,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });
      const gasParticles = new THREE.Points(particleGeo, particleMat);
      scene.add(gasParticles);
      particleGroupRef.current = gasParticles;

      // Auxiliary Ventilation Duct Tube
      const ventGeo = new THREE.CylinderGeometry(0.4, 0.4, 12, 16);
      const ventMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.5 });
      const ventDuct = new THREE.Mesh(ventGeo, ventMat);
      ventDuct.rotation.x = Math.PI / 2;
      ventDuct.position.set(2.2, 2.6, 0);
      scene.add(ventDuct);
      dynamicMeshesRef.current['ventDuct'] = ventDuct;

      // AR Green Laser Escape Route Arrows on Floor
      const arrowMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      for (let z = 2; z >= -6; z -= 2) {
        const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.4, 8), arrowMat);
        arrow.rotation.x = -Math.PI / 2;
        arrow.position.set(0, 0.05, z);
        scene.add(arrow);
      }

    } else if (scenarioId === 'loto') {
      // Industrial Machinery & Lockout-Tagout Station
      // Main Machine Base (Conveyor Drive)
      const machineMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4, metalness: 0.4 });
      const machineBase = new THREE.Mesh(new THREE.BoxGeometry(3, 1.2, 2), machineMat);
      machineBase.position.set(0, 0.6, -1);
      scene.add(machineBase);

      // Conveyor Belt Rollers
      const rollerMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.9 });
      for (let i = -1.2; i <= 1.2; i += 0.6) {
        const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.8, 16), rollerMat);
        roller.rotation.z = Math.PI / 2;
        roller.position.set(0, 1.3, -1 + i * 0.4);
        scene.add(roller);
      }

      // Electrical Control Cabinet (415V Breaker)
      const cabinetMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3 });
      const cabinet = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 0.4), cabinetMat);
      cabinet.position.set(-2, 1.1, 0);
      scene.add(cabinet);
      dynamicMeshesRef.current['cabinet'] = cabinet;

      // Safety Breaker Switch Handle
      const switchHandleMat = new THREE.MeshStandardMaterial({ color: 0xdc2626 });
      const switchHandle = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.3, 0.15), switchHandleMat);
      switchHandle.position.set(-2, 1.4, 0.25);
      scene.add(switchHandle);
      dynamicMeshesRef.current['switchHandle'] = switchHandle;

      // Heavy Padlock & Hasp (Visible when step >= 2)
      const lockMat = new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.8 });
      const padlock = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 0.08), lockMat);
      padlock.position.set(-2, 1.25, 0.28);
      padlock.visible = stepProgress >= 2;
      scene.add(padlock);
      dynamicMeshesRef.current['padlock'] = padlock;

      // Danger Tag (Visible when step >= 3)
      const tagMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const dangerTag = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.25, 0.01), tagMat);
      dangerTag.position.set(-2, 1.1, 0.29);
      dangerTag.visible = stepProgress >= 3;
      scene.add(dangerTag);
      dynamicMeshesRef.current['dangerTag'] = dangerTag;

    } else if (scenarioId === 'fire_evacuation') {
      // Factory Floor Fire Scenario
      // Industrial Generator / Machine on Fire
      const genMat = new THREE.MeshStandardMaterial({ color: 0x374151 });
      const generator = new THREE.Mesh(new THREE.BoxGeometry(2, 1.5, 1.5), genMat);
      generator.position.set(0, 0.75, -2);
      scene.add(generator);

      // Fire Particles Simulation
      const fireCount = 250;
      const fireGeo = new THREE.BufferGeometry();
      const firePos = new Float32Array(fireCount * 3);
      for (let i = 0; i < fireCount * 3; i += 3) {
        firePos[i] = (Math.random() - 0.5) * 1.5;
        firePos[i + 1] = Math.random() * 2 + 1.2;
        firePos[i + 2] = (Math.random() - 0.5) * 1.5 - 2;
      }
      fireGeo.setAttribute('position', new THREE.BufferAttribute(firePos, 3));
      const fireMat = new THREE.PointsMaterial({
        size: 0.25,
        color: 0xff4500,
        transparent: true,
        opacity: stepProgress >= 3 ? 0.2 : 0.85,
        blending: THREE.AdditiveBlending
      });
      const fireParticles = new THREE.Points(fireGeo, fireMat);
      scene.add(fireParticles);
      particleGroupRef.current = fireParticles;

      // 3D Fire Extinguisher (PASS tool)
      const extMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3 });
      const extinguisher = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.8, 16), extMat);
      extinguisher.position.set(1.5, 0.4, 0.5);
      scene.add(extinguisher);
      dynamicMeshesRef.current['extinguisher'] = extinguisher;

      // Emergency Exit Doorway in the Distance
      const doorMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true });
      const door = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.8, 0.1), doorMat);
      door.position.set(0, 1.4, 6);
      scene.add(door);
    }

    // 7. Raycasting for Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!mountRef.current || !onObjectClick) return;
      const rect = mountRef.current.getBoundingClientRect();
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        onObjectClick(hit.name || 'interactive_element');
      }
    };

    mountRef.current.addEventListener('pointerdown', handlePointerDown);

    // 8. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate hazard strobe
      if (hazardActive) {
        strobeLight.intensity = Math.sin(elapsedTime * 8) > 0 ? 3.5 : 0.2;
      } else {
        strobeLight.intensity = 0;
      }

      // Animate gas / fire particles
      if (particleGroupRef.current) {
        const positions = particleGroupRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.015;
          if (positions[i] > 3.5) {
            positions[i] = scenarioId === 'gas_leak' ? 0.3 : 1.2;
          }
        }
        particleGroupRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Subtle camera breathing
      camera.position.x = Math.sin(elapsedTime * 0.4) * 0.2;

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
        mountRef.current.removeEventListener('pointerdown', handlePointerDown);
      }
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [scenarioId, cameraPassthrough]);

  // Update dynamic step objects when stepProgress changes
  useEffect(() => {
    if (dynamicMeshesRef.current['padlock']) {
      dynamicMeshesRef.current['padlock'].visible = stepProgress >= 2;
    }
    if (dynamicMeshesRef.current['dangerTag']) {
      dynamicMeshesRef.current['dangerTag'].visible = stepProgress >= 3;
    }
    if (dynamicMeshesRef.current['switchHandle']) {
      dynamicMeshesRef.current['switchHandle'].rotation.z = stepProgress >= 1 ? Math.PI / 2 : 0;
    }
  }, [stepProgress]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl">
      <div ref={mountRef} className="w-full h-full cursor-crosshair" />
    </div>
  );
};
