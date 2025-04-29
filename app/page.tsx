'use client';
import { useState, useEffect } from "react";
import Image from "next/image";

// Define types
type AdditionalCard = {
  id: string;
  title: string;
  imageSrc: string;
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

export default function Home() {
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
    // Fetch the main card data
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
        <div className="absolute top-0 w-full bg-white/29 flex items-center gap-4 p-2 whitespace-nowrap overflow-hidden">
          <div className="animate-marquee text-white">
            {marqueeText} &nbsp;&bull;&nbsp; {marqueeText} &nbsp;&bull;&nbsp; {marqueeText} &nbsp;&bull;&nbsp;
          </div>
          <div className="animate-marquee text-white">
            {marqueeText} &nbsp;&bull;&nbsp; {marqueeText} &nbsp;&bull;&nbsp; {marqueeText} &nbsp;&bull;&nbsp;
          </div>
          <div className="animate-marquee text-white">
            {marqueeText} &nbsp;&bull;&nbsp; {marqueeText} &nbsp;&bull;&nbsp; {marqueeText}
          </div>
        </div>
      </div>

      <div className="absolute top-1/8 w-full flex justify-center">
        <Image 
          src="/logo.png" 
          alt="LEZO Logo" 
          width={200} 
          height={100} 
          priority
        />
      </div>

      <div className={`absolute xl:bottom-36 sm:bottom-56 bottom-70 w-full flex flex-wrap justify-center gap-5 transition-all duration-500 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {cardsData.map((card: Card) => (
          <div
            key={card.id}
            className="bg-white/20 p-4 rounded-lg flex flex-col items-center backdrop-blur-sm w-36 h-36 hover:scale-120"
            onClick={() => openPopup(card)}
          >
            <Image src={card.imageSrc} alt={card.title} width={92} height={92} />
            <p className="text-sm mt-2 text-white font-light">{card.title}</p>
          </div>
        ))}
      </div>

      {isPopupOpen && popupContent && (
        <div className="fixed top-1/4 left-1 right-0 flex items-center justify-center z-50">
          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl sm:p-8 p-4 w-[980px] h-[80vh] flex flex-col overflow-hidden pb-[5vh]">
            
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white hover:text-gray-300"
            >
              <Image 
                src="/Close.png" 
                alt="Close Button" 
                width={58} 
                height={58} 
                priority
                className="hover:[background:linear-gradient(115.95deg,rgba(239,239,239,0.6)_10.92%,rgba(255,255,255,0.08)_96.4%)] rounded-full"
              />
            </button>

            {/* Popup Content */}
            <div className="flex-1 mt-14 overflow-y-auto overflow-x-hidden">
              <div className="grid md:grid-cols-7 sm:grid-cols-5 grid-cols-3 sm:gap-4 gap-2">
                {popupContent.additionalCards && popupContent.additionalCards.map((additionalCard: AdditionalCard) => (
                  <div
                    key={additionalCard.id}
                    className="flex flex-col items-center justify-center w-full hover:scale-110 transition-transform"
                  >
                    <div className="bg-white/20 p-4 rounded-lg">
                      <Image src={additionalCard.imageSrc} alt={additionalCard.title} width={107} height={107}/>
                    </div>
                    <p className="text-xs mt-2 text-white">{additionalCard.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white/20 bg-[var(--custom-gradient)] p-4 rounded-t-xl flex items-center flex-wrap justify-center xl:justify-between gap-6">
        <div className="bg-white/10 flex items-center gap-2.5 py-2.5 lg:px-12 px-2 rounded-lg">
          <div className="flex flex-col text-lg text-white">
            <span>{currentTime}</span>
            <span>{currentDate}</span>
          </div> 
          <div>
            <Image src="/Clock.png" alt="Clock" width={28} height={28} />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src="/logo1.png"
            alt="LEZO Logo"
            width={131} 
            height={40}
          />
        </div>

        <div className="flex gap-2 text-lg">
          <button onClick={toggleMenu}>
            <Image src={menuOpen ? "/close_toggel.png" : "/toggel.png"} alt="Toggle Menu" width={62} height={62}/>  
          </button> 
          <a target="_blank" href="#">
            <Image src="/twitter.png" alt="Twitter" width={62} height={62} />
          </a>
          <a target="_blank" href="#">
            <Image src="/telegram.png" alt="Telegram" width={62} height={62} />
          </a>
        </div>
      </div>
    </div>
  );
}
