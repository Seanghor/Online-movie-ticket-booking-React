import { useState } from 'react';
import SignupImg from '../assets/signup.png';
import { GenderEnum } from '../types/enum.type';
import { RegisterInput } from '../types/user';
import { registerUser } from '../services/user';
import { useNavigate } from 'react-router-dom';
import SignupBgImage from '../assets/signupBg.png';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';

export default function Signup() {
  const navigate = useNavigate();
  // const [status, setStatus] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<GenderEnum | string>("MALE")
  const [username, setUsername] = useState<string>('')
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  setGender("MALE")
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const registerData = {
      name: username,
      email,
      password,
      gender
    } as RegisterInput
    console.log("username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Gender:", gender);
    console.log("Register ...");
    const res = await registerUser(registerData)
    console.log("Register:", res);
    if (res.accessToken && res.refreshToken) {
      navigate('/')
    }


  }
  return (
    <div className="relative flex flex-col justify-center bg-gradient-to-r from-red-900 to-purple-900 min-h-screen bg-cover" style={{ backgroundImage: `url(${SignupBgImage})` }}>
      <div className="lg:flex lg:gap-x-20 justify-start items-center">
        <div className="lg:max-w-xl w-full lg:ml-36">
          <img
            className="w-full h-full object-cover rounded-md"
            src={SignupImg}
            alt="sign up with image"
          />
        </div>

        {/* Sign up form */}
        {/* <div className="w-full bg-transparent rounded-md lg:max-w-xl">
          <h1 className="text-2xl font-semibold text-center text-white">
            Create an account
          </h1>
          <form className="mt-6" onSubmit={handleSignUp}>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-white"
              >
                Name
              </label>
              <input
                type="text"
                placeholder='Username'
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-white"
              >
                Email
              </label>
              <input
                type="email"
                placeholder='example@gmail.com'
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-white"
              >
                Password
              </label>
              <input
                type="password"
                placeholder='password'
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="text-xs text-white font-bold">
              Password must be at least 8 characters long
            </p>
            <div className="mt-6">
              <button className="w-full px-4 py-2 text-white bg-[#0284c7] rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600">
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-5 text-sm text-center text-white">
            {" "}
            Already a member?{" "}
            <a href="/login" className="font-medium text-[#0284c7] hover:underline">
              Sign in
            </a>
          </p>
        </div> */}
        {/* Sign Up form */}

        <div className="w-full flex flex-col m-auto shadow-md lg:max-w-3xl">
          <div className="bg-purple-300 py-10 bg-opacity-25 w-full p-6">
            <h1 className='text-5xl text-white w-1/2 m-auto font-bold text-center font-DancingScript'>Welcome</h1>
            <h3 className='text-4xl text-white w-1/2 m-auto font-bold text-center font-DancingScript'>to MovieTick</h3>
            <p className='text-md text-white pt-5'>Join the MovieTick community today and elevate your movie-going experience to new heights. Whether you're a casual movie lover or a dedicated cinephile, MovieTick is your go-to platform for all things cinema. Sit back, relax, and let us take care of your movie ticket needs. Enjoy the show!</p>
          </div>
          <div className="bg-white bg-opacity-50">
            <h1 className="text-3xl py-8 font-semibold text-center text-purple-700 uppercase font-poppins">
              User Sign Up
            </h1>
            <form className='p-6' onSubmit={handleSignUp}>
              <div className="py-4 flex flex-row px-8">
                <div className="relative flex items-center rounded-full p-3 mr-4 bg-white bg-opacity-50 jusify-center">
                  <PersonIcon style={{ fontSize: 40 }} className='w-full h-full flex text-purple-600' />
                </div>
                <input
                  type="text"
                  className="block w-full px-4 py-2 text-purple-700 font-poppins placeholder-purple-700 placeholder-bold text-lg bg-white bg-opacity-50 border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={username}
                  required
                  placeholder='Username'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="py-4 flex flex-row px-8">
                <div className="relative flex items-center rounded-full p-3 mr-4 bg-white bg-opacity-50 jusify-center">
                  <EmailIcon style={{ fontSize: 40 }} className='w-full h-full flex text-purple-600' />
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
                  <LockIcon style={{ fontSize: 40 }} className='w-full h-full flex text-purple-600' />
                </div>

                <div className="relative">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    className="block sm:w-[1000px] md:w-[710px] lg:w-[575px] px-4 py-4 text-purple-700 font-poppins placeholder-purple-700 placeholder-bold text-lg text-start bg-white bg-opacity-50 border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 "
                    placeholder='Password'
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    {passwordVisible ? <VisibilityOffIcon className='text-purple-600' /> : <VisibilityIcon className='text-purple-600' />}
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
                  Sign Up
                </button>
              </div>
            </form>

            <p className="pb-8 text-md font-semibold text-center text-gray-700">
              {" "}
              Already have an account?{" "}
              <a
                href="/login"
                className="text-lg text-purple-600 hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}