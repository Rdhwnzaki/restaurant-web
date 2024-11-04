"use client";
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useStore from '../store/useStore';

export default function Register() {
    const { setUser } = useStore();
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser(formData);

        toast.success('Registrasi berhasil!');

        setFormData({
            username: '',
            password: '',
            address: '',
        });

        setTimeout(() => {
            router.push('/login');
        }, 2000);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
            <Toaster position="top-center" reverseOrder={false} />

            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105 text-black"
            >
                <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Register</h2>

                <label className="block text-gray-600 font-medium mb-2">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#f97777] transition duration-200 ease-in bg-white"
                    required
                />

                <label className="block text-gray-600 font-medium mb-2">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#f97777] transition duration-200 ease-in bg-white"
                    required
                />

                <label className="block text-gray-600 font-medium mb-2">Alamat:</label>
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#f97777] transition duration-200 ease-in bg-white"
                    required
                ></textarea>

                <button
                    type="submit"
                    className="w-full py-3 mt-2 bg-[#f97777] text-white rounded-lg font-semibold text-lg shadow-md hover:bg-[#f97777] transition duration-300"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
