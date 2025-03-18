import { create } from "zustand";

const useStore = create((set) => ({
  user: {},
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: [] }),
}));

export const useTotalStore = create((set) => ({
  final_total: 0,
  total_general: 0,
  total_amount: 0,

  // Fonction pour mettre à jour le total
  updateFinalTotal: (newTotal) => set({ final_total: newTotal }),
  updateTotalGeneral: (Total) => set({ total_general: Total }),
  updateTotalAmount: (amount) => set({ total_amount: amount }),
}));

export default useStore;
