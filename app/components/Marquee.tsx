const Marquee = ({ text }: { text: string }) => {
    return (
      <div className="relative w-screen h-screen overflow-hidden">
        <div className="absolute top-0 w-full bg-white/29 flex items-center gap-4 p-2 whitespace-nowrap overflow-hidden">
          <div className="animate-marquee text-white">
            {text} &nbsp;&bull;&nbsp; {text} &nbsp;&bull;&nbsp; {text} &nbsp;&bull;&nbsp;
          </div>
          <div className="animate-marquee text-white">
            {text} &nbsp;&bull;&nbsp; {text} &nbsp;&bull;&nbsp; {text} &nbsp;&bull;&nbsp;
          </div>
          <div className="animate-marquee text-white">
            {text} &nbsp;&bull;&nbsp; {text} &nbsp;&bull;&nbsp; {text}
          </div>
        </div>
      </div>
    );
  };
  
  export default Marquee;
  