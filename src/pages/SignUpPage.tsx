import { useState } from 'react';
import SignupImg from '../assets/signup.png';
import { GenderEnum } from '../types/enum.type';
import { RegisterInput } from '../types/user';
import { registerUser } from '../services/user';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<GenderEnum | string>("MALE")
  const [username, setUsername] = useState<string>('')
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
    <div className="relative flex flex-col justify-center bg-gradient-to-r from-red-900 to-purple-900 min-h-screen">
      <div className="lg:flex lg:gap-x-4 justify-center items-center mx-4">
        <div className="lg:max-w-xl w-full">
          <img
            className="w-full h-full object-cover rounded-md"
            src={SignupImg}
            alt="sign up with image"
          />
        </div>
        <div className="w-full bg-transparent rounded-md lg:max-w-xl">
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
        </div>
      </div>
    </div>
  );
}