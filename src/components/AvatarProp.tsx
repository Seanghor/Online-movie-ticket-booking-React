import React from 'react';

interface AvatarProps {
  imageUrl: string;
  userName: string;
  role: string;
}

const Avatar: React.FunctionComponent<AvatarProps> = (props:AvatarProps) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const {imageUrl, userName,role} = props;
  return (
    <div className="flex flex-col items-center">
        <div 
        className="relative w-40 h-40 bg-white rounded-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        <div className="h-full w-full bg-cover filter hover:brightness-75 transition duration-300 relative">
            <img src={imageUrl} alt="User Avatar" className="h-full w-full object-cover transform hover:scale-110 transition duration-300 z-10" />
            {isHovered && (
            <div className="absolute inset-0 bg-[#22d3ee] bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-lg font-bold transform hover:scale-110 transition duration-300 z-20 font-poppins">{userName}</span>
            </div>
            )}
        </div>
        </div>
        <div className="flex flex-col mt-10 text-center gap-3">
            <h1 className='font-bold text-3xl text-[#22d3ee] font-poppins'>{role}</h1>
            <h6 className='font-bold text-2xl text-[#22d3ee] font-poppins'>Developer</h6>
        </div>
    </div>
   
  );
};

export default Avatar;

