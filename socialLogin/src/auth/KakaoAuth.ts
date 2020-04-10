import auth from '@react-native-firebase/auth';
import KakaoLogins from '@react-native-seoul/kakao-login';

const kakaoLogin = async () => {
    return await KakaoLogins.login()
        .then((res) => {
            const kakaoCredential = auth.OAuthProvider.credential(
                res.accessToken,
            );
            console.log(res);
            console.log(kakaoCredential);
            // Sign-in the user with the credential
            return auth().signInWithCredential(kakaoCredential);
        })
        .catch((err) => {
            if (err.code === 'E_CANCELLED_OPERATION') {
                return { error: err.code };
            } else {
                return { error: err };
            }
        });
};

export default kakaoLogin;
