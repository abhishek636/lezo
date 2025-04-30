import { useState } from 'react';
import ChatMessage from './ChatMessage';
import OptionGrid from './OptionGrid';
import Image from 'next/image';

type Message = { role: 'user' | 'bot'; text: string };

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setTimeout(() => {
      const botMessage: Message = { role: 'bot', text: `You said: "${userMessage.text}"` };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  return (
    <div className="py-7 px-16 flex flex-col h-[500px] max-h-[80vh] bg-white/30 backdrop-blur-lg rounded-lg text-[#4C4C4C] space-y-4 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-2 rounded">
        {messages.length === 0 ? <OptionGrid /> : messages.map((msg, idx) => <ChatMessage key={idx} message={msg} />)}
      </div>
      <div className="relative w-full">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Bridge with Defy Agent.."
          className="w-full rounded-lg bg-custom-gradient px-4 py-5 pr-12 text-white placeholder-white/70 focus:outline-none"
        />
        <button type="submit" onClick={handleSendMessage} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/10 p-4 rounded-lg hover:bg-white/20 transition">
          <Image src="/rocket.png" alt="send" width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
