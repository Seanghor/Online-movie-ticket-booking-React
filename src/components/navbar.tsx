import { useEffect, useReducer, useState } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";
import { BiMoviePlay } from "react-icons/bi";
import { FaTimes, FaBars } from "react-icons/fa";
import GradeIcon from '@mui/icons-material/Grade';
import { IconButton } from './Icon_Button';
import { useNavigate } from 'react-router-dom';
import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';
import { Badge, Avatar } from "@material-tailwind/react";
import MovieFilterRoundedIcon from '@mui/icons-material/MovieFilterRounded';
// import { HomeIcon, BookmarkIcon, TicketIcon } from "@heroicons/react/24/solid";

import { checkAccessTokenExpiration, getAccessToken, getRefreshToken, logOut } from '../services/auth';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log("Current route:", currentPath);

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [btnTitle, setBtnTitle] = useState('Sign Up')
  const [isAuth, setIsAuth] = useState(false)


  const [noti, setNoti] = useState(0)

  // Define an array of routes where the navigation bar should be hidden
  const hiddenRoutes = ['/login', '/signup'];
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()
  const userInfo = getRefreshToken()
  // Check if the current route is in the hiddenRoutes array
  const isHiddenRoute = hiddenRoutes.includes(location.pathname);


  // Fetch data from localStorage
  useEffect(() => {
    // Function to handle the custom event and update the notification count
    const handleReservationUpdate = () => {
      // Get the updated reservation data from local storage
      const res = localStorage.getItem('reserve');
      const jsonData = JSON.parse(res || "[]");

      // Update the notification count
      setNoti(jsonData.length);
    };
    handleReservationUpdate()

    // Listen for the custom event when reservation is updated
    window.addEventListener('reservationUpdated', handleReservationUpdate);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('reservationUpdated', handleReservationUpdate);
    };
  }, [noti]);


  useEffect(() => {
    const checkIsAuth = async () => {
      if (accessToken && refreshToken && userInfo) {
        setIsAuth(true)
        setBtnTitle("Log Out")
      } else {
        setIsAuth(false)
        setBtnTitle("Sign Up")
      }
    }
    if (isAuth) {
      setBtnTitle("Log Out")
    } else {
      setBtnTitle("Sign Up")
    }
    checkIsAuth()
  }, [isAuth, accessToken, refreshToken, userInfo])


  if (isHiddenRoute) {
    // If the current route is a hidden route, return null to not render the navigation bar
    return null;
  }

  const handleClickBtn = async () => {
    console.log("isAuth:", isAuth);
    if (isAuth) {
      const res = await logOut()
      console.log("Res:", res);
      console.log("Log out ...");
    } else {
      console.log("Sign Up");
    }

  }
  return (
    <nav className="bg-nav dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b  dark:border-gray-600">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <Link to="/" className="text-white flex items-center justify-self-start cursor-pointer no-underline text-3xl">
            <BiMoviePlay className="mr-2" onClick={closeMobileMenu} />
            MovieTick
          </Link>
        </a>
        {/* Hamburger and Cross Sign */}
        <div className="flex flex-row items-center md:order-2 ">
          <div className='px-10 w-10'>
            {
              noti === 0 || currentPath === "/bill_detail"
                ? (null)
                : (

                  <Link to={"/bill_detail"}>
                    <Badge content={noti}>
                      <MovieFilterRoundedIcon className="h-6 w-6 text-white" />
                    </Badge>
                  </Link>

                )
            }
          </div>
          {/* <div className='px-10'>
            <Link to={"/bill_detail"}>
              <Badge content={noti}>
                <TicketIcon className="h-6 w-6 text-white" />
              </Badge>
            </Link>
          </div> */}
          <div>
            <Link to={isAuth ? '/login' : "/signup"}>
              <IconButton
                title={btnTitle}
                emoji={''}
                isTitleOnly={true}
                isIconOnly={false}
                onClick={() => { handleClickBtn() }}
                isDisabled={false}
                className={"ml-3 text-white bg-[#0284c7] font-semibold hover:text-white py-2 px-6 border border-blue hover:bg-transparent rounded uppercase"}
              />
            </Link>
          </div>
          <div className="sm:hidden">
            {/*  Hamburger icon and cross icon */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Hamburger icon and cross icon */}
          </div>

        </div>
        {/* Hamburger and Cross Sign End */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li className=''>
              <NavLink to="/" className={({ isActive }) => `${isActive ? 'text-blue-400' : "text-white"}`}>
                HOME
              </NavLink>
            </li>

            <li >
              <NavLink to="/movie" className={({ isActive }) => `${isActive ? 'text-blue-400' : "text-white"}`}>
                MOVIE
              </NavLink>
            </li>
            <li>
              <NavLink to="/cinema" className={({ isActive }) => `${isActive ? 'text-blue-400' : "text-white"}`}>
                CINEMAS
              </NavLink>
            </li>
            <li>
              <NavLink to="/promotion" className={({ isActive }) => `${isActive ? 'text-blue-400' : "text-white"}`}>
                PROMOTIONS
              </NavLink>
            </li>

            <li >
              <NavLink to="/contactus" className={({ isActive }) => `${isActive ? 'text-blue-400' : "text-white"}`}>
                CONTACT US
              </NavLink>
            </li>


          </ul>
        </div>
      </div>

      <div
        className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 text-center">
          <NavLink to="/home" className={({ isActive }) => `${isActive ? 'text-blue-400 hover:bg-blue-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium' : "text-white hover:bg-blue-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}`}>
            HOME
          </NavLink>
          <NavLink to="/movie" className={({ isActive }) => `${isActive ? 'text-blue-400 hover:bg-blue-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium' : "text-white hover:bg-blue-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}`}>
            MOVIE
          </NavLink>
          <NavLink to="/cinema" className={({ isActive }) => `${isActive ? 'text-blue-400 hover:bg-blue-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium' : "text-white hover:bg-blue-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}`}>
            CINEMAS
          </NavLink>
          <NavLink to="/promotion" className={({ isActive }) => `${isActive ? 'text-blue-400 hover:bg-blue-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium' : "text-white hover:bg-blue-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}`}>
            PROMOTIONS
          </NavLink>

          <NavLink to="/contactus" className={({ isActive }) => `${isActive ? 'text-blue-400 hover:bg-blue-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium' : "text-white hover:bg-blue-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}`}>
            CONTACT US
          </NavLink>
        </div>
      </div>
    </nav>



  );
}

export default Navbar;
