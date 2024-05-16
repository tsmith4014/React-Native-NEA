export default {
    Auth: {
        Cognito: {
            userPoolClientId: '6nm8h4im3ft199mlk9nq3cs06d',
            userPoolId: 'us-east-1_Pro3O7FfF',
            loginWith: {
                oauth: {
                    domain: 'nevereveralone-lawyer.auth.us-east-1.amazoncognito.com',
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
