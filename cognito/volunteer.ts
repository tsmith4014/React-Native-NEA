export default {
    Auth: {
        Cognito: {
            userPoolClientId: '77f0hrf3cvqmcf5omv27hdj5fa',
            userPoolId: 'us-east-1_W9ibvRaCf',
            loginWith: {
                oauth: {
                    domain: 'nevereveralone-volunteer.auth.us-east-1.amazoncognito.com',
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
