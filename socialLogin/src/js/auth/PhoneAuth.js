import auth from '@react-native-firebase/auth';

const PhoneSignIn = async () => {
    return await auth().signInWithPhoneNumber('+82 10-6423-5095');
};

export default PhoneSignIn;
