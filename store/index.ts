import { create } from 'zustand';
import useLawyerStore from './lawyer';
import useTherapistStore from './therapist';
import createUserRoleSlice, { UserRoleSlice } from './user-role';
import useVictimStore from './victim';
import useVolunteerStore from './volunteer';

export type RootState = {
    victim: typeof useVictimStore;
    volunteer: typeof useVolunteerStore;
    lawyer: typeof useLawyerStore;
    therapist: typeof useTherapistStore;
} & UserRoleSlice;

const useRootStore = create<RootState>()((...a) => ({
    ...createUserRoleSlice(...a),
    victim: useVictimStore,
    volunteer: useVolunteerStore,
    lawyer: useLawyerStore,
    therapist: useTherapistStore,
}));

export default useRootStore;
