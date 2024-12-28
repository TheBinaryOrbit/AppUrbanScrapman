import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from '../URL';

const Login = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!phone || !password) {
      return Alert.alert('Error', 'Please fill in all fields');
    }

    try {
      const res = await axios.post(
        `${url}/api/v1/urbanscrapman/user/login`,
        {
          phoneNumber: phone,
          password: password,
        }
      );

      if (res.status === 200) {
        await AsyncStorage.setItem('user', JSON.stringify(res.data));
        Alert.alert('Success', 'Logged in successfully', [
          {
            text: 'OK',
            onPress: () => {
              setPhone('');
              setPassword('');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }], 
              });
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image
          source={{ uri: 'https://cdn.usegalileo.ai/sdxl10/eaddcfd2-ae71-45fc-8596-f6a2e66959fd.png' }}
          style={styles.buildingImage}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <View style={styles.inputContainer}>
          <Icon name="call-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate('Forgot')}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Don’t have an account?{' '}
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate('Signup')}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  background: {
    flex: 0.4,
    justifyContent: 'flex-end', // Align image to the bottom of the section
    alignItems: 'center',
    backgroundColor: '#FFF',
    overflow: 'hidden', // Ensure no overflow outside curved edges
  },
  buildingImage: {
    width: '100%',
    height: '120%', // Slightly increase height to cover space under the curved card
    resizeMode: 'cover',
    position: 'absolute',
    bottom: -50, // Position image to fill the curved area
  },
  card: {
    flex: 0.6,
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginTop: -30, // Adjust card to overlap the background slightly
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  forgotText: {
    textAlign: 'right',
    color: '#66CC66',
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#66CC66',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  signUpText: {
    color: '#66CC66',
    fontWeight: 'bold',
  },
});

export default Login;
