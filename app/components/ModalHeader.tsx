import Image from 'next/image';

type Props = {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMinimized: boolean;
};

const ModalHeader = ({ onClose, onMinimize, onMaximize, isMinimized }: Props) => (
  <div onMouseDown={(e) => e.stopPropagation()} className="px-4 py-2 bg-[#4C4C4C] md:cursor-move rounded-t-lg relative">
    <div className="flex space-x-2">
      <button className="w-3 h-3 bg-red-500 rounded-full" onClick={onClose} />
      <button className="w-3 h-3 bg-yellow-500 rounded-full" onClick={onMinimize} />
      <button className="w-3 h-3 bg-green-500 rounded-full" onClick={onMaximize} />
    </div>
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
      <Image src="/Defi logo.png" alt="LEZO Logo" width={100} height={100} />
    </div>
  </div>
);

export default ModalHeader;
