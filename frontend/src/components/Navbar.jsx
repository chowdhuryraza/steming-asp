import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import headerImg from '../assets/images/ProfilePic.png'
import { ACCESS_TOKEN } from "../constants";
import {jwtDecode} from "jwt-decode";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const location = useLocation()

  const token = localStorage.getItem(ACCESS_TOKEN)
  var data = null

  if(token){
    data = jwtDecode(token)
  }


  if(location.pathname === "/" || location.pathname === "/tutoringRequest" || 
    location.pathname === "/profile" || location.pathname === "/resources"){
    return (
      <header className={`absolute left-0 top-0 z-20 flex w-full items-center bg-[#126e12]`}>
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4">
              <Link to="/" className="block w-full py-5">
                <img
                  src={headerImg}
                  alt="STEMing Aspirations Logo"
                  style={{height:60}}                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={() => setOpen(!open)}
                  id="navbarToggler"
                  className={` ${
                    open && "navbarTogglerActive"
                  } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
                >
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                </button>
                <nav
                  // :className="!navbarOpen && 'hidden' "
                  id="navbarCollapse"
                  className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                    !open && "hidden"
                  } `}
                >
                  <ul className="hidden lg:flex">
                    <ListItem NavLink="/">Home</ListItem>
                    <ListItem NavLink="/tutoringRequest">Tutoring</ListItem>
                    <ListItem NavLink="/resources">Resources</ListItem>
                    <ListItem NavLink="/#contact">Contact Us</ListItem>
                  </ul>
                  <ul className="block lg:hidden" onClick={() => setOpen(!open)}>
                    <ListItem NavLink="/">Home</ListItem>
                    <ListItem NavLink="/tutoringRequest">Tutoring</ListItem>
                    <ListItem NavLink="/resources">Resources</ListItem>
                    <ListItem NavLink="/#contact">Contact Us</ListItem>
                    <ListItem NavLink={data ? '/logout' : '/login'}>{data ? 'Logout' : 'Login'}</ListItem>
                    <ListItem NavLink={data ? '/profile' : '/register'}>{data ? data.username : 'Sign Up'}</ListItem>
                  </ul>
                </nav>
              </div>
              <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
                <Link
                  to={data ? '/logout' : '/login'}
                  className="px-7 py-3 text-base font-medium hover:text-[#ffff00] text-white"
                >
                  {data ? 'Logout' : 'Login'}
                </Link>

                <Link
                  to={data ? '/profile' : '/register'}
                  className="rounded-md bg-yellow px-7 py-3 text-base font-medium text-white hover:bg-yellow/90"
                >
                  {data ? data.username : 'Sign Up'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
};

export default Navbar;

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <Link
          to={NavLink}
          className="flex py-2 text-base font-medium text-white hover:text-yellow lg:ml-12 lg:inline-flex"
        >
          {children}
        </Link>
      </li>
    </>
  );
};