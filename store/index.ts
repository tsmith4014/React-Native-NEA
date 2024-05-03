import { create } from 'zustand';
import useLawyerStore from './lawyer';
import useTherapistStore from './therapist';
import createUserRoleSlice, { UserRole, UserRoleSlice } from './user-role';
import useVictimStore from './victim';
import useVolunteerStore from './volunteer';

export type RootState = {
    victim: typeof useVictimStore;
    volunteer: typeof useVolunteerStore;
    lawyer: typeof useLawyerStore;
    therapist: typeof useTherapistStore;
    switchRole: (role: UserRole) => void;
    currentUserStore?:
        | typeof useVictimStore
        | typeof useVolunteerStore
        | typeof useLawyerStore
        | typeof useTherapistStore;
} & UserRoleSlice;

const useRootStore = create<RootState>()((set, ...a) => ({
    ...createUserRoleSlice(set, ...a),
    victim: useVictimStore,
    volunteer: useVolunteerStore,
    lawyer: useLawyerStore,
    therapist: useTherapistStore,
    switchRole: (role: UserRole) =>
        set((state) => {
            return { selectedRole: role, currentUserStore: state[role] };
        }),
}));

export default useRootStore;
