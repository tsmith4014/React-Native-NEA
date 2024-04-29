import { Image, Pressable, Text, View } from 'react-native';
import { SafeArea } from '../../components/utility/safe-area.component';
import { CompositeScreenProps } from '@react-navigation/native';

const Bold = ({ children }: { children: string }) => (
    <Text className="group-isolate font-bold">{children}</Text>
);

const sections = [
    {
        text: ['I am here to get ', 'Help', ', Talk, Access Resources'],
        image: require('../../../assets/survivor.png'),
        to: 'Survivor',
        role: 'survivor',
    },
    {
        text: ['I want to ', 'Volunteer', ' to Chat, Offer Emotional Support'],
        image: require('../../../assets/volunteer.png'),
        to: 'Volunteer',
        role: 'volunteer',
    },
    {
        text: ['I am a ', 'Lawyer', ' offering legal aid for DV victims'],
        image: require('../../../assets/lawyer.png'),
        to: 'Lawyer',
        role: 'lawyer',
    },
    {
        text: ['I am a ', 'Therapist', ' offering counseling for DV survivors'],
        image: require('../../../assets/therapist.png'),
        to: 'Therapist',
        role: 'therapist',
    },
] as const;

interface WalkthroughScreenProps extends CompositeScreenProps<any, any> {
    onUserSelect: (role: string) => void;
}

const WalkthroughScreen = (props: WalkthroughScreenProps) => {
    const { navigation, onUserSelect } = props;
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
                                onUserSelect(role);
                            }}
                        >
                            <Image
                                resizeMode="contain"
                                className="h-14 w-14 mb-4"
                                source={image}
                            />
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
