import KakaoLogins from '@react-native-seoul/kakao-login';

const kakaoLogin = async () => {
    return await KakaoLogins.login()
        .then((result) => {
            return { token: result.accessToken };
        })
        .catch((err) => {
            if (err.code === 'E_CANCELLED_OPERATION') {
                return { error: err };
            } else {
                return { error: err };
            }
        });
};

export default kakaoLogin;
