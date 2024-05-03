import { StateCreator } from 'zustand';

export enum UserRole {
    victim = 'victim',
    volunteer = 'volunteer',
    lawyer = 'lawyer',
    therapist = 'therapist',
}

export interface UserRoleSlice {
    selectedRole?: UserRole;
    switchRole: (role: UserRole) => void;
}

const createUserRoleSlice: StateCreator<UserRoleSlice> = (set) => ({
    selectedRole: undefined,
    switchRole: (role: UserRole) => set(() => ({ selectedRole: role })),
});

export default createUserRoleSlice;
