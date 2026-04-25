import React, { createContext, useContext, useState, useCallback } from "react";
import { ToastContainer } from "../components/ui/toast";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(({ message, type = "success", duration = 4000 }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const showSuccessToast = useCallback((message) => {
    showToast({ message, type: "success" });
  }, [showToast]);

  const showErrorToast = useCallback((message) => {
    showToast({ message: message || "Something went wrong. Please try again.", type: "error" });
  }, [showToast]);

  const showInfoToast = useCallback((message) => {
    showToast({ message, type: "info" });
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ 
      showToast, 
      showSuccessToast, 
      showErrorToast, 
      showInfoToast, 
      removeToast 
    }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
