type Props = {
    checkbox1: boolean;
    checkbox2: boolean;
    setCheckbox1: (v: boolean) => void;
    setCheckbox2: (v: boolean) => void;
    onAccept: () => void;
  };
  
  const Disclaimer = ({ checkbox1, checkbox2, setCheckbox1, setCheckbox2, onAccept }: Props) => {
    const isAcceptEnabled = checkbox1 && checkbox2;
    return (
      <div className="px-6 md:px-36 py-20 md:py-28">
        <div className="p-4 space-y-4 bg-custom-gradient rounded-lg">
          <h2 className="text-2xl text-[#4C4C4C]">Disclaimer</h2>
          <label className="flex items-start space-x-2">
            <input type="checkbox" className="form-checkbox mt-1" checked={checkbox1} onChange={e => setCheckbox1(e.target.checked)} />
            <span className="text-[#4C4C4C]">Please accept the terms & conditions to continue.</span>
          </label>
          <label className="flex items-start space-x-2">
            <input type="checkbox" className="form-checkbox mt-1" checked={checkbox2} onChange={e => setCheckbox2(e.target.checked)} />
            <span className="text-[#4C4C4C]">I understand the app is in experimental mode and will only use it for testing at my own risk with not more than $100.</span>
          </label>
          <button className={`px-6 py-2 rounded text-white ${isAcceptEnabled ? 'bg-[#4C4C4C] hover:bg-gray-900' : 'bg-[#4C4C4C] cursor-not-allowed'}`} disabled={!isAcceptEnabled} onClick={onAccept}>
            Accept
          </button>
        </div>
      </div>
    );
  };
  
  export default Disclaimer;
  