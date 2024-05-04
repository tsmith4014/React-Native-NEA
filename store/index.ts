import { create } from 'zustand';
import useLawyerStore from './lawyer';
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
} & UserRoleSlice;

const useRootStore = create<RootState>()((set, ...a) => ({
    ...createUserRoleSlice(set, ...a),
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
