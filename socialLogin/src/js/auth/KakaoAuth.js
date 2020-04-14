import KakaoLogins from '@react-native-seoul/kakao-login';

const KakaoSignIn = async () => {
    return await KakaoLogins.login()
        .then((res) => {
            return res;
        })
        .catch((err) => {
            if (err.code === 'E_CANCELLED_OPERATION') {
                return { error: err.code };
            } else {
                return { error: err };
            }
        });
};

export const KakaoSignOut = async () => {
    return await KakaoLogins.logout();
};

export default KakaoSignIn;
