import { confirmSignUp, signIn, signOut, signUp, type ConfirmSignUpInput, type SignInInput } from 'aws-amplify/auth';
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
    signupResponse: any;
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
    try {
        const signupRes = await signUp({
            username,
            password,
            options: {
                userAttributes: {
                    email,
                },
            },
        });

        console.log(JSON.stringify(signupRes, null, 2));
        return signupRes;
    } catch (error) {
        console.log('error signing up:', error);
    }
}

async function handleSignUpConfirmation({ username, confirmationCode }: ConfirmSignUpInput) {
    try {
        const confirmSignupRes = await confirmSignUp({
            username,
            confirmationCode,
        });
        console.log(confirmSignupRes);
        return confirmSignupRes;
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

async function handleSignIn({ username, password }: SignInInput) {
    try {
        await signOut();
        const signInResponse = await signIn({ username, password });
        console.log(signInResponse);
        return signInResponse;
    } catch (error) {
        console.log('error signing in', error);
    }
}

const authSlice: StateCreator<Authentication> = (set, get) => ({
    country: undefined,
    email: '',
    username: '',
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
    signupResponse: {},
    updateAuthForm: (value) => set(value),
    handleSignup: async () => {
        await signOut();
        const { username, password, email } = get();
        const signupResponse = await handleSignUp({ username, password, email });
        set({ signupResponse });
        return signupResponse;
    },
    handleSignUpConfirmation: async ({ confirmationCode }) => {
        const { username } = get();
        return handleSignUpConfirmation({ username, confirmationCode });
    },
    handleSignIn: async () => {
        const { username, password } = get();
        return handleSignIn({ username, password });
    },
});

export default authSlice;
