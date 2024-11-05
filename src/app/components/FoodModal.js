import { useState } from "react";
import Image from "next/image";

export default function InfoModal({ dataFood, onClose, onAddOrder }) {
    const [qty, setQty] = useState(1);

    const handleQtyChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 1) {
            setQty(value);
        }
    };

    const handleOrder = () => {
        const order = { ...dataFood, qty };
        onAddOrder(order);
        onClose();
    };

    return (
        <dialog
            open
            className='modal bg-black/40 flex items-center justify-center animate-fadeIn'>
            <div className='modal-box relative bg-white rounded-xl shadow-2xl p-8 max-w-md'>
                <button
                    className='btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-red-500 absolute top-3 right-3'
                    onClick={onClose}
                    aria-label='Close'>
                    ✕
                </button>
                <div className='text-center'>
                    <h3 className='font-bold text-2xl mb-4 text-gray-900'>Information</h3>
                    <figure className='flex justify-center mb-6'>
                        <Image
                            alt='modal-image'
                            src={dataFood.image || "/default-image.png"}
                            width={250}
                            height={250}
                            className='rounded-lg object-cover shadow-md transition-transform duration-300 hover:scale-105'
                        />
                    </figure>
                    <div className='text-left space-y-2'>
                        <p className='text-lg font-semibold text-gray-800'>
                            {dataFood.name || "Unknown"}
                        </p>
                        <p className='text-gray-600'>
                            Restaurant:{" "}
                            <span className='font-medium'>
                                {dataFood.restaurant || "N/A"}
                            </span>
                        </p>
                        <p className='text-gray-600'>
                            Reviews:{" "}
                            <span className='font-medium'>
                                {dataFood.review || "No reviews"}
                            </span>
                        </p>
                        <p className='text-gray-600'>
                            Stars:{" "}
                            <span className='font-medium'>
                                {dataFood.stars || "No rating"}
                            </span>{" "}
                            ⭐
                        </p>
                        <p className='text-gray-600'>
                            Price:{" "}
                            <span className='font-semibold text-green-600'>
                                ${dataFood.price || "N/A"}
                            </span>
                        </p>

                        <div className='mt-4'>
                            <label htmlFor='qty' className='text-gray-700 font-medium'>
                                Quantity:
                            </label>
                            <input
                                type='number'
                                id='qty'
                                name='qty'
                                value={qty}
                                onChange={handleQtyChange}
                                className='mt-1 p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none'
                                min='1'
                            />
                        </div>
                        <button
                            onClick={handleOrder}
                            className='btn mt-4 w-full bg-[#f97777] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#f97777]'>
                            Pesan
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
