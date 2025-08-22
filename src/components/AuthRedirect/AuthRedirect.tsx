// src/components/ui/AuthRedirectMessage.tsx
import { useEffect } from "react";

type AuthRedirectMessageProps = {
  message: string;
  redirectTo: string;
};

export default function AuthRedirectMessage({ message, redirectTo }: AuthRedirectMessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = redirectTo;
    }, 4000);
    return () => clearTimeout(timer);
  }, [redirectTo]);

  return (
    <div className="alert alert-warning text-center my-3" role="alert">
      {message}
    </div>
  );
}
