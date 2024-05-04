import createSharedSlice, { Shared } from '@/store/shared';
import zustandStorage from '@/store/zustandStorage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import createUserSlice, { User } from './user';

export type SurvivorStore = User & Shared;

const useSurvivorStore = create<SurvivorStore>()(
    persist(
        (set, ...a) => ({
            ...createUserSlice(set, ...a),
            ...createSharedSlice(set, ...a),
        }),
        {
            name: 'survivorStore',
            storage: createJSONStorage(() => zustandStorage),
            onRehydrateStorage: () => (state) => {
                state!.setHasHydrated(true);
            },
        },
    ),
);

export default useSurvivorStore;
