import { useState } from 'react';
import SignupImg from '../assets/images/signin_signup_bg/signup.png';
import { GenderEnum } from '../types/enum.type';
import { RegisterInput } from '../types/user';
import { registerUser } from '../services/user';
import { useNavigate } from 'react-router-dom';
import SignupBgImage from '../assets/images/signin_signup_bg/signupBg.png';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TransgenderIcon from '@mui/icons-material/Transgender';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<GenderEnum | string>("MALE")
  const [username, setUsername] = useState<string>('')
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isClick, setIsClick] = useState<boolean>(false)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const registerData = {
      name: username,
      email,
      password,
      gender
    } as RegisterInput
    // console.log("username:", username);
    // console.log("Email:", email);
    // console.log("Password:", password);
    // console.log("Gender:", gender);
    // console.log("Register ...");
    const res = await registerUser(registerData)
    // console.log("Register:", res);
    setIsClick(true)
    if (res.accessToken && res.refreshToken) {
      setTimeout(
        () => navigate('/'),
        1500
      );
      return
    }
    navigate('');
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

        {/* Sign Up form */}
        <div className="w-full flex flex-col m-auto shadow-md lg:max-w-3xl">
          <div className="bg-purple-300 py-10 bg-opacity-25 w-full p-6">
            <h1 className='text-5xl text-white w-1/2 m-auto font-bold text-center font-DancingScript'>Welcome</h1>
            <h3 className='text-4xl text-white w-1/2 m-auto font-bold text-center font-DancingScript'>to AVATAR Cineplex</h3>
            <p className='text-md text-white pt-5'>Join the MovieTick community today and elevate your movie-going experience to new heights. Whether you're a casual movie lover or a dedicated cinephile, MovieTick is your go-to platform for all things cinema. Sit back, relax, and let us take care of your movie ticket needs. Enjoy the show!</p>
          </div>
          <div className="bg-white bg-opacity-50">
            <h1 className="text-3xl py-8 font-semibold text-center text-purple-700 uppercase font-poppins">
              User Sign Up
            </h1>
            <form className='p-6' onSubmit={handleSignUp}>
              <div className="py-2 flex flex-row px-8">
                <div className="relative flex items-center rounded-full p-3 mr-4 bg-white bg-opacity-50 jusify-center">
                  <PersonIcon style={{ fontSize: 40 }} className='w-full h-full flex text-purple-600' />
                </div>
                <input
                  type="text"
                  className="block w-full px-4 py- text-purple-700 font-poppins placeholder-purple-700 placeholder-bold text-lg bg-white bg-opacity-50 border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={username}
                  required
                  placeholder='Username'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="py-2 flex flex-row px-8">
                <div className="relative flex items-center rounded-full p-3 mr-4 bg-white bg-opacity-50 jusify-center">
                  <EmailIcon style={{ fontSize: 40 }} className='w-full h-full flex text-purple-600' />
                </div>
                <input
                  type="email"
                  className="block w-full px-4 py- text-purple-700 font-poppins placeholder-purple-700 placeholder-bold text-lg bg-white bg-opacity-50 border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={email}
                  required
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="py-2 flex flex-row px-8">
                <div className="relative flex items-center rounded-full p-3 mr-4 bg-white bg-opacity-50 jusify-center">
                  <TransgenderIcon style={{ fontSize: 40 }} className='w-full h-full flex text-purple-600' />
                </div>
                <select onChange={(e) => setGender(e.target.value)} id="large" className="block w-full px-4 py- text-purple-700 font-poppins placeholder-purple-700 placeholder-bold text-lg bg-white bg-opacity-50 border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
                  <option selected>Select Gender</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="MALE">MALE</option>
                </select>

              </div>

              <div className="py-2 flex flex-row px-8 ">
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
                    {passwordVisible ? <VisibilityIcon className='text-purple-600' /> : < VisibilityOffIcon className='text-purple-600' />}
                  </div>
                </div>
              </div>

              {/* Login Btn */}
              <div className="flex flex-row mt-8 items-center justify-center">
                {
                  isClick ? (
                    <button disabled type="button" className="bg-purple-700 w-1/2 p-4 tracking-wide text-white text-bold font-poppins text-lg uppercase transition-colors duration-200 transform rounded-full hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                      </svg>
                      Loading...
                    </button>
                  ) : (<button
                    className="bg-purple-700 w-1/2 p-4 tracking-wide text-white text-bold font-poppins text-lg uppercase transition-colors duration-200 transform  rounded-full hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                  >
                    Sign Up
                  </button>)
                }
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