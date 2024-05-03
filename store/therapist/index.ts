import createSharedSlice, { Shared } from '@/store/shared';
import zustandStorage from '@/store/zustandStorage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import createUserSlice, { User } from './user';

export type TherapistStore = User & Shared;

const useTherapistStore = create<TherapistStore>()(
    persist(
        (set, ...a) => ({
            ...createUserSlice(set, ...a),
            ...createSharedSlice(set, ...a),
        }),
        {
            name: 'therapistStore',
            storage: createJSONStorage(() => zustandStorage),
            onRehydrateStorage: () => (state) => {
                state!.setHasHydrated(true);
            },
        },
    ),
);

export default useTherapistStore;
