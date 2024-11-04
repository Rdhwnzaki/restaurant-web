"use client";
import React, { useEffect, useState } from 'react';
import { HiHome } from 'react-icons/hi';
import { IoPizza } from "react-icons/io5";
import { FaCalendarDay, FaHeart, FaLongArrowAltRight, FaPizzaSlice, FaDice } from "react-icons/fa";
import { IoIosCard } from "react-icons/io";
import { GiFrenchFries, GiNoodles, GiBarbecue, GiCakeSlice } from "react-icons/gi";
import Image from 'next/image';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

function Dashboard() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="flex h-screen">
            {/* Left Sidebar */}
            <aside className="w-16 h-full bg-[#f97777] flex flex-col items-center p-4 shadow-lg">
                <nav className="flex flex-col items-center space-y-10 mt-20">
                    <HiHome className="text-white text-3xl cursor-pointer transition-transform transform hover:scale-125" />
                    <IoPizza className="text-white text-3xl cursor-pointer transition-transform transform hover:scale-125" />
                    <FaCalendarDay className="text-white text-3xl cursor-pointer transition-transform transform hover:scale-125" />
                    <IoIosCard className="text-white text-3xl cursor-pointer transition-transform transform hover:scale-125" />
                    <FaHeart className="text-white text-3xl cursor-pointer transition-transform transform hover:scale-125" />
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow bg-gray-100 p-6">
                {/* Header Section */}
                <header className="mb-6 mx-10">
                    <label className="input input-bordered flex items-center gap-2 bg-white mt-10 p-3 rounded-3xl w-full max-w-md">
                        <input
                            type="text"
                            className="w-full p-3 border-none focus:outline-none"
                            placeholder="Search"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                </header>

                {/* Main Content */}
                <div className='mx-10'>
                    <div className="card bg-white w-full h-64 shadow rounded-3xl cursor-pointer">
                        <div className='flex items-center justify-between p-5'>
                            <figure>
                                <Image
                                    src="/images/card-image.png"
                                    alt="Shoes" width={300} height={300} />
                            </figure>
                            <div className="card-body">
                                <p className="text-[#f97777] font-bold text-2xl">Get dessert FOR FREE</p>
                                <p className='text-slate-400'>Make your first order for $50 and get dessert from our bakery for free</p>
                                <div className="card-actions justify-end text-slate-400 items-center">
                                    <h6>{"Learn more"}</h6>
                                    <FaLongArrowAltRight />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mx-10 mt-10'>
                    <p className='text-3xl font-semibold text-slate-800'>Restaurant</p>
                    <p className='text-slate-500'>{"Select category you'd like to eat from"}</p>
                    <div className='mt-8 flex justify-start'>
                        <button className="btn bg-white border-none hover:bg-[#f97777] hover:text-white rounded-badge me-5 text-slate-500"><FaDice className='text-2xl' />Surprise me!</button>
                        <button className="btn bg-white border-none hover:bg-[#f97777] hover:text-white rounded-badge me-5 text-slate-500"><GiCakeSlice className='text-2xl' />Dessert</button>
                        <button className="btn bg-white border-none hover:bg-[#f97777] hover:text-white rounded-badge me-5 text-slate-500"><FaPizzaSlice className='text-2xl' />Italian food</button>
                        <button className="btn bg-white border-none hover:bg-[#f97777] hover:text-white rounded-badge me-5 text-slate-500"><GiFrenchFries className='text-2xl' />Fast food</button>
                        <button className="btn bg-white border-none hover:bg-[#f97777] hover:text-white rounded-badge me-5 text-slate-500"><GiNoodles className='text-2xl' />Asian food</button>
                        <button className="btn bg-white border-none hover:bg-[#f97777] hover:text-white rounded-badge text-slate-500"><GiBarbecue className='text-2xl' />Barbecue</button>
                    </div>
                    <div className='w-56 mt-5'>
                        <Select options={options} placeholder="Sort by" />
                    </div>
                </div>
            </main>
            <aside className="w-96 h-full bg-white flex flex-col items-center p-4 shadow-lg">
                <nav className="flex flex-col items-center space-y-10 mt-20">
                    {/* Additional Sidebar Content */}
                </nav>
            </aside>
        </div>
    );
}

export default Dashboard;
