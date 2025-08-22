
// components/ui/Alert.tsx
type AlertProps = {
  type?: 'success' | 'warning' | 'danger' | 'info';
  children: React.ReactNode;
};

export default function Alert({ type = 'info', children }: AlertProps) {
  return (
    <div
      className={`alert alert-${type} text-center my-3`}
      role="alert"
      aria-live="polite"
    >
      {children}
    </div>
  );
}
