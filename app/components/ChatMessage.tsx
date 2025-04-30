type Props = {
    message: {
      role: 'user' | 'bot';
      text: string;
    };
  };
  
const ChatMessage = ({ message }: Props) => (
<div className={`flex items-start mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
    {message.role === 'bot' && (
    <div className="w-6 h-6 bg-[#E4EAD8] text-[#4C4C4C] rounded-md flex items-center justify-center text-xs font-semibold mr-2">
        L
    </div>
    )}
    <div className="px-4 py-2 text-sm max-w-[80%] rounded-lg bg-white/40 text-[#4C4C4C] shadow-sm">
    {message.text}
    </div>
</div>
);
  
  export default ChatMessage;
  