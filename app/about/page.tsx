// pages/About.tsx or components/About.tsx

'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../components/footer";
import PopupModal from "../components/home/PopupModal";
import CardGrid from "../components/home/CardGrid";
import MarqueeBanner from "../components/Marquee";
import Logo from "../components/Logo";

// Types
type AdditionalCard = {
  id: string;
  title: string;
  imageSrc: string;
  href: string; 
};

type PopupContent = {
  additionalCardsFile: string;
  additionalCards?: AdditionalCard[];
};

type Card = {
  id: string;
  title: string;
  imageSrc: string;
  popupContent: PopupContent;
};

export default function About() {
  const [isModalMinimized, setIsModalMinimized] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const marqueeText = "OPERATING SYSTEM FOR AI AGENTS";

  const [cardsData, setCardsData] = useState<Card[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<PopupContent | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const now = new Date();

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    };

    setCurrentTime(now.toLocaleTimeString([], timeOptions).toUpperCase());
    setCurrentDate(now.toLocaleDateString('en-US', dateOptions));
  }, []);

  useEffect(() => {
    fetch('/cardsData.json')
      .then((response) => response.json())
      .then((data: Card[]) => setCardsData(data))
      .catch((error) => console.error('Error loading card data:', error));
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openPopup = (card: Card) => {
    fetch(card.popupContent.additionalCardsFile)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((additionalCards: AdditionalCard[]) => {
        setPopupContent({
          ...card.popupContent,
          additionalCards,
        });
        setIsPopupOpen(true);
      })
      .catch((error) => {
        console.error('Error loading additional cards:', error);
        alert('Failed to load additional cards. Please try again later.');
      });
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  const minimizePopup = () => {
    setIsPopupOpen(false);
    setIsModalMinimized(true);
  };

  const restorePopup = () => {
    setIsPopupOpen(true);
    setIsModalMinimized(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Image
        src="/BG.png"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />

      <div className="relative w-screen h-screen overflow-hidden">
        <MarqueeBanner text={marqueeText} />
      </div>

      <Logo />

      <CardGrid
        cards={cardsData}
        menuOpen={menuOpen}
        onCardClick={openPopup}
      />

      {isPopupOpen && popupContent && (
        <PopupModal
          content={popupContent}
          onClose={closePopup}
          onMinimize={minimizePopup}
        />
      )}

        <Footer showRestoreButton={isModalMinimized} onRestore={restorePopup} />
    </div>
  );
}
