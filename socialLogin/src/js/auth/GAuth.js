import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

const onGoogleButtonPress = async () => {
    GoogleSignin.configure({
        webClientId:
            '461569878428-i8lqlqmplldmgm9sjfse1iv9jpesagh7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true,
    });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return await auth().signInWithCredential(googleCredential);
};

export default onGoogleButtonPress;
