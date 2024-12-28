import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { url } from '../URL';

const Forgot = ({ navigation }) => {
    const [step, setStep] = useState(1); // Step 1: Phone Number, Step 2: OTP, Step 3: New Password
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passError, setPsaaError] = useState(false)
    const [sessionid, setSessionid] = useState('')

    const handleNextStep = async () => {
        if (step === 1 && phoneNumber.trim()) {
            try {
                const res = await axios.post(`${url}/api/v1/urbanscrapman/user/getotp`, { phoneNumber: phoneNumber });
                console.log(res.status)
                console.log(res.data)
                if (res.status == 200) {
                    console.log(res.data.Details)
                    setSessionid(res.data.Details)
                    setStep(2);
                }
                else {
                    Alert.alert(res.data.error)
                }
            } catch (e) {
                console.log(e.response.data.error)
                Alert.alert(e.response.data.error)
            }
        } else if (step === 2 && otp.trim()) {
            if (newPassword !== confirmPassword) {
                return setPsaaError(true)
            }


            try {
                const res = await axios.post(`${url}/api/v1/urbanscrapman/user/resetpassword`,
                    {
                        sessionid: sessionid,
                        phoneNumber: phoneNumber,
                        newPassword: newPassword,
                        otp: otp
                    }
                );
                console.log(res.status)
                console.log(res.data)
                if (res.status == 200) {
                    console.log(res.data)
                    return Alert.alert('Success', 'Account created successfully!', [
                        {
                            text: "Login",
                            onPress: () => {
                                navigation.navigate('Login')
                            }
                        }
                    ]);
                }
                else {
                    Alert.alert(res.data.error)
                }
            } catch (e) {
                console.log(e.response.data.error)
                Alert.alert(e.response.data.error)
            }
        }
        else {
            Alert.alert('Please fill in all fields correctly.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topDecorativeShape} />

            <Text style={styles.title}>Reset Password</Text>

            <View style={styles.card}>
                {step === 1 && (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            placeholderTextColor="#888"
                            keyboardType="numeric"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                            <Text style={styles.buttonText}>GET OTP</Text>
                        </TouchableOpacity>
                    </>
                )}

                {step === 2 && (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter OTP"
                            placeholderTextColor="#888"
                            keyboardType="numeric"
                            value={otp}
                            maxLength={4}
                            onChangeText={setOtp}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            placeholderTextColor="#888"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor="#888"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        {
                            passError ? <Text style={{ fontSize: 12, marginBottom: 15, marginLeft: 10, color: 'red' }}>*Password and Confirm password doesn't match</Text> : ""
                        }
                        <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                            <Text style={styles.buttonText}>VERIFY OTP</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            {step < 3 && (
                <Text style={styles.footer}>
                    Login With Password?{' '}
                    <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                        Login
                    </Text>
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    topDecorativeShape: {
        position: 'absolute',
        top: -50,
        right: -30,
        width: 150,
        height: 150,
        backgroundColor: '#FFD27D',
        borderTopLeftRadius: 100,
        borderBottomRightRadius: 100,
        transform: [{ rotate: '45deg' }],
        zIndex: -1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    input: {
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 15,
        color: '#333',
    },
    button: {
        backgroundColor: '#66CC66',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 14,
        color: '#666',
    },
    link: {
        color: '#66CC66',
        fontWeight: 'bold',
    },
});

export default Forgot;
