import Image from 'next/image';

const Logo = () => (
  <div className="absolute top-1/8 w-full flex justify-center">
    <Image src="/logo.png" alt="LEZO Logo" width={200} height={100} priority />
  </div>
);

export default Logo;
