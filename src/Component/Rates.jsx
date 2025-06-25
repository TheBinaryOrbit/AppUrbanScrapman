import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Image } from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import SkeletonCard from './SkLoader';
import { url } from '../URL';


const Rates = () => {
  const navigation = useNavigation();
  const [rates, setRates] = useState([]);
  const [error, setError] = useState(false)
  const [isLoading, setIsLoadin] = useState(true)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`${url}/api/v1/urbanscrapman/scrab/getrates`)
    
        setRates(res.data)
        setIsLoadin(false)
      } catch (e) {

        setError(true)
        setIsLoadin(false)
      }
    }
    fetchdata()
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rates</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icons name="user-circle" size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        {
          isLoading ?
            (
              [1, 2, 3, 4, 5, 6, 6, 7, 8, 9].map((item, index) => <SkeletonCard key={index} />)
            )
            :
            (

              <FlatList
                data={rates}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <Card containerStyle={styles.card}>
                    <View style={styles.cardContent}>
                      <Image source={{ uri: item.icon }} style={{ width: 30, height: 30 }} />
                      <Text style={styles.cardTitle}>{item.name}</Text>
                      <Text style={styles.cardPrice}>{item.price}/{item.unit}</Text>
                    </View>
                  </Card>
                )}
              />

            )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { borderRadius: 10 },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { flex: 1, fontSize: 14, marginLeft: 10 },
  cardPrice: { fontSize: 16, color: '#888' },
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
  screen: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: 'white'
  },
  bottom: {
    justifyContent: 'start',
  },
});

export default Rates;
