import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import ToastComponent from '../../reusableComponents/ToastComponent';

interface Toast {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: Toast['type'], duration?: Toast['duration']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [toast, setToast] = useState<Toast | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string, type: Toast['type'] = 'info', duration: Toast['duration'] = 2500) => {
    if (timeoutRef.current) {clearTimeout(timeoutRef.current);}

    setToast({ message, type, duration });

    timeoutRef.current = setTimeout(() => {
      setToast(null);
      timeoutRef.current = null;
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <ToastComponent message={toast.message} type={toast.type} duration={toast.duration} />}
    </ToastContext.Provider>
  );
};


// import React, { createContext, useContext, useCallback, ReactNode } from 'react';

// type ToastType = 'success' | 'error';

// type ToastContextType = {
//   showToast: (message: string, type: ToastType) => void;
// };

// const ToastContext = createContext<ToastContextType | undefined>(undefined);

// export const ToastProvider = ({ children }: { children: ReactNode }) => {
//   const showToast = useCallback((message: string, type: ToastType) => {
//     // You can use any toast library here (e.g., react-toastify, Notistack, etc.)
//     // alert(`[${type.toUpperCase()}]: ${message}`);
//   }, []);

//   return (
//     <ToastContext.Provider value={{ showToast }}>
//       {children}
//     </ToastContext.Provider>
//   );
// };

// export const useToast = (): ToastContextType => {
//   const context = useContext(ToastContext);
//   if (!context) {
//     throw new Error('useToast must be used within a ToastProvider');
//   }
//   return context;
// };
