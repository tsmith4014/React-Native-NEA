import {
    ConfirmSignUpInput,
    SignInInput,
    SignInOutput,
    confirmSignUp,
    fetchUserAttributes,
    signIn,
    signInWithRedirect,
    signUp,
    updateUserAttributes,
} from 'aws-amplify/auth';
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
    legalName: string;
    newPasswordConfirm: string;
    userAttributes: Record<string, string>;
    resetPasswordConfirmationCode: string;
    updateAuthForm: (value: Partial<Omit<Authentication, 'updateAuthForm'>>) => void;
    handleSignup: () => ReturnType<typeof handleSignUp>;
    handleSignUpConfirmation: (args: { confirmationCode: string }) => ReturnType<typeof handleSignUpConfirmation>;
    handleSignIn: (oauthProvider?: 'Google' | 'Apple') => Promise<SignInOutput | void>;
    handleUpdateUserAttributes: (userAttributes: Record<string, string>) => Promise<void>;
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
    legalName: '',
    newPasswordConfirm: '',
    userAttributes: {},
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
    handleSignIn: async (oauthProvider) => {
        let signInResponse;
        if (!oauthProvider) {
            const { username, password } = get();
            signInResponse = await handleSignIn({ username, password });
        } else {
            signInResponse = await signInWithRedirect({ provider: oauthProvider });
        }
        const userAttributesResponse = await fetchUserAttributes();
        set({ userAttributes: userAttributesResponse as Record<string, string> });
        return signInResponse;
    },
    handleUpdateUserAttributes: async (userAttributes) => {
        await updateUserAttributes({ userAttributes });
        set({ userAttributes });
    },
});

export default authSlice;
