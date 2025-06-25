import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, StatusBar, requireNativeComponent } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install react-native-vector-icons
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { url } from '../URL';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PhoneNumber = () => {
  const navigation = useNavigation()
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);

  const handleLogin = async () => {
    setIsLoading(true);

    if (!otp || otp.length != 6) {
      setIsLoading(false);
      return Alert.alert('Error', 'Please enter a valid phone number');
    }


    try {
      const res = await axios.post(`${url}/api/v1/urbanscrapman/user/login`, {
        phoneNumber: phone,
        otp: otp,
        sessionId: sessionId
      });

      if (res.status === 200) {
        await AsyncStorage.setItem('user', JSON.stringify(res.data));
        setIsLoading(false);
        Alert.alert('Success', 'Logged in successfully', [
          {
            text: 'OK',
            onPress: () => {
              setPhone('');
              setOtp('');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }], // Navigate to Main
              });
            },
          },
        ]);
      } else if (res.status === 404) {
        setIsLoading(false);
        setStep(3);
        return;
      } else {
        setIsLoading(false);
        Alert.alert('Error', 'Invalid credentials');
        return;
      }
    } catch (error) {
      console.log(error.status)
      if (error.status == 404) {
        setIsLoading(false);
        setStep(3);
        return;
      }
      setIsLoading(false);
      Alert.alert('Error', error.response?.data?.error || 'Something went wrong');
    }
  };

  const handleOtp = async () => {
    setIsLoading(true);
    if (!phone || phone.length != 10) {
      setIsLoading(false);
      return Alert.alert('Error', 'Please enter a valid phone number');
    }

    try {
      const res = await axios.post(`${url}/api/v1/urbanscrapman/otp/getotp`, {
        phoneNumber: phone,
      });

      if (res.status === 200) {
        navigation
        setSessionId(res.data.sessionId);
        setIsLoading(false);

        ToastAndroid.showWithGravity(
          'OPT Sent Sucessfully',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setStep(2);
      } else {
        setIsLoading(false);
        Alert.alert('Error', error.response?.data?.error || 'Something went wrong');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert('Error', error.response?.data?.error || 'Something went wrong');
    }
  };

  const handleCreateAccount = async () => {
    setIsLoading(true);
    if (!name) {
      setIsLoading(false);
      return Alert.alert('Error', 'Please enter your name');
    }

    try {
      const res = await axios.post(`${url}/api/v1/urbanscrapman/user/createaccount`, {
        phoneNumber: phone,
        name: name,
        otp: otp,
      });

      if (res.status === 201) {
        console.log(res.data)
        await AsyncStorage.setItem('user', JSON.stringify(res.data));
        setIsLoading(false);
        Alert.alert('Success', 'Logged in successfully', [
          {
            text: 'OK',
            onPress: () => {
              setPhone('');
              setOtp('');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }], // Navigate to Main
              });
            },
          },
        ]);
      } else {
        setIsLoading(false);
        Alert.alert('Error', 'Failed to create account');
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar backgroundColor={"#018b3b"} />
      <Image
        source={require('../assets/logo-3.png')} // Add your image path here
        style={styles.image}
      ></Image>
      <View style={styles.card}>
        {
          step == 1 ?
            (
              <>
                <Text style={styles.title}>Login</Text>
                <View style={styles.inputContainer}>
                  <Icon name="call-outline" size={20} color="#666" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                    value={phone}
                    maxLength={10}
                    onChangeText={setPhone}
                  />
                </View>
                {
                  isLoading ?
                    <TouchableOpacity style={styles.button} onPress={handleOtp}>
                      <ActivityIndicator size={23} color="#fff" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button} onPress={handleOtp}>
                      <Text style={styles.buttonText}>GET OTP</Text>
                    </TouchableOpacity>
                }
              </>
            )
            :
            step == 2 ?
              <>
                <Text style={styles.title}>Login</Text>
                <View style={styles.inputContainer}>
                  <Icon name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="OTP"
                    placeholderTextColor="#aaa"
                    value={otp}
                    onChangeText={setOtp}
                  />
                </View>
                {
                  isLoading ?
                    <TouchableOpacity style={styles.button} onPress={handleOtp}>
                      <ActivityIndicator size={23} color="#fff" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                      <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                }
              </>
              :
              <>
                <Text style={styles.title}>Login</Text>
                <View style={styles.inputContainer}>
                  <Icon name="person-outline" size={20} color="#666" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    placeholderTextColor="#aaa"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
                {
                  isLoading ?
                    <TouchableOpacity style={styles.button} onPress={handleOtp}>
                      <ActivityIndicator size={23} color="#fff" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                      <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                }
              </>
        }
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    gap: 0,
    backgroundColor: '#018b3b',
  },
  card: {
    flex: 1.5,
    backgroundColor: 'pink',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'relative',
  },
  image: {
    flex: 1,
    width: '100%',
    objectFit: 'cover',
    transform: [{ scale: 1.01 }],
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#018b3b',
    textAlign: 'left',
    lineHeight: 35,
    marginBottom: 20,
    fontWeight: '900'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#000',
    paddingVertical: 12,
    fontSize: 16,
  },
  getButton: {
    backgroundColor: '#018b3b',
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  getText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#018b3b',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,

  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default PhoneNumber;
