import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaViber,
} from "react-icons/fa";
import dog from '../../../assets/image/cute-pet-small.png'
import logo from '../../../assets/logo/logo-footer.png'
const Footer = () => {
  return (
    <div>
      <section className="md:container mx-auto mt-24 px-4 md:px-0 relative top-60">
        {/* card--1 overlap contianer  */}
        <div className=" bg-[#FFF9F4] rounded-xl md:p-5 md:flex items-center justify-center gap-20 z-20">
          {/* image container  */}
          <div className=" mt-8 mb-5 md:mb-0 md:w-[25%]">
            <img
              className="pt-5 md:pt-0 w-7/12 md:w-full mx-auto"
              src={dog}
              alt=""
            />
          </div>
          {/* content and input  */}
          <div className="md:col-span-2 md:ml-12">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-left">Get Pawsome News!</h1>
              <p className="sora-font text-xl mt-5 mb-10">
                Exclusive training tips, ticks, product deals and more.
              </p>
              <input
                type="email"
                placeholder="Enter email"
                className="input input-bordered py-8 px-5 w-[90%] md:w-full md:max-w-[90%] placeholder:sora-font placeholder:text-[#C4C4C4] border-none"
              />
              {/* btn  */}
              <div className="pb-6 md:pb-0">
                <button className="mt-10 btn bg-[#ffdc26] sora-font py-3 px-8 border-none text-xl hover:bg-[#ffdc26]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end of top section */}

      <footer className="bg-[rgba(255,220,38,0.5)] pt-96 pb-9 ">
        <section className="md:container mx-auto md:flex items-center justify-between gap-6 px-4 md:px-0">
          {/* col-1  */}
          <div className="md:w-4/12 mb-6 md:mb-0">
            {/* footer logo and text  */}
            <div className="flex gap-3 items-center justify-start text-left">
              <img src={logo} alt="" />
              <span className="sora-font text-[26px] title-color">
                Browse <span className="text-[#ffdc26]">4</span> Pets
              </span>
            </div>
            <p className="mt-6 sora-font md:w-9/12 text-xl  text-[rgba(17,17,17,0.7)]">
              Discover a world of treats, toys, and essentials handpicked for
              your furry friends
            </p>
          </div>
          {/* col-2 */}
          <div className="flex items-start mb-6 md:mb-0">
            <ul className="title-color text-xl sora-font space-y-4">
              <li>
                <a href="">Find a pet</a>
              </li>
              <li>
                <a href="">Breeds</a>
              </li>
              <li>
                <a href="">Contact us </a>
              </li>
            </ul>
          </div>
          {/* col-3  */}
          {/* icon and title  */}
          <div>
            {/* title  */}
            <h1 className="sora-font font-medium mb-3">Follow us</h1>
            {/* icon  */}
            <div className="space-x-3 md:space-x-2 text-2xl md:text-xl">
              <FaFacebook className="inline-block align-middle" />
              <FaInstagram className="inline-block align-middle" />
              <FaLinkedin className="inline-block align-middle" />
              <FaYoutube className="inline-block align-middle" />
              <FaViber className="inline-block align-middle" />
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
