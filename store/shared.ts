import { StateCreator } from 'zustand';

export interface Shared {
    _hasHydrated: boolean;
    setHasHydrated: (hasHydrated: boolean) => void;
}

const createSharedSlice: StateCreator<Shared> = (set) => ({
    _hasHydrated: false,
    setHasHydrated: (_hasHydrated) => {
        set({
            _hasHydrated,
        });
    },
});

export default createSharedSlice;
