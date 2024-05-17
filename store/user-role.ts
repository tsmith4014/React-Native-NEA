import useLawyerStore from '@/store/lawyer';
import useSurvivorStore from '@/store/survivor';
import useTherapistStore from '@/store/therapist';
import useVolunteerStore from '@/store/volunteer';
import { StateCreator } from 'zustand';

export enum UserRole {
    survivor = 'survivor',
    volunteer = 'volunteer',
    lawyer = 'lawyer',
    therapist = 'therapist',
}

export interface UserRoleSlice {
    selectedRole?: UserRole;
    switchRole: (role?: UserRole) => void;
    survivor: typeof useSurvivorStore;
    volunteer: typeof useVolunteerStore;
    lawyer: typeof useLawyerStore;
    therapist: typeof useTherapistStore;
    currentUserStore?:
        | typeof useSurvivorStore
        | typeof useVolunteerStore
        | typeof useLawyerStore
        | typeof useTherapistStore;
}

const createUserRoleSlice: StateCreator<UserRoleSlice> = (set, get) => ({
    selectedRole: undefined,
    survivor: useSurvivorStore,
    volunteer: useVolunteerStore,
    lawyer: useLawyerStore,
    therapist: useTherapistStore,
    switchRole: (role?: UserRole) => {
        const state = get();
        set({ selectedRole: role, currentUserStore: role ? state[role] : undefined });
    },
});

export default createUserRoleSlice;
