import auth from '@react-native-firebase/auth';

const AnonymousSignIn = async () => {
    return await auth().signInAnonymously();
};

export default AnonymousSignIn;
