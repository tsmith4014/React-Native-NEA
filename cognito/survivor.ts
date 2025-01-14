export default {
    Auth: {
        Cognito: {
            userPoolClientId: '14pom7313h1mpgssf709ihg2v7',
            userPoolId: 'us-east-1_ceR47U0pC',
            loginWith: {
                oauth: {
                    domain: 'nevereveralone-survivor.auth.us-east-1.amazoncognito.com',
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
