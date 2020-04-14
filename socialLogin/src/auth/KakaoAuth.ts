import auth from '@react-native-firebase/auth';
import KakaoLogins from '@react-native-seoul/kakao-login';

const KakaoSignIn = async () => {
    return await KakaoLogins.login()
        .then((res) => {
            const kakaoCredential = auth.OAuthProvider.credential(
                res.accessToken,
            );
            // console.log(res, 1);
            // console.log(kakaoCredential, 2);
            // Sign-in the user with the credential
            // return auth().signInWithCredential(kakaoCredential);
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
