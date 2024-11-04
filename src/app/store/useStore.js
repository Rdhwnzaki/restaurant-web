// src/app/store/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
    user: {
        username: '',
        password: '',
        address: '',
    },
    setUser: (newUser) => set({ user: newUser }),
}));

export default useStore;
