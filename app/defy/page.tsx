'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../globals.css';
import Footer from '../components/footer';

type Message = { role: 'user' | 'bot'; text: string };

export default function DraggableModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const marqueeText = "OPERATING SYSTEM FOR AI AGENTS";

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowWidth < 768) return;
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isMaximized || windowWidth < 768) return;
    setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const isAcceptEnabled = checkbox1 && checkbox2;

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = { role: 'bot', text: `You said: "${userMessage.text}"` };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Image src="/BG.png" alt="Background" layout="fill" objectFit="cover" quality={100} />

      {/* Marquee */}
      <div className="absolute top-0 w-full bg-white/29 flex items-center gap-4 p-2 whitespace-nowrap overflow-hidden">
        <div className="animate-marquee text-white">{marqueeText} &bull; {marqueeText} &bull; {marqueeText}</div>
        <div className="animate-marquee text-white">{marqueeText} &bull; {marqueeText} &bull; {marqueeText}</div>
      </div>

      {/* Logo */}
      <div className="absolute top-1/8 w-full flex justify-center">
        <Image src="/logo.png" alt="LEZO Logo" width={200} height={100} priority />
      </div>

      {/* Modal */}
      <div className="fixed inset-0 z-50" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <div
          ref={modalRef}
          className={`absolute rounded-lg border border-gray-400 bg-custom-gradient shadow-xl ${isMaximized ? 'top-0 left-0 w-full lg:min-h-[542px] h-[100vh] bg-custom-gradient' : 'lg:w-[890px]'}`}
          style={!isMaximized && isClient && windowWidth >= 768 ? { left: position.x, top: position.y } : {}}
        >
          {/* Header */}
          <div onMouseDown={handleMouseDown} className="px-4 py-2 bg-[#4C4C4C] md:cursor-move rounded-t-lg relative">
            <div className="flex space-x-2">
              <button
                className="w-3 h-3 bg-red-500 rounded-full"
                onClick={() => {
                  setIsVisible(false);
                  router.push('/'); 
                }}
              />
              <button className="w-3 h-3 bg-yellow-500 rounded-full" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} />
              <button className="w-3 h-3 bg-green-500 rounded-full" onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); setIsMinimized(false); }} />
            </div>
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <Image src="/Defi logo.png" alt="LEZO Logo" width={100} height={100} />
            </div>
          </div>

          {/* Modal Content */}
          {!isMinimized && (
            <div className="bg-custom-gradient">
              {!accepted ? (
                <div className="px-6 md:px-36 py-20 md:py-28">
                  <div className="p-4 space-y-4 bg-custom-gradient rounded-lg">
                    <h2 className="text-2xl text-[#4C4C4C]">Disclaimer</h2>
                    <label className="flex items-start space-x-2">
                      <input type="checkbox" className="form-checkbox mt-1" checked={checkbox1} onChange={(e) => setCheckbox1(e.target.checked)} />
                      <span className="text-[#4C4C4C]">Please accept the terms & conditions to continue.</span>
                    </label>
                    <label className="flex items-start space-x-2">
                      <input type="checkbox" className="form-checkbox mt-1" checked={checkbox2} onChange={(e) => setCheckbox2(e.target.checked)} />
                      <span className="text-[#4C4C4C]">I understand the app is in experimental mode and will only use it for testing at my own risk with not more than $100.</span>
                    </label>
                    <button className={`px-6 py-2 rounded text-white ${isAcceptEnabled ? 'bg-[#4C4C4C] hover:bg-gray-900' : 'bg-[#4C4C4C] cursor-not-allowed'}`} disabled={!isAcceptEnabled} onClick={() => setAccepted(true)}>Accept</button>
                  </div>
                </div>
              ) : (
                <div className="py-7 px-16 flex flex-col h-[500px] max-h-[80vh] p-4 bg-white/30 backdrop-blur-lg rounded-lg text-[#4C4C4C] space-y-4 overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-2 rounded">
                    {messages.length === 0 && (
                      <div className="rounded-lg text-center text-[#4C4C4C] space-y-6">
                        <div className="inline-flex gap-2 items-center bg-white/40 rounded-xl p-2 w-content text-[#4C4C4C]">
                          <Image src="/vaulate.svg" alt="Logo" width={20} height={20} />
                          EFWvSq...v27Q9g
                          <Image src="/weui_arrow-outlined.svg" alt="Logo" width={16} height={16} />
                        </div>
                        <h2 className="text-4xl text-[#4C4C4C]">Where can DeFy help you bridge today?</h2>
                        <p className="text-sm text-[#4C4C4C]">Choose from various Bridging options.</p>
                        <div className="grid grid-cols-3 gap-4 text-sm text-left">
                          {[
                            { label: "Trending", desc: "Search trending tokens", icon: "/trending.png" },
                            { label: "Swap", desc: "Trade crypto assets instantly", icon: "/swap.png" },
                            { label: "Analyze", desc: "Analyse your holdings", icon: "/analyze.png" },
                            { label: "Staking", desc: "Earn rewards by staking", icon: "/staking.png" },
                            { label: "Bridge", desc: "Transfer assets cross-chain", icon: "/bridge.png" },
                            { label: "Snipe", desc: "Snipe new launches quickly", icon: "/snipe.png" },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-4 p-2 bg-white/10 rounded-lg">
                              <div className="bg-white/10 p-4 rounded-lg mr-2">
                                <Image src={item.icon} alt={item.label} width={20} height={20} />
                              </div>
                              <div>
                                <h4 className="text-white font-semibold">{item.label}</h4>
                                <p className="text-[#F5F5F5] text-xs">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex items-start mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role !== 'user' && (
                          <div className="w-6 h-6 bg-[#E4EAD8] text-[#4C4C4C] rounded-md flex items-center justify-center text-xs font-semibold mr-2">
                            L
                          </div>
                        )}
                        <div className={`px-4 py-2 text-sm max-w-[80%] rounded-lg bg-white/40 text-[#4C4C4C] shadow-sm`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="relative w-full">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Bridge with Defy Agent.."
                      className="w-full rounded-lg bg-custom-gradient px-4 py-5 pr-12 text-white placeholder-white/70 focus:outline-none"
                    />
                    <button type="submit" onClick={handleSendMessage} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/10 p-4 rounded-lg hover:bg-white/20 transition">
                      <Image src="/rocket.png" alt="send" width={20} height={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
