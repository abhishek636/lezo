'use client'; 
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const marqueeText = "OPERATING SYSTEM FOR AI AGENTS";
  const [cardsData, setCardsData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

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

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Fetch the main card data
    fetch('/cardsData.json')
      .then((response) => response.json())
      .then((data) => setCardsData(data))
      .catch((error) => console.error('Error loading card data:', error));
  }, []);

  const openPopup = (card) => {
    // Fetch the additional cards dynamically from the respective file
    fetch(card.popupContent.additionalCardsFile)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Try to parse the JSON
      })
      .then((additionalCards) => {
        setPopupContent({
          ...card.popupContent, // Keep existing popup content
          additionalCards: additionalCards, // Add additional cards dynamically
        });
        setIsPopupOpen(true); // Open the popup
      })
      .catch((error) => {
        console.error('Error loading additional cards:', error);
        alert('Failed to load additional cards. Please try again later.'); // Optional user alert
      });
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
    setPopupContent(null); // Clear popup content
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

      <div className={`absolute bottom-44 w-full flex justify-center gap-5 transition-all duration-500 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="bg-white/20 p-4 rounded-lg flex flex-col items-center backdrop-blur-sm w-36 h-36 hover:scale-120"
            onClick={() => openPopup(card)} // Open popup when a card is clicked
          >
            <Image src={card.imageSrc} alt={card.title} width={92} height={92} />
            <p className="text-sm mt-2 text-white font-light">{card.title}</p>
          </div>
        ))}
      </div>

      {isPopupOpen && popupContent && (
        <div className="fixed top-1/4 left-1 right-0  flex items-center justify-center z-50">
          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 w-[980px] h-[100vh]  flex flex-col overflow-hidden">
            
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-2xl hover:text-gray-300"
            >
              <Image 
                src="/Close.png" 
                alt="LEZO Logo" 
                width={58} 
                height={58} 
                priority
              />
            </button>

            {/* Popup Content */}
            <div className="flex-1 mt-8 overflow-y-auto">
              <div className="grid grid-cols-5 gap-4">
                {popupContent.additionalCards && popupContent.additionalCards.map((additionalCard) => (
                  <div
                    key={additionalCard.id}
                    className="bg-white/20 p-4 rounded-lg flex flex-col items-center justify-center backdrop-blur-sm w-full aspect-square hover:scale-110 transition-transform"
                  >
                    <Image src={additionalCard.imageSrc} alt={additionalCard.title} width={40} height={40} />
                    <p className="text-xs mt-2 text-white">{additionalCard.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}



      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white/20 bg-[var(--custom-gradient)] p-4 rounded-t-xl flex items-center justify-between gap-6">
        <div className="bg-white/10 flex items-center gap-2.5 py-2.5 px-12 rounded-lg">
          <div className="flex flex-col items-center text-lg text-white">
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
            <Image src="/toggel.png" alt="toggel" width={62} height={62}/>  
          </button> 
          <a target="_blank" href="#">
            <Image src="/twitter.png" alt="twitter" width={62} height={62} />
          </a>
          <a target="_blank" href="#">
            <Image src="/telegram.png" alt="telegram" width={62} height={62} />
          </a>
        </div>
      </div>
    </div>
  );
}
