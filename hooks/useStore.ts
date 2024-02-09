import { create } from 'zustand';

interface CreateState {
  collapsedMenuActive: boolean;
  setCollapsedMenuActive: (toggle: boolean) => void;
  unitSystem: string;
  setUnitSystem: (unit: 'US' | 'SI') => void;
}

export const useStore = create<CreateState>()((set) => ({
  collapsedMenuActive: false,
  setCollapsedMenuActive: (toggle) => set({ collapsedMenuActive: toggle }),
  unitSystem: 'US',
  setUnitSystem: (unit) => set({ unitSystem: unit }),
}));
