import { StateCreator } from 'zustand';

export interface User {
    name: string;
    email: string;
}

const createUserSlice: StateCreator<User> = () => ({
    name: '',
    email: '',
});

export default createUserSlice;
