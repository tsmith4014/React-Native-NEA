import createSharedSlice, { Shared } from '@/store/shared';
import zustandStorage from '@/store/zustandStorage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import createUserSlice, { User } from './user';

export type VolunteerStore = User & Shared;

const useVolunteerStore = create<VolunteerStore>()(
    persist(
        (set, ...a) => ({
            ...createUserSlice(set, ...a),
            ...createSharedSlice(set, ...a),
        }),
        {
            name: 'volunteerStore',
            storage: createJSONStorage(() => zustandStorage),
            onRehydrateStorage: () => (state) => {
                state!.setHasHydrated(true);
            },
        },
    ),
);

export default useVolunteerStore;
