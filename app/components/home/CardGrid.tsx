'use client';

import Image from "next/image";

interface Card {
  id: string;
  title: string;
  imageSrc: string;
}

interface CardGridProps {
  cards: Card[];
  menuOpen: boolean;
  onCardClick: (card: Card) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ cards, menuOpen, onCardClick }) => (
  <div className={`absolute xl:bottom-36 sm:bottom-56 bottom-70 w-full flex flex-wrap justify-center gap-5 transition-all duration-500 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
    {cards.map(card => (
      <div
        key={card.id}
        className="bg-white/20 p-4 rounded-lg flex flex-col items-center backdrop-blur-sm w-36 h-36 hover:scale-120"
        onClick={() => onCardClick(card)}
      >
        <Image src={card.imageSrc} alt={card.title} width={92} height={92} />
        <p className="text-sm mt-2 text-white font-light">{card.title}</p>
      </div>
    ))}
  </div>
);

export default CardGrid;