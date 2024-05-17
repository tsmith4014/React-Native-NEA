import { userRoleAmplifyStorage } from '@/store/amplifyStorage';
import createSharedSlice, { Shared } from '@/store/shared';
import { UserRole } from '@/store/types';
import zustandStorage from '@/store/zustandStorage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import authSlice, { Authentication } from './authentication';
import createUserSlice, { User } from './user';

export type TherapistStore = User & Authentication & Shared & { reset: () => void; handleSignOut: () => Promise<void> };

const useTherapistStore = create<TherapistStore>()(
    persist(
        (set, ...a) => {
            const initialState = {
                ...createUserSlice(set, ...a),
                ...authSlice(set, ...a),
                ...createSharedSlice(set, ...a),
            };
            return {
                ...initialState,
                handleSignOut: async () => {
                    userRoleAmplifyStorage[UserRole.therapist]?.clearAll();
                    a[0]().reset();
                },
                reset: () => {
                    set(initialState);
                },
            };
        },
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
