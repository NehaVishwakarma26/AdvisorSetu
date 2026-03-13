import { create } from 'zustand';

interface SavedStore {
  savedIds: string[];
  toggleSave: (advisorId: string) => void;
  isSaved: (advisorId: string) => boolean;
}

export const useSavedStore = create<SavedStore>((set, get) => ({
  savedIds: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('savedAdvisors') || '[]') : [],

  toggleSave: (advisorId) => {
    const current = get().savedIds;
    const updated = current.includes(advisorId)
      ? current.filter(id => id !== advisorId)
      : [...current, advisorId];
    if (typeof window !== 'undefined') localStorage.setItem('savedAdvisors', JSON.stringify(updated));
    set({ savedIds: updated });
  },

  isSaved: (advisorId) => get().savedIds.includes(advisorId),
}));
