import { create } from 'zustand';
import useLawyerStore from './lawyer';
import localAuthenticationSlice, { LocalAuthenticationSlice } from './local-authentication';
import useSurvivorStore from './survivor';
import useTherapistStore from './therapist';
import createUserRoleSlice, { UserRole, UserRoleSlice } from './user-role';
import useVolunteerStore from './volunteer';

export type RootState = {
    survivor: typeof useSurvivorStore;
    volunteer: typeof useVolunteerStore;
    lawyer: typeof useLawyerStore;
    therapist: typeof useTherapistStore;
    switchRole: (role: UserRole) => void;
    currentUserStore?:
        | typeof useSurvivorStore
        | typeof useVolunteerStore
        | typeof useLawyerStore
        | typeof useTherapistStore;
} & UserRoleSlice &
    LocalAuthenticationSlice;

const useRootStore = create<RootState>()((set, ...a) => ({
    ...createUserRoleSlice(set, ...a),
    ...localAuthenticationSlice(set, ...a),
    survivor: useSurvivorStore,
    volunteer: useVolunteerStore,
    lawyer: useLawyerStore,
    therapist: useTherapistStore,
    switchRole: (role: UserRole) =>
        set((state) => {
            return { selectedRole: role, currentUserStore: state[role] };
        }),
}));

export default useRootStore;
