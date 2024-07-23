"use client";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    className: "",
                    duration: 5000,
                    style: {
                        background: "#363636",
                        color: "#fff",
                    },
                    success: {
                        duration: 3000,
                        theme: {
                            primary: "green",
                            secondary: "black",
                        },
                    },
                    error: {
                        duration: 3000,
                    },
                }}
            />
            {children}
        </>
    );
}
