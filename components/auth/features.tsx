import Button from '@/infrastructure/theme/Button';
import { BodyMedium, Title } from '@/infrastructure/theme/fonts';
import useRootStore from '@/store';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Carousel, Image, View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';

type FeaturesProps = {
    sections: {
        title: string;
        description: string;
        image: any;
    }[];
};

const Features = ({ sections }: FeaturesProps) => {
    const { colors } = useTheme();
    const { selectedRole } = useRootStore();
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
                <Button label="Get started" onPress={() => router.navigate(`/${selectedRole}/sign-up`)} />
                <View className="flex-row items-center justify-center mt-2">
                    <BodyMedium.Medium className="mr-1">Already registered?</BodyMedium.Medium>
                    <Button
                        label="Login"
                        variant="text"
                        style={{ height: 'auto' }}
                        onPress={() => router.navigate(`/${selectedRole}/sign-in`)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Features;
