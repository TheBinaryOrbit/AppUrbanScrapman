import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { url } from '../URL';

const Schedule = () => {
  const navigation = useNavigation();
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (!weight || !timeSlot || !address || !landmark || !pinCode) {
      setAlertMessage('Please fill in all fields!');
      setShowAlert(true);
    } else {
      console.log('start')
      try{
        const id = (JSON.parse(await AsyncStorage.getItem('user'))).id
        console.log(id)
        const details = {
          weight : weight,
          pickUpDate : date.toDateString(),
          timeSlot : timeSlot,
          address : address,
          pinCode : pinCode,
          landMark : landmark,
          createdBy : id
        }
        console.log(details)
        const res = await axios.post(`${url}/api/v1/urbanscrapman/shedule/sheduleapickup` , details)
        
        console.log(res.data)
        if(res.status = 201){
          setAlertMessage('Pickup Sheduled Sucessfully');
          setShowAlert(true);
          setAddress('');
          setWeight('');
          setTimeSlot('');
          setPinCode('');
          setLandmark('');
          setDate(new Date());
        }
        else{
          console.log('else condition')
          setAlertMessage(res.data.error);
          setShowAlert(true);
        }
      }catch(e){
        console.log('in error')
        console.log(e)
        setAlertMessage(e.res.data.error);
        setShowAlert(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Schedule Pickup</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icons name="user-circle" size={20} />
        </TouchableOpacity>
      </View>
      <ScrollView>
      <View style={styles.form}>
        {/* Weight Dropdown */}
        <Text style={styles.label}>Estimated Weight (kg):</Text>
        <View
          style={{
            marginBottom: 20,
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#ccc',
          }}>
          <RNPickerSelect
            onValueChange={(value) => setWeight(value)}
            value={weight}
            style={pickerStyles}
            items={[
              { label: '20-40 kg', value: '20-40kg' },
              { label: '40-80 kg', value: '40-80kg' },
              { label: '80-200 kg', value: '80-200kg' },
              { label: '200-500 kg', value: '200-500kg' },
            ]}
          />
        </View>

        {/* Date Picker */}
        <Text style={styles.label}>Pickup Date:</Text>
        <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.buttonText}>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={date}
            onChange={handleDateChange}
            minimumDate={new Date()} // Prevent past dates
          />
        )}

        {/* Time Slot Dropdown */}
        <Text style={styles.label}>Pickup Time Slot:</Text>
        <View
          style={{
            marginBottom: 20,
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#ccc',
          }}>
          <RNPickerSelect
            onValueChange={(value) => setTimeSlot(value)}
            value={timeSlot}
            style={pickerStyles}
            items={[
              { label: '9 AM - 12 PM', value: '9 AM - 12 PM' },
              { label: '12 PM - 3 PM', value: '12 PM - 3 PM' },
              { label: '3 PM - 6 PM', value: '3 PM - 6 PM' },
            ]}
          />
        </View>

        {/* Address Input */}
        <Text style={styles.label}>Pickup Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />


        <Text style={styles.label}>Pincode</Text>
        <TextInput
          keyboardType='numeric'
          style={styles.input}
          placeholder="Enter your Pincode"
          value={pinCode}
          onChangeText={setPinCode}
          maxLength={6}
        />


        <Text style={styles.label}>Landmark:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={landmark}
          onChangeText={setLandmark}
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}>
          <Text style={styles.buttonText}>Schedule Pickup</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

      {/* Custom Alert Dialog */}
      <AwesomeAlert
        show={showAlert}
        title={alertMessage === 'Please fill in all fields!' ? 'Error' : 'Success'}
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor={alertMessage === 'Please fill in all fields!' ? '#f44336' : '#4CAF50'}
        onConfirmPressed={() => setShowAlert(false)}
      />
    </View>
  );
};

const pickerStyles = {
  inputAndroid: {
    height: 50,
    paddingLeft: 10,
    color: 'black',
  },
  inputIOS: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
    color: 'black',
  },
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    letterSpacing: 2,
  },
  form: { padding: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 10,
  },
});

export default Schedule;
