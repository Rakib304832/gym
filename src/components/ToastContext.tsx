"use client"; 
import { createContext, useContext, useState, useCallback } from "react";

type Toast = { id: number; message: string }; 

const ToastContext = createContext<{ showToast: (msg: string) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]); 

  const showToast = useCallback((message: string) => {
    const id = Date.now(); 
    setToasts((prev) => [...prev, { id, message }]); 
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id)); 
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-[#C6F135] text-black px-4 py-2 rounded-xl text-sm font-semibold shadow-lg"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext); 
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}