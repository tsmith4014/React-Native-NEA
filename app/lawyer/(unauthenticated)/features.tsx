import FeaturesComponent from '@/components/auth/features';

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
];

const Features = () => {
    return <FeaturesComponent sections={sections} />;
};

export default Features;
