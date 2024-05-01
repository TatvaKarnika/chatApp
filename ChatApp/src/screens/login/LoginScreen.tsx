import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './LoginScreen.style';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

// GoogleSignin.configure({
//   webClientId:
//     '280176214630-k1lt6f2mo7hh4108t7rmvkja27f3532s.apps.googleusercontent.com',
// });

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleLogin = async () => {
    const sanitizedEmail = sanitizeEmail(email);
    const emailRef = database().ref(`users/${sanitizedEmail}`);

    try {
      const snapshot = await emailRef.once('value');
      if (snapshot.exists()) {
        console.log('Email already exists:', revertSanitizeEmail(snapshot.val().email));
        return true;
      } else {
        try {
          const userCredential = await auth().createUserWithEmailAndPassword(email, password);
          const user = userCredential.user;
          const sanitizedEmail = sanitizeEmail(email);

          await database().ref(`user/${sanitizedEmail}`).set({
            email,
            displayName,
          });

          console.log('User created successfully with email:', email);
        } catch (error: string | any) {
          console.error('Error creating user:', error.message);
        }
      }
    } catch (error) {
      console.error('Failed to check email existence:', error);
      throw error;
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.text}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={24} color="grey" />
        </TouchableOpacity>
      </View>
      <TextInput
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Display Name"
        style={styles.text}
      />
      <View style={styles.button}>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity onPress={handleGoogleLogin} style={styles.button}>
        <Image href={'../../assets/googleIcon.svg'} />
        <Text style={styles.text}>"Login with Google"</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );

  function sanitizeEmail(email: string) {
    return email.replace(/\./g, ',');
  }

  function revertSanitizeEmail(email: string) {
    return email.replace(/,/g, '.');
  }
};

export default LoginScreen;
