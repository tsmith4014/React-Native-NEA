export default {
    Auth: {
        Cognito: {
            userPoolClientId: 'fcqohsli82pvpgt9t0ag8ht3c',
            userPoolId: 'us-east-1_x5WGjEsku',
            loginWith: {
                oauth: {
                    domain: 'nevereveralone-therapist.auth.us-east-1.amazoncognito.com',
                    scopes: ['openid', 'email', 'phone', 'profile', 'aws.cognito.signin.user.admin'],
                    redirectSignIn: ['nevereveralone://'],
                    redirectSignOut: ['nevereveralone://'],
                    responseType: 'code' as 'code',
                },
                username: true,
                email: true,
                phone: false,
            },
        },
    },
};
