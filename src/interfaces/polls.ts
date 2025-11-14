export type IPoll = {
  id?: number;
  question: string;
  categoryId: number; // opcional se quiser categorizar
  user_id: number; // autor da enquete
  createdAt?: string;
  updatedAt?: string;
  options?: IPollOption[]; // array de opções
};

export type IPollOption = {
  id?: number;
  poll_id: number;
  option_text: string;
  votes_count?: number;
};
