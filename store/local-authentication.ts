import { StateCreator } from 'zustand';

export interface LocalAuthenticationSlice {
    localAuthenticationDone: boolean;
    setLocalAuthenticationDone: (localAuthenticationDone?: boolean) => void;
}

const localAuthenticationSlice: StateCreator<LocalAuthenticationSlice> = (set) => ({
    localAuthenticationDone: false,
    setLocalAuthenticationDone: (localAuthenticationDone = true) => {
        set({ localAuthenticationDone });
    },
});

export default localAuthenticationSlice;
