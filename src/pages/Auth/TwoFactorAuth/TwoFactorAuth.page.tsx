import { useState } from 'react';
import AuthService from '../../../services/auth/auth.service';

interface TwoFactorAuthProps {
  qrCode: string; // Base64 string
  userId: string;
  onSuccess: () => void; // Chamado após login completo
}

function TwoFactorAuth({ qrCode, userId, onSuccess }: TwoFactorAuthProps) {
  const authService = new AuthService();
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    try {
      const res = await authService.verify2FA(userId, token);
      localStorage.setItem('token', res.token);
      onSuccess(); // Redireciona
    } catch (err) {
      setError('Código inválido. Tente novamente.');
    }
  };

  return (
    <div className="text-center">
      <h2>Ativação do 2FA</h2>
      <p>Escaneie o QR Code com seu app autenticador:</p>
      <img src={qrCode} alt="QR Code" style={{ maxWidth: 200, marginBottom: 20 }} />

      <div>
        <input
          type="text"
          placeholder="Digite o código 2FA"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button onClick={handleVerify}>Verificar</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default TwoFactorAuth;
