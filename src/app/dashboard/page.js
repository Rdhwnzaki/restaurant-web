"use client";
import React, { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi";
import { IoPizza } from "react-icons/io5";
import {
    FaCalendarDay,
    FaHeart,
    FaLongArrowAltRight,
    FaPizzaSlice,
    FaDice,
    FaStar,
    FaUser,
} from "react-icons/fa";
import { IoIosCard, IoIosPin } from "react-icons/io";
import {
    GiFrenchFries,
    GiNoodles,
    GiBarbecue,
    GiCakeSlice,
} from "react-icons/gi";
import Image from "next/image";
import Select from "react-select";
import data from "../utils/data";
import EachUtils from "../utils/EachUtils";
import useStore from "../store/useStore";
import FoodModal from "../components/FoodModal";
import { toast, Toaster } from "react-hot-toast";

const options = [
    { value: "price", label: "Price" },
    { value: "travel_time", label: "Travel Time" },
    { value: "review", label: "Review" },
    { value: "stars", label: "Stars" },
];

function Dashboard() {
    const [sortedData, setSortedData] = useState(data);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const { user } = useStore();
    const [dataOrder, setDataOrder] = useState([]);
    const [dataFood, setDataFood] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    const handleSortChange = (selectedOption) => {
        const sorted = [...data].sort((a, b) => {
            if (selectedOption.value === "price") {
                return a.price - b.price;
            } else if (selectedOption.value === "travel_time") {
                return a.travel_time - b.travel_time;
            } else if (selectedOption.value === "review") {
                return b.review - a.review;
            } else if (selectedOption.value === "stars") {
                return b.stars - a.stars;
            }
            return 0;
        });
        setSortedData(sorted);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        filterData(query, selectedCategory);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        filterData(searchQuery, category);
    };

    const filterData = (query, category) => {
        const filteredData = data.filter((food) => {
            const matchesQuery = food.name.toLowerCase().includes(query);
            const matchesCategory = category ? food.category === category : true;
            return matchesQuery && matchesCategory;
        });
        setSortedData(filteredData);
    };

    const categoryButtons = [
        { icon: FaDice, label: "Surprise me!", category: null },
        { icon: GiCakeSlice, label: "Dessert", category: "dessert" },
        { icon: FaPizzaSlice, label: "Italian food", category: "italian food" },
        { icon: GiFrenchFries, label: "Fast food", category: "fast food" },
        { icon: GiNoodles, label: "Asian food", category: "asian food" },
        { icon: GiBarbecue, label: "Barbecue", category: "barbecue" },
    ];

    const handleFoodClick = (food) => {
        setDataFood(food);
        setShowModal(true);
    };

    const addOrder = (order) => {
        setDataOrder((prevOrders) => {
            const existingOrderIndex = prevOrders.findIndex(
                (item) => item.id === order.id
            );

            if (existingOrderIndex !== -1) {
                const updatedOrders = [...prevOrders];
                updatedOrders[existingOrderIndex] = {
                    ...updatedOrders[existingOrderIndex],
                    qty: updatedOrders[existingOrderIndex].qty + order.qty,
                };
                return updatedOrders;
            } else {
                return [...prevOrders, order];
            }
        });
    };

    const handleDeleteOrder = (id) => {
        const updatedOrder = dataOrder.filter((order) => order.id !== id);
        setDataOrder(updatedOrder);
    };

    const calculateDeliveryCost = () => {
        const costPerItem = 5;
        const discountCostPerItem = 3;
        const discountThreshold = 5;

        const totalQty = dataOrder.reduce((total, item) => total + item.qty, 0);

        const deliveryCost =
            totalQty >= discountThreshold
                ? totalQty * discountCostPerItem
                : totalQty * costPerItem;

        return deliveryCost;
    };

    const totalCost = () => {
        const totalPrice = dataOrder.reduce(
            (total, item) => total + item.price * item.qty,
            0
        );

        const totalDelivery = calculateDeliveryCost();

        const total = totalPrice + totalDelivery;

        return total;
    };

    const handleSubmitOrder = () => {
        setDataOrder([]);
        toast.success("Makanan berhasil di order");
    };

    return (
        <div className='flex min-h-screen bg-gray-100'>
            <Toaster position='top-center' reverseOrder={false} />
            <aside className='w-16 h-screen bg-[#f97777] flex flex-col items-center p-4 shadow-lg'>
                <nav className='flex flex-col items-center space-y-10 mt-20'>
                    <EachUtils
                        of={[HiHome, IoPizza, FaCalendarDay, IoIosCard, FaHeart]}
                        render={(Icon, i) => (
                            <Icon
                                key={i}
                                className='text-white text-3xl cursor-pointer transition-transform transform hover:scale-125'
                            />
                        )}
                    />
                </nav>
            </aside>

            <main className='flex-grow bg-gray-100 '>
                <header className='mb-6 mx-10'>
                    <label className='input input-bordered flex items-center gap-2 bg-white mt-10 p-3 rounded-3xl w-full max-w-md'>
                        <input
                            type='text'
                            className='w-full p-3 border rounded focus:outline-none'
                            placeholder='Search foods'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 16 16'
                            fill='currentColor'
                            className='h-4 w-4 opacity-70'>
                            <path
                                fillRule='evenodd'
                                d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </label>
                </header>

                <section className='mx-10'>
                    <div className='card bg-white w-full h-64 shadow rounded-3xl cursor-pointer'>
                        <div className='flex items-center justify-between p-5'>
                            <figure>
                                <Image
                                    src='/images/card-image.png'
                                    alt='Shoes'
                                    width={300}
                                    height={300}
                                />
                            </figure>
                            <div className='card-body'>
                                <h2 className='text-[#f97777] font-bold text-2xl'>
                                    Get dessert FOR FREE
                                </h2>
                                <p className='text-slate-400'>
                                    Make your first order for $50 and get dessert from our bakery
                                    for free
                                </p>
                                <div className='card-actions justify-end text-slate-400 items-center'>
                                    <h6>Learn more</h6>
                                    <FaLongArrowAltRight />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='mx-10 mt-10'>
                    <h3 className='text-3xl font-semibold text-slate-800'>Restaurant</h3>
                    <p className='text-slate-500'>
                        {"Select category you'd like to eat from"}
                    </p>
                    <div className='mt-8 flex'>
                        <EachUtils
                            of={categoryButtons}
                            render={(btn, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleCategoryClick(btn.category)}
                                    className='btn bg-white border-none hover:bg-[#f97777] hover:text-white rounded-badge me-5 text-slate-500'>
                                    <btn.icon className='text-2xl' />
                                    {btn.label}
                                </button>
                            )}
                        />
                    </div>

                    <div className='w-56 mt-5'>
                        <Select
                            options={options}
                            placeholder='Sort by'
                            onChange={handleSortChange}
                        />
                    </div>

                    <div className='mt-5 grid grid-cols-3 gap-5 h-[calc(45vh-100px)] overflow-y-auto'>
                        {sortedData.length > 0 ? (
                            <EachUtils
                                of={sortedData}
                                render={(food, index) => (
                                    <div
                                        key={index}
                                        className='w-96 cursor-pointer'
                                        onClick={() => {
                                            handleFoodClick(food);
                                        }}>
                                        <div className='card bg-base-100 w-96 shadow-xl mt-5'>
                                            <div className='p-3'>
                                                <div className='flex items-center justify-between'>
                                                    <p className='font-bold'>{food.distance_km} km</p>
                                                    <p className='font-bold'>{food.travel_time} mins</p>
                                                </div>
                                            </div>
                                            <figure className='h-48 w-full overflow-hidden'>
                                                <Image
                                                    alt={food.name}
                                                    src={food.image}
                                                    width={300}
                                                    height={300}
                                                    className='object-cover w-full h-full'
                                                />
                                            </figure>
                                        </div>
                                        <div className='flex justify-between mt-5'>
                                            <p className='font-semibold'>{food.name}</p>
                                            <p className='font-bold'>${food.price}</p>
                                        </div>
                                        <div className='flex justify-between mt-2 text-slate-500'>
                                            <p className='font-medium'>{food.restaurant}</p>
                                            <div className='flex items-center'>
                                                <p>{food.stars}</p>
                                                <FaStar className='text-yellow-300' />
                                                <p className='font-medium'>({food.review} reviews)</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        ) : (
                            <p className='text-center'>Tidak ada data</p>
                        )}
                    </div>

                    {showModal && (
                        <FoodModal
                            dataFood={dataFood}
                            onClose={() => setShowModal(false)}
                            onAddOrder={addOrder}
                        />
                    )}
                </section>
            </main>

            <aside className='w-96 h-screen bg-white p-4 shadow-lg'>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <FaUser className='text-[#f97777] text-lg' />
                        <p className='ms-2'>{user.username ?? "-"}</p>
                    </div>
                    <div className='flex items-center'>
                        <IoIosPin className='text-[#f97777] text-lg' />
                        <p className='ms-2'>{user.address ?? "-"}</p>
                    </div>
                </div>
                <div className='divider'></div>
                {dataOrder.length > 0 ? (
                    <div className='flex flex-col'>
                        <p className='font-bold text-lg'>My Order</p>
                        <div className='flex flex-col'>
                            <EachUtils
                                of={dataOrder}
                                render={(order, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center justify-between pt-5'>
                                        <Image
                                            alt='order-image'
                                            src={order.image}
                                            width={50}
                                            height={50}
                                            className='rounded-lg border-2 border-gray-300 shadow-md transition-transform transform hover:scale-110'
                                        />
                                        <div className='flex flex-row'>
                                            <p className='me-3'>x{order.qty}</p>
                                            <p>{order.name}</p>
                                        </div>
                                        <div className='flex flex-row items-center'>
                                            <p className='font-bold me-3'>
                                                ${order.price * order.qty}
                                            </p>
                                            <button
                                                className='btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-red-500 '
                                                onClick={() => {
                                                    handleDeleteOrder(order.id);
                                                }}
                                                aria-label='Close'>
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                )}
                            />
                            <div className='flex justify-between mt-10'>
                                <p className='font-bold text-lg'>Delivery</p>
                                <p className='font-bold text-lg'>${calculateDeliveryCost()}</p>
                            </div>
                            <div className='divider'></div>
                            <div className='flex flex-row justify-end mb-10'>
                                <p className='font-bold text-xl'>Total : </p>
                                <p className='font-bold text-xl'>${totalCost()}</p>
                            </div>
                        </div>
                        <button
                            className='w-full py-3 mt-2 bg-[#f97777] text-white rounded-lg font-semibold text-lg shadow-md hover:bg-[#f97777] transition duration-300'
                            onClick={handleSubmitOrder}>
                            Submit order
                        </button>
                        <button
                            type='submit'
                            className='w-full py-3 mt-2 bg-[#f0f5f8] text-black rounded-lg font-semibold text-lg shadow-md hover:bg-black hover:text-white transition duration-300'>
                            <div className='flex justify-between mx-5 items-center'>
                                <Image
                                    alt='logo-mastercard'
                                    src='/images/mastercard.png'
                                    width={50}
                                    height={50}
                                />
                                <p>6373 8371 **** ****</p>
                                <p className='text-sm'>Edit</p>
                            </div>
                        </button>
                    </div>
                ) : (
                    <p className='text-center'>Tidak ada data order</p>
                )}
            </aside>
        </div>
    );
}

export default Dashboard;
