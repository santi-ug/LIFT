import { create } from 'zustand';
import { SearchState } from '../../types/exercise';

export const useSearchStore = create<SearchState>((set) => ({
  searchText: '',
  setSearchText: (text: string) => set({ searchText: text }),
}));
