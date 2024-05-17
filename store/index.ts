import { create } from 'zustand';
import createGlobalAmplifySlice, { GlobalAmplifySlice } from './global-amplify';
import createLoadingSlice, { LoadingSlice } from './loading';
import localAuthenticationSlice, { LocalAuthenticationSlice } from './local-authentication';
import createUserRoleSlice, { UserRoleSlice } from './user-role';

export type RootState = GlobalAmplifySlice & UserRoleSlice & LocalAuthenticationSlice & LoadingSlice;

const useRootStore = create<RootState>()((set, ...a) => ({
    ...createUserRoleSlice(set, ...a),
    ...localAuthenticationSlice(set, ...a),
    ...createGlobalAmplifySlice(set, ...a),
    ...createLoadingSlice(set, ...a),
}));

export default useRootStore;
