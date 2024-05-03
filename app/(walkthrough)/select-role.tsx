import { SafeArea } from '@/components/utility/safe-area.component';
import * as LocalAuthentication from 'expo-local-authentication';
import { Image, Pressable, Text, View } from 'react-native';

const sections = [
    {
        text: ['I am here to get ', 'Help', ', Talk, Access Resources'],
        image: require('@/assets/images/survivor.png'),
        to: 'Survivor',
        role: 'survivor',
    },
    {
        text: ['I want to ', 'Volunteer', ' to Chat, Offer Emotional Support'],
        image: require('@/assets/images/volunteer.png'),
        to: 'Volunteer',
        role: 'volunteer',
    },
    {
        text: ['I am a ', 'Lawyer', ' offering legal aid for DV victims'],
        image: require('@/assets/images/lawyer.png'),
        to: 'Lawyer',
        role: 'lawyer',
    },
    {
        text: ['I am a ', 'Therapist', ' offering counseling for DV survivors'],
        image: require('@/assets/images/therapist.png'),
        to: 'Therapist',
        role: 'therapist',
    },
] as const;

const WalkthroughScreen = () => {
    const authenticate = async () => {
        const check = await LocalAuthentication.isEnrolledAsync();
        console.info('check', JSON.stringify(check));
        const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Please authenticate first' });
        console.info('result', JSON.stringify(result));
    };
    return (
        <SafeArea>
            <View className="min-h-full flex flex-col gap-6 p-4 justify-center">
                {sections.map((section) => {
                    const { text, image, to, role } = section;
                    return (
                        <Pressable
                            key={role}
                            className="bg-spring50 px-8 py-4 rounded-2xl flex items-center justify-center"
                            onPress={() => {
                                authenticate();
                            }}
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
        </SafeArea>
    );
};

export default WalkthroughScreen;
