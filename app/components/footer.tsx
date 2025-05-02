'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

export default function Footer() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [cardsData, setCardsData] = useState<Card[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<PopupContent | null>(null);
  const [menuOpen, setMenuOpen] = useState(true);
  const [isModalMinimized, setIsModalMinimized] = useState(false);
  const [modalPosition, setModalPosition] = useState(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Restore minimized state
  useEffect(() => {
    const minimizedState = sessionStorage.getItem('modalMinimized');
    const position = sessionStorage.getItem('modalPosition');

    if (minimizedState === 'true') {
      setIsModalMinimized(true);
      if (position) {
        setModalPosition(JSON.parse(position));
      }
    }
  }, []);

  const handleRestore = () => {
    setIsModalMinimized(false);
    sessionStorage.removeItem('modalMinimized');
    sessionStorage.removeItem('modalPosition');
    router.push('/defy');
  };

  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true }).toUpperCase());
    setCurrentDate(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }, []);

  useEffect(() => {
    fetch('/cardsData.json')
      .then((res) => res.json())
      .then((data: Card[]) => setCardsData(data))
      .catch((err) => console.error('Error loading card data:', err));
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const openPopup = (card: Card) => {
    fetch(card.popupContent.additionalCardsFile)
      .then((res) => res.json())
      .then((additionalCards: AdditionalCard[]) => {
        setPopupContent({ ...card.popupContent, additionalCards });
        setIsPopupOpen(true);
      })
      .catch((err) => {
        console.error('Error loading additional cards:', err);
        alert('Failed to load additional cards.');
      });
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  // Close popup when clicking outside
  useEffect(() => {
    if (!isPopupOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPopupOpen]);

  return (
    <>
      {/* Freeze Background when Popup is Open */}
      <div className={`absolute inset-0 ${isPopupOpen ? 'pointer-events-none' : ''} transition-all`} />

      {/* Cards Section */}
      <div className={`absolute xl:bottom-36 sm:bottom-56 bottom-28 w-full flex flex-wrap justify-center gap-5 transition-all duration-500 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="bg-white/20 p-4 rounded-lg flex flex-col items-center backdrop-blur-sm w-36 h-36 hover:scale-120 transition-transform duration-500 ease-in-out"
            onClick={() => openPopup(card)}
          >
            <Image src={card.imageSrc} alt={card.title} width={92} height={92} />
            <p className="text-sm mt-2 text-white font-light">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Popup */}
      {isPopupOpen && popupContent && (
        <>
          {/* Backdrop overlay */}
          <div className="fixed inset-0 bg-black opacity-50 z-40 backdrop-blur-lg" />

          <div className="fixed sm:top-1/4 top-1/5 left-0 right-0 flex items-center justify-center z-50 backdrop-blur-lg">
            <div
              ref={popupRef}
              className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl sm:p-8 sm:mx-0 mx-4 p-4 w-[650px] h-[60vh] flex flex-col overflow-hidden pb-[5vh]"
            >
              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white hover:text-gray-300"
              >
                <Image
                  src="/Close.png"
                  alt="Close"
                  width={58}
                  height={58}
                  priority
                  className="w-10 h-10 sm:w-[58px] sm:h-[58px] hover:[background:linear-gradient(115.95deg,rgba(239,239,239,0.6)_10.92%,rgba(255,255,255,0.08)_96.4%)] rounded-full"
                />
              </button>

              {/* Popup Cards */}
              <div className="flex-1 mt-14 overflow-y-auto overflow-x-hidden">
                <div className="grid md:grid-cols-6 sm:grid-cols-5 grid-cols-3 sm:gap-4 gap-2">
                  {popupContent.additionalCards?.map((additionalCard) => (
                    <a
                      href={additionalCard.href}
                      key={additionalCard.id}
                      className="flex flex-col items-center justify-center w-full hover:scale-110 transition-transform duration-500 ease-in-out"
                    >
                      <div className="bg-white/20 p-4 rounded-lg">
                        <Image src={additionalCard.imageSrc} alt={additionalCard.title} width={107} height={107} />
                      </div>
                      <p className="text-xs mt-2 text-white">{additionalCard.title}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer Base */}
      <div
        style={{ backdropFilter: 'blur(76.14620971679688px)' }}
        className="absolute gradient-border backdrop-blur-2xs bottom-0 left-1/2 transform -translate-x-1/2 bg-white/20 p-3 rounded-t-xl flex items-center w-full sm:w-auto justify-center xl:justify-between gap-6"
      >
        <div className="bg-white/10 sm:flex items-center gap-2.5 py-2.5 lg:px-10 px-2 rounded-lg hidden">
          <div className="flex flex-col text-lg text-white font-light leading-none">
            <span>{currentTime}</span>
            <span>{currentDate}</span>
          </div>
          <div>
            <Image src="/Clock.png" alt="Clock" width={28} height={28} />
          </div>
        </div>

        {isModalMinimized && (
          <button onClick={handleRestore} className="bg-white/10 p-3 rounded-lg">
            <Image src="/defy.png" alt="defy" width={34} height={34} />
          </button>
        )}

        <div className="flex items-center justify-center">
          <Image src="/logo1.png" alt="LEZO Logo" width={131} height={40} />
        </div>

        <div className="flex gap-2 text-lg">
          <button onClick={toggleMenu} className="cursor-pointer">
            <Image src={menuOpen ? '/close_toggel.png' : '/toggel.png'} alt="Toggle Menu" width={62} height={62} />
          </button>
          <a target="_blank" href="#"><Image src="/twitter.png" alt="Twitter" width={62} height={62} /></a>
          <a target="_blank" href="#"><Image src="/telegram.png" alt="Telegram" width={62} height={62} /></a>
        </div>
      </div>
    </>
  );
}
