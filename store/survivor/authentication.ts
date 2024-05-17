import { ConfirmSignUpInput, SignInInput, confirmSignUp, signIn, signUp } from 'aws-amplify/auth';
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
    resetPasswordConfirmationCode: string;
    updateAuthForm: (value: Partial<Omit<Authentication, 'updateAuthForm'>>) => void;
    handleSignup: () => ReturnType<typeof handleSignUp>;
    handleSignUpConfirmation: (args: { confirmationCode: string }) => ReturnType<typeof handleSignUpConfirmation>;
    handleSignIn: () => ReturnType<typeof handleSignIn>;
}

type SignUpParameters = {
    username: string;
    password: string;
    email: string;
};

async function handleSignUp({ username, password, email }: SignUpParameters) {
    return await signUp({
        username,
        password,
        options: {
            userAttributes: {
                email,
            },
        },
    });
}

async function handleSignUpConfirmation({ username, confirmationCode }: ConfirmSignUpInput) {
    return await confirmSignUp({
        username,
        confirmationCode,
    });
}

async function handleSignIn({ username, password }: SignInInput) {
    return await signIn({ username, password });
}

const authSlice: StateCreator<Authentication> = (set, get) => ({
    country: undefined,
    email: '',
    username: '',
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
    resetPasswordConfirmationCode: '',
    updateAuthForm: (value) => set(value),
    handleSignup: async () => {
        const { username, password, email } = get();
        return await handleSignUp({ username, password, email });
    },
    handleSignUpConfirmation: async ({ confirmationCode }) => {
        const { username } = get();
        return handleSignUpConfirmation({ username, confirmationCode });
    },
    handleSignIn: async () => {
        const { email, password } = get();
        return handleSignIn({ username: email, password });
    },
});

export default authSlice;
