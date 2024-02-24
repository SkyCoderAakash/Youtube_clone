import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import { Context } from "../context/contextApi";
import Loader from "../shared/loader";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestion,setSuggestion] = useState([]);
    // const [showSuggestion,setShowSuggestion] = useState(false);

    useEffect(()=>{
        const timer = setTimeout(()=>{getSuggestion()},200);
        return(()=>{
          clearTimeout(timer);
        });
      },[searchQuery]);
    
      const getSuggestion = async ()=>{
        const data = await fetch('http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q='+searchQuery);
        const json = await data.json();
        setSuggestion(json[1]);
      };

    const { loading, mobileMenu, setMobileMenu } = useContext(Context);

    const navigate = useNavigate();

    const searchQueryHandler = (event) => {
        if ((event?.key === "Enter" || event === "searchButton") && searchQuery?.length > 0){
            navigate(`/searchResult/${searchQuery}`);
            // console.log(suggestion);
        }
    };

    const mobileMenuToggle = () => {
        setMobileMenu(!mobileMenu);
    };

    const { pathname } = useLocation();
    const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

    return (
        <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black">
            {loading && <Loader />}

            <div className="flex h-5 items-center bg-white dark:bg-black">
                {pageName !== "video" && (
                    <div
                        className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
                        onClick={mobileMenuToggle}
                    >
                        {mobileMenu ? (
                            <CgClose className="text-white text-xl" />
                        ) : (
                            <SlMenu className="text-white text-xl" />
                        )}
                    </div>
                )}
                <Link to="/" className="flex h-5 items-center">
                    <img
                        className="h-full hidden dark:md:block"
                        src={ytLogo}
                        alt="Youtube"
                    />
                    <img
                        className="h-full md:hidden"
                        src={ytLogoMobile}
                        alt="Youtube"
                    />
                </Link>
            </div>
            <div className="group flex items-center bg-white dark:bg-black">
                    <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-5">
                        <input type="text" className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-5 md:w-64 lg:w-[500px]" onChange={(e) => setSearchQuery(e.target.value)} onKeyUp={searchQueryHandler} placeholder="Search" value={searchQuery} />
                    </div>
                    <button className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]" onClick={() => searchQueryHandler("searchButton")}>
                        <IoIosSearch className="text-white text-xl" />
                    </button>
            </div>

            {/* {showSuggestion && <div className='fixed w-[37%] rounded-2xl bg-gray-100 overflow-hidden z-10'>
              <ul>
                {suggestion.map((value)=>{
                  return (<li key={value} className='px-4 py-1 rounded-2xl hover:bg-black hover:text-white'>{value}</li>)
                })}
              </ul>
            </div>} */}
            
            <div className="flex items-center bg-white dark:bg-black">
                <div className="hidden md:flex">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <RiVideoAddLine className="text-white text-xl cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <FiBell className="text-white text-xl cursor-pointer" />
                    </div>
                    <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
                        <img src="https://xsgames.co/randomusers/assets/avatars/male/67.jpg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
