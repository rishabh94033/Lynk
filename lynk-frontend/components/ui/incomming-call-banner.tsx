import React, { useState, useEffect } from 'react';
import { IncomingCall } from '../../types';

interface Props {
  caller: IncomingCall;
  onAccept: () => void;
  onReject: () => void;
}

const IncomingCallBanner: React.FC<Props> = ({ caller, onAccept, onReject }) => {
  const [isRinging, setIsRinging] = useState(true);

  useEffect(() => {
    const audio = new Audio('/ringtone.mp3');
    audio.loop = true;
    if (isRinging) {
      audio.play().catch(e => console.log('Audio play failed:', e));
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isRinging]);

  const handleAccept = (): void => {
    setIsRinging(false);
    onAccept();
  };

  const handleReject = (): void => {
    setIsRinging(false);
    onReject();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white p-5 flex justify-between items-center z-50 animate-slideDown">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white bg-opacity-30 flex items-center justify-center text-xl font-bold">
          {caller.callerName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="text-lg font-semibold m-0">{caller.callerName}</h3>
          <p className="text-sm opacity-90 m-0 mt-1">Incoming video call...</p>
        </div>
      </div>
      
      <div className="flex gap-4">
        <button 
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-full font-bold cursor-pointer transition-transform hover:scale-105 flex items-center gap-2"
          onClick={handleReject}
        >
          <span>❌</span>
          Decline
        </button>
        <button 
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-full font-bold cursor-pointer transition-transform hover:scale-105 flex items-center gap-2"
          onClick={handleAccept}
        >
          <span>✅</span>
          Accept
        </button>
      </div>
    </div>
  );
};

export default IncomingCallBanner;
