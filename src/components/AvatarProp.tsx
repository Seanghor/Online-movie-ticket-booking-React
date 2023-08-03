import React from 'react';
import GreenTopLeftShape from '../assets/images/contactus/green_top_left.png';
import YellowTopRightShape from '../assets/images/contactus/yellowTopRight.png';
import YellowBottomRightShape from '../assets/images/contactus/yellowBottomRightShape.png';
import CircleProfileShape from '../assets/images/contactus/CircleBg.png';
import CrossShape from '../assets/images/contactus/cross.png';
import Brush from '../assets/images/contactus/brush.png';
interface AvatarProps {
  imageUrl: string;
  userName: string;
  role: string;
}

const Avatar: React.FunctionComponent<AvatarProps> = (props:AvatarProps) => {
    const {imageUrl, userName,role} = props;
  return (
    <div className="relative lg:h-[800px] md:h-[1000px] w-full bg-white mt-20 rounded-3xl">
      <div className="absolute left-0 top-0 w-1/4">
        <img src={GreenTopLeftShape} alt="" className="object-cover bg-cover rounded-tl-3xl" />
      </div>
      <div className="absolute top-0 right-0 w-1/2">
        <img src={YellowTopRightShape} alt="" className="object-cover bg-cover rounded-tr-3xl" />
      </div>

      <div className="absolute bottom-0 right-0 w-1/4">
        <img src={YellowBottomRightShape} alt="" className="object-cover bg-cover rounded-br-3xl" />
      </div>

      <div className="absolute flex flex-col items-center justify-start left-20 top-52 md:flex-row md:items-center md:justify-start">
        <div style={{ borderRadius: '50%', overflow: 'hidden', width: '500px', height: '500px', position: 'relative' }}>
          <img src={CircleProfileShape} alt="" className="object-cover bg-cover" style={{ position: 'relative', zIndex: '1' }} />
          <img src={imageUrl} alt="Kimsour" className="rounded-full bg-transparent" style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '90%', maxHeight: '90%', zIndex: '2' }} />
        </div>
        <div className="ml-8 md:ml-24 md:mt-0">
          <h1 className="text-5xl text-[#7dd7d2] font-bold font-DancingScript mb-10">{userName}</h1>
          <p className="text-5xl text-[#e9d578] font-bold mt-2 font-Angkor mb-10">{role}</p>

          <div className="absolute w-1/5">
            <img src={CrossShape} alt="" className="object-cover bg-cover rounded-br-3xl" />
          </div>
          <div className="absolute w-1/5 right-0 bottom-5">
            <img src={Brush} alt="" className="object-cover bg-cover rounded-br-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;

