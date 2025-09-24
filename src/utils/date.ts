export function formatDateBR(date?: string | Date) {
  if (!date) return "Data não disponível";

  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "Data inválida";

  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}