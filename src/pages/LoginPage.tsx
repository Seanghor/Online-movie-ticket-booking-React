import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, logIn } from '../services/auth';
import LockIcon from '@mui/icons-material/Lock';
import SignInBgImage from '../assets/images/sinin_signup_bg/signinBg.png';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
// eslint-disable-next-line react-hooks/rules-of-hooks
// const navigate = useNavigate();
export default function LoginPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await logIn({ email, password })
    console.log("Res:", res);
    console.log("email:", email);
    console.log("password:", password);
    if (!res.accessToken && !res.refreshToken) {
      navigate('/login');
    } else {
      navigate('/')
    }
  }
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-cover" style={{ backgroundImage: `url(${SignInBgImage})` }} >
       <div className="w-full flex flex-col m-auto shadow-md lg:max-w-xl">
          <div className="bg-purple-300 py-10 bg-opacity-25 w-full p-6">
            <h1 className='text-5xl text-white w-1/2 m-auto font-bold text-center font-DancingScript'>Welcome</h1>
            <h3 className='text-4xl text-white w-1/2 m-auto font-bold text-center font-DancingScript'>to MovieTick</h3>
            <p className='text-md text-white pt-5'>Join the MovieTick community today and elevate your movie-going experience to new heights. Whether you're a casual movie lover or a dedicated cinephile, MovieTick is your go-to platform for all things cinema. Sit back, relax, and let us take care of your movie ticket needs. Enjoy the show!</p>
          </div>
          <div className="bg-white bg-opacity-50">
            <h1 className="text-3xl py-8 font-semibold text-center text-purple-700 uppercase font-poppins">
              User Login
            </h1>
            <form className='p-6' onSubmit={handleLogin}>
              <div className="py-4 flex flex-row px-8">
                <div className="relative flex items-center rounded-full p-3 mr-4 bg-white bg-opacity-50 jusify-center">
                  <EmailIcon style={{ fontSize: 40 }} className='w-full h-full flex text-purple-600'/>
                </div>
                <input
                    type="email"
                    className="block w-full px-4 py-2 text-purple-700 font-poppins placeholder-purple-700 placeholder-bold text-lg bg-white bg-opacity-50 border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={email}
                    required
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
              </div>

              <div className="py-4 flex flex-row px-8 ">
                <div className="relative flex items-center rounded-full p-3 mr-4 bg-white bg-opacity-50 jusify-center">
                  <LockIcon style={{ fontSize: 40 }} className='w-full h-full flex text-purple-600'/>
                </div>

                <div className="relative">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    className="block md:w-[710px] lg:w-[383px] px-4 py-4 text-purple-700 font-poppins placeholder-purple-700 placeholder-bold text-lg text-start bg-white bg-opacity-50 border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 "
                    placeholder='Password'
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div 
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    {passwordVisible ? <VisibilityOffIcon className='text-purple-600'/> : <VisibilityIcon className='text-purple-600'/>}
                  </div>
                  </div>
              </div>

              {/* Login Btn */}
              <div className="flex flex-row mt-8 items-center justify-center">
                  <button
                      className="bg-purple-700 w-1/2 p-4 tracking-wide text-white text-bold font-poppins text-lg uppercase transition-colors duration-200 transform bg-purple-700 rounded-full hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                  // onClick={() => handleLogin()}
                  // type='submit'
                  >
                      Login
                  </button>
              </div>
            </form>

            <p className="pb-8 text-md font-semibold text-center text-gray-700">
                {" "}
                Don't have an account?{" "}
                <a
                    href="/signup"
                    className="text-lg text-purple-600 hover:underline"
                >
                    Sign up
                </a>
            </p>
          </div>
        </div>
    </div>
      
  );
}