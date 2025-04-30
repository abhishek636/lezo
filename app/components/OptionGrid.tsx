import Image from 'next/image';

const options = [
  { label: "Trending", desc: "Search trending tokens", icon: "/trending.png" },
  { label: "Swap", desc: "Trade crypto assets instantly", icon: "/swap.png" },
  { label: "Analyze", desc: "Analyse your holdings", icon: "/analyze.png" },
  { label: "Staking", desc: "Earn rewards by staking", icon: "/staking.png" },
  { label: "Bridge", desc: "Transfer assets cross-chain", icon: "/bridge.png" },
  { label: "Snipe", desc: "Snipe new launches quickly", icon: "/snipe.png" },
];

const OptionGrid = () => (
  <div className="rounded-lg text-center text-[#4C4C4C] space-y-6">
    <div className="inline-flex gap-2 items-center bg-white/40 rounded-xl p-2 text-[#4C4C4C]">
      <Image src="/vaulate.svg" alt="Logo" width={20} height={20} />
      EFWvSq...v27Q9g
      <Image src="/weui_arrow-outlined.svg" alt="Logo" width={16} height={16} />
    </div>
    <h2 className="text-4xl">Where can DeFy help you bridge today?</h2>
    <p className="text-sm">Choose from various Bridging options.</p>
    <div className="grid grid-cols-3 gap-4 text-sm text-left">
      {options.map((item, index) => (
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
);

export default OptionGrid;
