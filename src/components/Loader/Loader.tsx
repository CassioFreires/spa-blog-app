type LoaderProps = {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
};

export default function Loader({ size = 'md', message, className = '' }: LoaderProps) {
  const sizeClass = size === 'sm' ? 'spinner-border-sm' : size === 'lg' ? 'spinner-border-lg' : '';

  return (
    <div className={`text-center my-5 ${className}`}>
      <div className={`spinner-border ${sizeClass}`} role="status" aria-label="Carregando" />
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
