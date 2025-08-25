import { useEffect, useState } from "react";

interface AlertMessageProps {
  message: string;
  duration?: number; // tempo em ms antes de sumir, default 5000
}

export default function AlertMessage({ message, duration = 5000 }: AlertMessageProps) {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    setVisible(!!message); // reseta quando a mensagem muda
    if (!message) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration]);

  if (!message || !visible) return null;

  return (
    <div
      className="alert alert-warning d-flex align-items-center justify-content-center shadow"
      role="alert"
      style={{ fontSize: '1.1rem', fontWeight: 600, borderRadius: 10 }}
    >
      <i
        className="bi bi-exclamation-triangle-fill me-2"
        style={{ fontSize: '1.5rem' }}
      ></i>
      <span>{message}</span>
    </div>
  );
}
