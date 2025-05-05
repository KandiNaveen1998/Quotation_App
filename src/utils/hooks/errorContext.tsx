import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ErrorContextType {
  error: Error | null;
  throwError: (message: string) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  const throwError = (message: string) => {
    setError(new Error(message));
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, throwError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};


// 🚫 When Not to Use It
// ❌ Don't Use If...	Why
// You only need local error handling	Use try-catch or setState in the component itself
// The error is component-specific and not used elsewhere	Context adds complexity if overused
// You already use an error boundary for rendering errors	Let Error Boundaries handle that instead

// 🔄 Summary: Use Context-based Error Handling for...
// Scenario	Use Context?
// Reusable global error display	✅ Yes
// Shared logic for multiple screens	✅ Yes
// One-off error on a single screen	❌ No
// Sending error logs to a server	✅ Yes
// Page crash due to a rendering error	❌ Use Error Boundary
