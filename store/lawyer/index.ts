import createSharedSlice, { Shared } from '@/store/shared';
import zustandStorage from '@/store/zustandStorage';
import { signOut } from 'aws-amplify/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import authSlice, { Authentication } from './authentication';
import createUserSlice, { User } from './user';

export type LawyerStore = User & Authentication & Shared & { reset: () => void; handleSignOut: () => Promise<void> };

const useLawyerStore = create<LawyerStore>()(
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
                    await signOut();
                    a[0]().reset();
                },
                reset: () => {
                    set(initialState);
                },
            };
        },
        {
            name: 'lawyerStore',
            storage: createJSONStorage(() => zustandStorage),
            onRehydrateStorage: () => (state) => {
                state!.setHasHydrated(true);
            },
        },
    ),
);

export default useLawyerStore;
