import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Install react-native-vector-icons for icons
import { url } from '../URL';

const Singup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNUmber] = useState('');
  const [password, setPassword] = useState('');


  const handleSignup = async () => {
    if (!name || !phoneNumber || !password) {
      return Alert.alert('Error', 'Please fill in all fields');
    }

    console.log({ name, phoneNumber, password });
    try{
      console.log('started')
      const res = await axios.post(`${url}/api/v1/urbanscrapman/user/singup` , {
        phoneNumber : phoneNumber,
        password : password,
        name : name
      })
      console.log(res)
      if(res.status = 201) return Alert.alert('Success', 'Account created successfully!' , [
        {
          text : "Login",
          onPress : () => {
            setName('')
            setPassword('')
            setPhoneNUmber('')
            navigation.navigate('Login')
          }
        }
      ]);
      return Alert.alert('Error', "Something went Wrong");
    }catch(e){
      console.log(e)
      return Alert.alert('Error', e.response.data.error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Section */}
      <View style={styles.background}>
        <Image
          source={{ uri: 'https://cdn.usegalileo.ai/sdxl10/eaddcfd2-ae71-45fc-8596-f6a2e66959fd.png' }}
          style={styles.buildingImage}
        />
      </View>

      {/* Login Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Get Started</Text>

        {/* Name Input with Icon */}
        <View style={styles.inputContainer}>
          <Icon name="person-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="call-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNUmber}
            maxLength={10}
          />
        </View>

        {/* Password Input with Icon */}
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

        {/* Sign In Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate('Login')}>
            Login
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
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
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
    marginTop: 10
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

export default Singup;
