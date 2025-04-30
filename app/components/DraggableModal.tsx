'use client';

import { useState, useRef } from 'react';
import Marquee from './Marquee';
import Logo from './Logo';
import ModalHeader from './ModalHeader';
import Disclaimer from './Disclaimer';
import ChatInterface from './ChatInterface';

const DraggableModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);

  const handleClose = () => modalRef.current?.remove();
  const handleMinimize = () => setIsMinimized(true);
  const handleMaximize = () => setIsMinimized(false);
  const handleAcceptDisclaimer = () => setIsDisclaimerAccepted(true);

  return (
    <div className={`fixed z-50 top-8 left-8 w-[90vw] md:w-[700px] h-auto ${isMinimized ? 'h-12' : 'min-h-[80vh]'} bg-black bg-opacity-20 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg`}>
      <ModalHeader
        onClose={handleClose}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        isMinimized={isMinimized}
      />

      {!isMinimized && (
        <div className="relative flex flex-col items-center text-center">
          <Marquee text="Lezo Chat is in Beta" />
          <Logo />
          {!isDisclaimerAccepted ? (
            <Disclaimer
              checkbox1={checkbox1}
              checkbox2={checkbox2}
              setCheckbox1={setCheckbox1}
              setCheckbox2={setCheckbox2}
              onAccept={handleAcceptDisclaimer}
            />
          ) : (
            <ChatInterface />
          )}
        </div>
      )}
    </div>
  );
};

export default DraggableModal;
