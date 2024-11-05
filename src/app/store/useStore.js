import { create } from "zustand";

const useStore = create((set) => {
    const isBrowser = typeof window !== "undefined";

    const initialUser = isBrowser
        ? JSON.parse(localStorage.getItem("user")) || {
            username: "",
            password: "",
            address: "",
        }
        : {
            username: "",
            password: "",
            address: "",
        };

    return {
        user: initialUser,
        setUser: (newUser) => {
            set({ user: newUser });
            if (isBrowser) {
                localStorage.setItem("user", JSON.stringify(newUser));
            }
        },
    };
});

export default useStore;
