export function formatDateBR(dateISO: string | Date) {
  return new Date(dateISO).toLocaleDateString('pt-BR');
}