import { StateCreator } from 'zustand';

export type CountryItem = {
    value: string;
    label: string;
};

export interface Authentication {
    country?: CountryItem;
    email: string;
    username: string;
    password: string;
    newPassword: string;
    newPasswordConfirm: string;
    updateAuthForm: (value: Partial<Omit<Authentication, 'updateAuthForm'>>) => void;
}

const authSlice: StateCreator<Authentication> = (set) => ({
    country: undefined,
    email: '',
    username: '',
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
    updateAuthForm: (value) => set(value),
});

export default authSlice;
