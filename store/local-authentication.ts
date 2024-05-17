import { StateCreator } from 'zustand';

export interface LocalAuthenticationSlice {
    isLocalAuthenticationEnabled?: boolean;
    setIsLocalAuthenticationEnabled: (localAuthenticationEnabled: boolean) => void;
}

const localAuthenticationSlice: StateCreator<LocalAuthenticationSlice> = (set) => ({
    isLocalAuthenticationEnabled: undefined,
    setIsLocalAuthenticationEnabled: (isLocalAuthenticationEnabled = true) => {
        set({ isLocalAuthenticationEnabled });
    },
});

export default localAuthenticationSlice;
