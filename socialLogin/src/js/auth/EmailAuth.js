import auth from '@react-native-firebase/auth';

const EmailSignIn = async (
    email = 'richard@tliz.co.kr',
    password = 'SuperSecretPassword!',
) => {
    return await auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
            return { uid: res.user.uid };
        })
        .catch((error) => {
            if (error.code === 'auth/user-not-found') {
                return { error: '가입되어 있지 않습니다.' };
            }
            return { error: error.code };
        });
};

export const EmailSignUp = async (email, password) => {
    return await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((e) => {
            console.log(e);
            return { msg: '가입되었습니다.', rs: true };
        })
        .catch((error) => {
            console.log(error);
            if (error.code === 'auth/email-already-in-use') {
                return { error: '이미 가입된 이메일 입니다.' };
            }

            if (error.code === 'auth/invalid-email') {
                return { error: '사용 할 수 없는 이메일 입니다.' };
            }
            return { error: error.code };
        });
};

export default EmailSignIn;
