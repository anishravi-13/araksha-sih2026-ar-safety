import React, { useState } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Bluetooth, 
  Radio, 
  CheckCircle2, 
  RefreshCw, 
  Smartphone, 
  Server, 
  Database, 
  Lock, 
  X 
} from 'lucide-react';
import { soundEffects } from '../utils/speech';

interface OfflineMeshSyncModalProps {
  onClose: () => void;
  pendingCount: number;
  onSyncComplete: () => void;
}

export const OfflineMeshSyncModal: React.FC<OfflineMeshSyncModalProps> = ({
  onClose,
  pendingCount,
  onSyncComplete
}) => {
  const [syncing, setSyncing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [synced, setSynced] = useState(false);

  const handleStartSync = () => {
    soundEffects.playClick();
    setSyncing(true);
    setProgress(15);

    setTimeout(() => setProgress(45), 600);
    setTimeout(() => setProgress(75), 1200);
    setTimeout(() => {
      setProgress(100);
      setSyncing(false);
      setSynced(true);
      soundEffects.playSuccess();
      onSyncComplete();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Underground Pithead Mesh Sync</h3>
              <p className="text-[11px] text-slate-400">P2P Bluetooth &amp; Local Wi-Fi Data Relay</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mesh Network Visual Graphic */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center justify-around relative overflow-hidden">
          {/* Node 1: Worker Phone Underground */}
          <div className="flex flex-col items-center space-y-1 text-center z-10">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white">Miner's Phone</span>
            <span className="text-[10px] text-slate-400">Underground Drift</span>
            <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
              SQLite Encrypted
            </span>
          </div>

          {/* Sync Signal Wave in Between */}
          <div className="flex-1 px-4 flex flex-col items-center justify-center relative">
            <div className={`w-full h-1 rounded-full overflow-hidden bg-slate-800 ${syncing ? 'animate-pulse' : ''}`}>
              <div 
                className="h-full bg-gradient-to-r from-amber-500 via-blue-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center space-x-1 text-[11px] text-blue-400 font-semibold">
              <Bluetooth className="w-3.5 h-3.5" />
              <span>Mesh Relay</span>
            </div>
          </div>

          {/* Node 2: Supervisor Surface Hub */}
          <div className="flex flex-col items-center space-y-1 text-center z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow">
              <Server className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white">Pithead Console</span>
            <span className="text-[10px] text-slate-400">Surface Office</span>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              DGMS Cloud
            </span>
          </div>
        </div>

        {/* Sync Stats */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between p-3 bg-slate-800/80 rounded-xl border border-slate-700">
            <span className="text-slate-400">Pending Underground Logs:</span>
            <span className="font-mono font-bold text-amber-400">{synced ? 0 : pendingCount} Assessments</span>
          </div>
          <div className="flex justify-between p-3 bg-slate-800/80 rounded-xl border border-slate-700">
            <span className="text-slate-400">Local Security:</span>
            <span className="font-mono text-emerald-400 flex items-center space-x-1">
              <Lock className="w-3 h-3 inline" />
              <span>AES-256 Encrypted SQLite</span>
            </span>
          </div>
          <div className="flex justify-between p-3 bg-slate-800/80 rounded-xl border border-slate-700">
            <span className="text-slate-400">Sync Destination:</span>
            <span className="font-semibold text-white">BCCL Dhanbad Central Safety Node</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {synced ? (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 text-center font-bold text-xs flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>All records synced successfully to pithead hub!</span>
            </div>
          ) : (
            <button
              onClick={handleStartSync}
              disabled={syncing}
              className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center space-x-2 transition-all shadow-xl cursor-pointer ${
                syncing 
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/20'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? `Synchronizing Mesh (${progress}%)...` : `Trigger Pithead Mesh Sync (${pendingCount} Records)`}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
