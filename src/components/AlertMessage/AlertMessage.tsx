interface AlertMessageProps {
  message: string;
}

export default function AlertMessage({ message }: AlertMessageProps) {
  if (!message) return null;

  return (
    <div
      className="alert alert-warning d-flex align-items-center justify-content-center shadow"
      role="alert"
      style={{ fontSize: '1.1rem', fontWeight: 600, borderRadius: 10 }}
    >
      <i className="bi bi-exclamation-triangle-fill me-2" style={{ fontSize: '1.5rem' }}></i>
      <span>{message}</span>
    </div>
  );
}
