import createSharedSlice, { Shared } from '@/store/shared';
import zustandStorage from '@/store/zustandStorage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import signUpSlice, { Signup } from './sign-up';
import createUserSlice, { User } from './user';

export type SurvivorStore = User & Signup & Shared;

const useSurvivorStore = create<SurvivorStore>()(
    persist(
        (set, ...a) => ({
            ...createUserSlice(set, ...a),
            ...signUpSlice(set, ...a),
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
