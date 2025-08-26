// Função utilitária para calcular "tempo atrás"
export const timeAgo = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return `agora mesmo`;
  if (diffMin < 60) return `há ${diffMin} minuto${diffMin > 1 ? "s" : ""}`;
  if (diffHour < 24) return `há ${diffHour} hora${diffHour > 1 ? "s" : ""}`;
  return `há ${diffDay} dia${diffDay > 1 ? "s" : ""}`;
};
