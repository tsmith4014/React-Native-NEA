import amplifyLawyerConfig from '@/cognito/lawyer';
import amplifySurvivorConfig from '@/cognito/survivor';
import amplifyTherapistConfig from '@/cognito/therapist';
import amplifyVolunteerConfig from '@/cognito/volunteer';
import LocalAuthentication from '@/components/LocalAuthentication';
import shadow from '@/infrastructure/theme/shadow';
import useRootStore from '@/store';
import AmplifyStorage from '@/store/amplifyStorage';
import { UserRole } from '@/store/types';
import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, View } from 'react-native-ui-lib';

const sections = [
    {
        text: ['I am here to get ', 'Help', ', Talk, Access Resources'],
        image: require('@/assets/images/survivor.png'),
        role: UserRole.survivor,
    },
    {
        text: ['I want to ', 'Volunteer', ' to Chat, Offer Emotional Support'],
        image: require('@/assets/images/volunteer.png'),
        role: UserRole.volunteer,
    },
    {
        text: ['I am a ', 'Lawyer', ' offering legal aid for DV survivors'],
        image: require('@/assets/images/lawyer.png'),
        role: UserRole.lawyer,
    },
    {
        text: ['I am a ', 'Therapist', ' offering counseling for DV survivors'],
        image: require('@/assets/images/therapist.png'),
        role: UserRole.therapist,
    },
] as const;

const amplifyConfig: Record<UserRole, typeof amplifySurvivorConfig> = {
    [UserRole.survivor]: amplifySurvivorConfig,
    [UserRole.volunteer]: amplifyVolunteerConfig,
    [UserRole.lawyer]: amplifyLawyerConfig,
    [UserRole.therapist]: amplifyTherapistConfig,
};

const WalkthroughScreen = () => {
    const { switchRole, selectedRole } = useRootStore();
    const onSelectRole = async (role: UserRole) => {
        switchRole(role);
        Amplify.configure(amplifyConfig[role]);
        cognitoUserPoolsTokenProvider.setKeyValueStorage(new AmplifyStorage(role));
    };
    return (
        <SafeAreaView>
            {selectedRole && <LocalAuthentication />}
            <View className="min-h-full flex flex-col gap-6 p-4 mt-2 justify-start">
                {sections.map((section) => {
                    const { text, image, role } = section;
                    return (
                        <Pressable
                            key={role}
                            className="bg-spring50 px-8 py-4 rounded-2xl flex items-center justify-center"
                            style={shadow.elevation2}
                            onPress={() => onSelectRole(role)}
                        >
                            <Image resizeMode="contain" className="h-14 w-14 mb-4" source={image} />
                            <Text className="wrap w-72 text-center text-gray90">
                                <Text className="font-regular">{text[0]}</Text>
                                <Text className="font-bold">{text[1]}</Text>
                                <Text className="font-regular">{text[2]}</Text>
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </SafeAreaView>
    );
};

export default WalkthroughScreen;
