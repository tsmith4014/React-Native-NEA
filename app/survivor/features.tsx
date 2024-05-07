import Button from '@/infrastructure/theme/Button';
import SelectField from '@/infrastructure/theme/SelectField';
import Switch from '@/infrastructure/theme/Switch';
import TextField, { HelperTextType } from '@/infrastructure/theme/TextField';
import { BodyMedium, Title } from '@/infrastructure/theme/fonts';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { ChevronLeft } from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Carousel, Image, View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';

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
    const { height: deviceHeight } = useWindowDimensions();
    const { colors } = useTheme();
    return (
        <SafeAreaView className="h-full flex justify-between">
            <Carousel
                pageControlPosition="over"
                key={3}
                horizontal
                initialPage={0}
                pageControlProps={{
                    size: 8,
                    color: colors.brand.primary.spring50,
                    containerStyle: {
                        bottom: 160,
                    },
                }}
            >
                {sections.map((section) => (
                    <View className="flex items-center px-4" key={section.title}>
                        <Image resizeMode="contain" className={`mt-[72px] w-full mb-[88px]`} source={section.image} />
                        <Title.Small>{section.title}</Title.Small>
                        <BodyMedium.Medium className="text-center w-full mt-2">{section.description}</BodyMedium.Medium>
                    </View>
                ))}
            </Carousel>
            <View className="px-4 mb-10">
                <Button label="Get started" />
                <View className="flex flex-row items-center justify-center">
                    <BodyMedium.Medium>Already registered?</BodyMedium.Medium>
                    <Button variant="text" label="Login" />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Features;
