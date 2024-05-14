import { confirmSignUp, signIn, signUp, type ConfirmSignUpInput, type SignInInput, signOut } from 'aws-amplify/auth';
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
    handleSignUpConfirmation: typeof handleSignUpConfirmation;
    handleSignIn: typeof handleSignIn;
}

type SignUpParameters = {
    username: string;
    password: string;
    email: string;
};

async function handleSignUp({ username, password, email }: SignUpParameters) {
    try {
        const signupRes = await signUp({
            username: email,
            password,
            options: {
                userAttributes: {
                    preferred_username: username,
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

async function handleSignUpConfirmation({
    email,
    confirmationCode,
}: Partial<ConfirmSignUpInput> & { email: string; confirmationCode: string }) {
    try {
        const confirmSignupRes = await confirmSignUp({
            username: email,
            confirmationCode,
        });
        console.log(confirmSignupRes);
        return confirmSignupRes;
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

async function handleSignIn({ email, password }: Omit<SignInInput, 'username'> & { email: string }) {
    try {
        await signOut();
        const signInResponse = await signIn({ username: email, password });
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
    handleSignUpConfirmation,
    handleSignIn,
});

export default authSlice;
