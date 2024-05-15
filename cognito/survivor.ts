export default {
    Auth: {
        Cognito: {
            userPoolClientId: '6p6d2btrcsfvslmhkf8gnfshmj',
            userPoolId: 'us-east-1_leCtHMy1J',
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
