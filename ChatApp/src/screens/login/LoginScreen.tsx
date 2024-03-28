import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './LoginScreen.style';
import {Image} from 'react-native-svg';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '280176214630-k1lt6f2mo7hh4108t7rmvkja27f3532s.apps.googleusercontent.com',
});

const LoginScreen: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {};
  const handleGoogleLogin = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView>
      <TextInput
        value={userName}
        onChangeText={setUserName}
        placeholder="Username"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleGoogleLogin} style={styles.button}>
        <Image href={'../../assets/googleIcon.svg'} />
        <Text style={styles.text}>"Login with Google"</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
