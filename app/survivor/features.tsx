import { BodyMedium, Title } from '@/infrastructure/theme/fonts';
import { useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Carousel, Colors, Constants, Image, Spacings, Text, View } from 'react-native-ui-lib';

const sections = [
    {
        title: 'Live Chat',
        description: 'Be Anonymous! Talk your heart out with our Volunteers who wont judge you.',
        image: require('@/assets/images/survivor/live-chat.png'),
    },
    {
        title: 'Save Evidence',
        description: 'Save Proofs of Abuse/Evidence here safely. You might want to use them later!',
        image: require('@/assets/images/survivor/save-evidence.png'),
    },
    {
        title: 'Get Help and Support',
        description: 'Connect with our Lawyer and Counsellors to get help or read up on our Self-help content.',
        image: require('@/assets/images/survivor/get-help-and-support.png'),
    },
] as const;

const Features = () => {
    const { width: windowWidth } = useWindowDimensions();
    return (
        <SafeAreaView>
            <View className="flex items-center px-4">
                <Image resizeMode="contain" className={`mt-[72px] w-full mb-[88px]`} source={sections[0].image} />
                <Title.Small>Live Chat</Title.Small>
                <BodyMedium.Medium className="text-center w-full mt-2">
                    Be Anonymous! Talk your heart out with our Volunteers who wont judge you.
                </BodyMedium.Medium>
            </View>
        </SafeAreaView>
    );
};

export default Features;
