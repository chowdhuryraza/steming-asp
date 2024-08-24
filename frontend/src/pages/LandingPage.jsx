import React from 'react'
import { Link } from 'react-router-dom'
import columbiaImg from "../assets/images/Columbia.png"
import nyuImg from "../assets/images/NYU.png"
import stonyImg from "../assets/images/Stony.png"
import heroImg from "../assets/images/Hero2.jpg"
import About from '../components/About'
import News from '../components/News'
import Contact from '../components/Contact'
import { ACCESS_TOKEN } from "../constants";
import {jwtDecode} from "jwt-decode";

const LandingPage = () => {
  const token = localStorage.getItem(ACCESS_TOKEN)
  var data = null

  if(token){
    data = jwtDecode(token)
  }

  return (
    <>
      <div className="relative bg-[#008000] pb-[110px] pt-[120px] lg:pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-5/12">
              <div className="hero-content">
                <h1 className="mb-5 text-4xl font-bold !leading-[1.208] text-[#ffff00] sm:text-[42px] lg:text-[40px] xl:text-5xl">
                  Grow Your Dreams With STEMing Aspirations
                </h1>
                <p className="mb-8 max-w-[480px] text-base text-white">
                  At STEMing Aspirations, we are excited to support dedicated students achieve their academic
                  and professional goals without a price tag. From free tutoring to partnerships with various student
                  organizations, we will work to make your dreams a reality.
                </p>
                <ul className="flex flex-wrap items-center">
                  <li>
                    <Link
                      to={data ? "/profile" : "/register"}
                      className="inline-flex items-center justify-center rounded-md bg-yellow px-6 py-3 text-center text-base font-medium text-white hover:bg-yellow-dark lg:px-7"
                    >
                      {data ? "Your Account" : "Get Started"}
                    </Link>
                  </li>
                  <li className='ml-4'>
                    <Link
                      to="/#about"
                      className="inline-flex items-center justify-center rounded-md bg-yellow px-6 py-3 text-center text-base font-medium text-white hover:bg-yellow-dark lg:px-7"
                    >
                      Learn More
                    </Link>
                  </li>
                </ul>
                <div className="clients pt-16">
                  <h6 className="mb-6 flex items-center text-xs font-normal text-white">
                    Led By Students At
                    <span className="ml-3 inline-block h-px w-8 bg-white"></span>
                  </h6>

                  <div className="flex items-center space-x-4 bg-white rounded-lg p-2">
                    <SingleImage
                      href="#"
                      imgSrc={columbiaImg}
                    />

                    <SingleImage
                      href="#"
                      imgSrc={nyuImg}
                    />

                    <SingleImage
                      href="#"
                      imgSrc={stonyImg}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden px-4 lg:block lg:w-1/12"></div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                  <img
                    src={heroImg}
                    alt="Eager Students In Classroom"
                    className="max-w-full lg:ml-auto max-h-[520px]"
                  />
                  <span className="absolute -bottom-8 -left-8 z-[-1]">
                    <svg
                      width="93"
                      height="93"
                      viewBox="0 0 93 93"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#ffff00" />
                      <circle cx="2.5" cy="24.5" r="2.5" fill="#ffff00" />
                      <circle cx="2.5" cy="46.5" r="2.5" fill="#ffff00" />
                      <circle cx="2.5" cy="68.5" r="2.5" fill="#ffff00" />
                      <circle cx="2.5" cy="90.5" r="2.5" fill="#ffff00" />
                      <circle cx="24.5" cy="2.5" r="2.5" fill="#ffff00" />
                      <circle cx="24.5" cy="24.5" r="2.5" fill="#ffff00" />
                      <circle cx="24.5" cy="46.5" r="2.5" fill="#ffff00" />
                      <circle cx="24.5" cy="68.5" r="2.5" fill="#ffff00" />
                      <circle cx="24.5" cy="90.5" r="2.5" fill="#ffff00" />
                      <circle cx="46.5" cy="2.5" r="2.5" fill="#ffff00" />
                      <circle cx="46.5" cy="24.5" r="2.5" fill="#ffff00" />
                      <circle cx="46.5" cy="46.5" r="2.5" fill="#ffff00" />
                      <circle cx="46.5" cy="68.5" r="2.5" fill="#ffff00" />
                      <circle cx="46.5" cy="90.5" r="2.5" fill="#ffff00" />
                      <circle cx="68.5" cy="2.5" r="2.5" fill="#ffff00" />
                      <circle cx="68.5" cy="24.5" r="2.5" fill="#ffff00" />
                      <circle cx="68.5" cy="46.5" r="2.5" fill="#ffff00" />
                      <circle cx="68.5" cy="68.5" r="2.5" fill="#ffff00" />
                      <circle cx="68.5" cy="90.5" r="2.5" fill="#ffff00" />
                      <circle cx="90.5" cy="2.5" r="2.5" fill="#ffff00" />
                      <circle cx="90.5" cy="24.5" r="2.5" fill="#ffff00" />
                      <circle cx="90.5" cy="46.5" r="2.5" fill="#ffff00" />
                      <circle cx="90.5" cy="68.5" r="2.5" fill="#ffff00" />
                      <circle cx="90.5" cy="90.5" r="2.5" fill="#ffff00" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <About/>
      <hr/>
      <News/>
      <hr/>
      <Contact/>
      
    </>
  )
}

export default LandingPage

const SingleImage = ({ href, imgSrc }) => {
  return (
    <>
      <a href={href} className="flex w-full items-center justify-center">
        <img src={imgSrc} alt="brand image" className="h-10 w-full max-w-[110px]" />
      </a>
    </>
  );
};