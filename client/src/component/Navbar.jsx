import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <div className="flex justify-between  items-center h-24 max-w-[1240px] mx-auto px-4 text-black">
            <Link to="/" className="w-full text-3xl font-bold text-blue-600">
                Ace Garage         </Link>
            <ul className="hidden md:flex">
                <Link to="/Home" className="p-4">
                    Home
                </Link>
                <Link to="/service" className="p-4">
                    Service
                </Link>
                <Link to="/breakdowns" className="p-4">
                    Breakdowns
                </Link>
                <Link to="/help" className="p-4">
                    Connect
                </Link>
                <Link to="/about" className="p-4">
                    About
                </Link>

                <Link
                    to="/signup"
                    className="p-4 text-center font-medium rounded-md w-24 px-3 text-white bg-blue-600"
                    style={{
                        height: '40px',
                        paddingTop: '9px',
                        marginTop: '6px',
                    }}
                >
                    SignUp
                </Link>
            </ul>
            <div onClick={handleNav} className="block md:hidden ">
                {nav ? (
                    <AiOutlineClose size={20} />
                ) : (
                    <AiOutlineMenu size={20} />
                )}
            </div>
            <ul
                className={
                    nav
                        ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
                        : 'ease-in-out duration-500 fixed left-[-100%]'
                }
            >
                <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
                    upKeep
                </h1>
                <li className="p-4 border-b border-gray-600">Home</li>
                <li className="p-4 border-b border-gray-600">Services</li>
                <li className="p-4 border-b border-gray-600">Help</li>
                <li className="p-4 border-b border-gray-600">About</li>
                <li className="p-4">Become a vendor</li>
            </ul>
        </div>
    );
};

export default Navbar;