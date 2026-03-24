// frontend/src/components/CallModal.tsx
import { useEffect, useRef, useState } from 'react';
import { RtcTokenType, RtcRole } from 'agora-rtc-sdk-ng'; // Alternative: Pure WebRTC
import { Phone, Mic, Video, Volume2, X } from 'lucide-react';

interface Props {
  isIncoming: boolean;
  caller: string;
  onAccept: () => void;
  onReject: () => void;
}

const CallModal = ({ isIncoming, caller, onAccept, onReject }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-8">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
          <Phone className="w-16 h-16 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {isIncoming ? 'Incoming Call' : 'Calling...'}
        </h2>
        <p className="text-xl text-gray-300 mb-8">{caller}</p>
        
        <div className="flex space-x-4">
          {!isIncoming ? (
            <button
              onClick={onReject}
              className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-2xl"
            >
              <X className="w-8 h-8 text-white" />
            </button>
          ) : (
            <>
              <button
                onClick={onReject}
                className="w-20 h-20 bg-gray-500 hover:bg-gray-600 rounded-full flex items-center justify-center shadow-2xl"
              >
                <X className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={onAccept}
                className="w-20 h-20 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl"
              >
                <Phone className="w-8 h-8 text-white" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallModal;
