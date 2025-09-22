import React from "react";
import { Toaster } from "sonner";

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        expand={true}
        richColors
        closeButton
        toastOptions={{
          style: {
            fontFamily: "var(--outfit-font-family)",
            fontSize: "14px",
            borderRadius: "12px",
          },
          className: "helda-toast",
        }}
        theme="light"
      />
    </>
  );
};
