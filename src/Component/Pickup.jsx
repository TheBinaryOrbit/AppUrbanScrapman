import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-elements';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import SkeletonCard from './SkLoader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from '../URL';

const Pickup = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchdata = async () => {
    try {
      const id = JSON.parse(await AsyncStorage.getItem('user')).id;
      const res = await axios.get(`${url}/api/v1/urbanscrapman/shedule/getpersonalshedule/${id}`);
      setData(res.data);
      setError(false);
      setIsLoading(false);
    } catch (e) {
      setError(true);
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchdata();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Pickup History</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Icons name="user-circle" size={20} />
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No Pickup History</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContent}>
        <View style={{ marginLeft: 16 }}>
          <Text style={styles.cardTitle}>Date: {item.pickUpDate}</Text>
          <Text style={styles.cardPrice}>Weight: {item.weight}</Text>
        </View>
        <View>
          <Text
            style={{
              ...styles.cardTitle,
              fontSize: 14,
              fontWeight: '600',
              marginTop: 4,
              color: item.status === 'Completed' ? '#65a30d' : '#fbbf24',
              textTransform: 'uppercase',
            }}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <FlatList
      data={isLoading ? [] : data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={isLoading ? () => <SkeletonCard /> : renderItem}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={!isLoading && renderEmpty}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.screen}
    />
  );
};

const styles = StyleSheet.create({
  card: { borderRadius: 10 },
  cardContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 'full' },
  cardText: { fontSize: 16, fontWeight: '600' },
  cardTitle: { flex: 1, fontSize: 14 },
  cardPrice: { fontSize: 16, color: '#888' },
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
  screen: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Pickup;
