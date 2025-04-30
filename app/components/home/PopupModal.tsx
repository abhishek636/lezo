'use client';

import React from "react";
import Image from "next/image";

interface AdditionalCard {
  id: string;
  title: string;
  imageSrc: string;
  href: string;
}

interface PopupContent {
  additionalCardsFile: string;
  additionalCards?: AdditionalCard[];
}

interface PopupModalProps {
  content: PopupContent;
  onClose: () => void;
  onMinimize: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ content, onClose, onMinimize }) => (
  <div className="fixed top-1/4 left-1 right-0 flex items-center justify-center z-50">
    <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl sm:p-8 p-4 w-[980px] h-[80vh] flex flex-col overflow-hidden pb-[5vh]">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button onClick={onClose}>
          <Image src="/Close.png" alt="Close" width={48} height={48} />
        </button>
        <button onClick={onMinimize}>
          <Image src="/Minimize.png" alt="Minimize" width={48} height={48} />
        </button>
      </div>
      <div className="flex-1 mt-14 overflow-y-auto overflow-x-hidden">
        <div className="grid md:grid-cols-7 sm:grid-cols-5 grid-cols-3 sm:gap-4 gap-2">
          {content.additionalCards?.map(card => (
            <a key={card.id} href={card.href} className="flex flex-col items-center justify-center w-full hover:scale-110 transition-transform">
              <div className="bg-white/20 p-4 rounded-lg">
                <Image src={card.imageSrc} alt={card.title} width={107} height={107} />
              </div>
              <p className="text-xs mt-2 text-white">{card.title}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PopupModal;