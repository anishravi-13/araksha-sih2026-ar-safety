import React, { useState } from 'react';
import { 
  Bluetooth, 
  Radio, 
  CheckCircle2, 
  RefreshCw, 
  Smartphone, 
  Server, 
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
    setProgress(20);

    setTimeout(() => setProgress(50), 500);
    setTimeout(() => setProgress(80), 1000);
    setTimeout(() => {
      setProgress(100);
      setSyncing(false);
      setSynced(true);
      soundEffects.playSuccess();
      onSyncComplete();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#111726] border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <span className="p-2 rounded-lg bg-slate-800 text-cyan-400">
              <Radio className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Underground Field Data Relay</h3>
              <p className="text-[11px] text-slate-400">Local Bluetooth / Wi-Fi Mesh Synchronization</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mesh Diagram */}
        <div className="bg-[#090d16] p-5 rounded-xl border border-slate-800 flex items-center justify-around relative">
          <div className="flex flex-col items-center space-y-1 text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-white">Field Terminal</span>
            <span className="text-[10px] text-slate-400">Underground Incline</span>
            <span className="text-[9px] font-mono text-amber-400 bg-amber-950/40 px-1.5 py-0.2 rounded border border-amber-800/30">
              Local SQLite
            </span>
          </div>

          <div className="flex-1 px-4 flex flex-col items-center justify-center">
            <div className="w-full h-1 rounded-full overflow-hidden bg-slate-800">
              <div 
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center space-x-1 text-[10px] text-slate-400">
              <Bluetooth className="w-3 h-3 text-cyan-400" />
              <span>P2P Relay Active</span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-1 text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
              <Server className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-white">Surface Hub</span>
            <span className="text-[10px] text-slate-400">Operations Room</span>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-800/30">
              Master Sync
            </span>
          </div>
        </div>

        {/* Sync Stats */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between p-2.5 bg-[#090d16] rounded-lg border border-slate-800">
            <span className="text-slate-400">Pending Field Records:</span>
            <span className="font-mono font-bold text-amber-400">{synced ? 0 : pendingCount} Records</span>
          </div>
          <div className="flex justify-between p-2.5 bg-[#090d16] rounded-lg border border-slate-800">
            <span className="text-slate-400">Encryption Standard:</span>
            <span className="font-mono text-slate-300 flex items-center space-x-1">
              <Lock className="w-3 h-3 inline text-emerald-400" />
              <span>AES-256 Validated</span>
            </span>
          </div>
        </div>

        {/* Action */}
        <div>
          {synced ? (
            <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-center font-semibold text-xs flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>All records synced successfully to surface hub.</span>
            </div>
          ) : (
            <button
              onClick={handleStartSync}
              disabled={syncing}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors cursor-pointer ${
                syncing 
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? `Syncing Data (${progress}%)...` : `Trigger Surface Sync (${pendingCount} Records)`}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
