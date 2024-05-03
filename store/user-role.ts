import { StateCreator } from 'zustand';

export enum UserRole {
    victim = 'victim',
    volunteer = 'volunteer',
    lawyer = 'lawyer',
    therapist = 'therapist',
}

export interface UserRoleSlice {
    selectedRole?: UserRole;
}

const createUserRoleSlice: StateCreator<UserRoleSlice> = (set) => ({
    selectedRole: undefined,
});

export default createUserRoleSlice;
