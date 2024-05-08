import { StateCreator } from 'zustand';

export type CountryItem = {
    value: string;
    label: string;
};

export interface Signup {
    country?: CountryItem;
    email: string;
    username: string;
    password: string;
    updateSignupForm: (value: Partial<Omit<Signup, 'updateSignupForm'>>) => void;
}

const signUpSlice: StateCreator<Signup> = (set) => ({
    country: undefined,
    email: '',
    username: '',
    password: '',
    updateSignupForm: (value) => set(value),
});

export default signUpSlice;
