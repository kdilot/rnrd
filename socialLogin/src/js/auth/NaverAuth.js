import { NaverLogin } from '@react-native-seoul/naver-login';

const androidKeys = {
    kConsumerKey: 'dXtgxHlRKvPIQNrikUbE',
    kConsumerSecret: 'V5ocslprjR',
    kServiceAppName: '테스트앱(안드로이드)',
};

const NaverSignIn = () => {
    return new Promise((resolve, reject) => {
        NaverLogin.login(androidKeys, (err, token) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(token);
        });
    });
};

export const NaverSignOut = async () => {
    return NaverLogin.logout();
};

export default NaverSignIn;
