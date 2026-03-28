import { create } from 'zustand';

interface User {
  id: string;
  full_name: string;
  email: string;
  role: 'owner' | 'admin' | 'staff';
  firm_id: string | null;
}

interface Firm {
  id: string;
  name: string;
  owner_id: string | null;
}

interface AppState {
  user: User | null;
  firm: Firm | null;
  isSidebarOpen: boolean;
  setUser: (user: User | null) => void;
  setFirm: (firm: Firm | null) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  firm: null,
  isSidebarOpen: true,
  setUser: (user) => set({ user }),
  setFirm: (firm) => set({ firm }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));
