import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image , Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

const Profile = () => {
  const [userData, setUserData] = useState('')
  const navigation = useNavigation();


  useEffect(() => {
    const fetchdata = (async () => {
      const u = JSON.parse(await AsyncStorage.getItem('user'))
      setUserData(u)
    })();
  },[])

  const handleLogout = async ()=>{
    await AsyncStorage.removeItem('user')
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], 
    });
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity onPress={()=> handleLogout()}>
          <Icon name="log-out" size={20} />
        </TouchableOpacity>
      </View>

      
      <View style={styles.card}>
        
        <Image
          source={require('../assets/default.jpg')} 
          style={styles.avatar}
        />

        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.role}>{userData.name}@urbanscrapman.user</Text>

        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={()=> Linking.openURL('https://www.facebook.com/urbanscrapman')}>
            <Icon name="facebook" size={20} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> Linking.openURL('https://x.com/urbanscrapman')}>
            <Icon name="twitter" size={20} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> Linking.openURL('https://www.instagram.com/urbanscrapman/')}>
            <Icon name="instagram" size={20} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> Linking.openURL('https://www.youtube.com/@UrbanScrapman')}>
            <Icon name="youtube" size={20} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> Linking.openURL('https://www.linkedin.com/showcase/urbanscrapman/')}>
            <Icon name="linkedin" size={20} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://wa.me/+919429691298')}>
            <Text style={styles.buttonText}>Chat with us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.button , backgroundColor : 'white' ,  borderWidth : 2 , borderColor : '#018b3b'}} onPress={() => Linking.openURL('tel:+91 9429691298')}>
            <Text style={{...styles.buttonText , color : '#018b3b'}}>Call Us</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <View style={styles.infoRow}>
            <Icon2 name="user-alt" size={20} style={styles.icon} />
            <Text style={styles.infoText}>{userData.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon2 name="phone-alt" size={20} style={styles.icon} />
            <Text style={styles.infoText}>+91 {userData.phoneNumber}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    letterSpacing: 2,
  },

  // Profile Card Styles
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#018b3b',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  role: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
  },
  socialIcons: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  icon: {
    marginHorizontal: 10,
    color: '#018b3b',
  },
  buttons: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#018b3b',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
  },
  info: {
    width: '100%',
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Profile;
