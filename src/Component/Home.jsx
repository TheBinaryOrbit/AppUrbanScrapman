import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ScrollView} from 'react-native';
import { Image } from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';

const data = [
  {
      "name": "Office Paper",
      "icon": "https://ikc.edgekit.net/h1rxzpffx/scrapuncle/assets/papers_rorTDynz7.png?updatedAt=1710451407122"
  },
  {
      "name": "Newspaper",
      "icon": "https://ikp.edgekit.net/h1rxzpffx/swapeco/img/scrap-item/newspaper-report.png"
  },
  {
      "name": "Copies/Books",
      "icon": "https://ikp.edgekit.net/h1rxzpffx/swapecox/Books.webp"
  },
  {
      "name": "Cardboard",
      "icon": "https://ikp.edgekit.net/h1rxzpffx/swapeco/img/scrap-item/box.png"
  },
  {
      "name": "PET Bottles",
      "icon": "https://ikp.edgekit.net/h1rxzpffx/swapeco/img/scrap-item/bin.png"
  },
  {
      "name": "Iron",
      "icon": "https://ikp.edgekit.net/h1rxzpffx/swapeco/img/scrap-item/beam.png"
  },
  {
      "name": "Steel Utensils",
      "icon": "https://ikp.edgekit.net/h1rxzpffx/swapeco/img/scrap-item/hook.png"
  },
  {
      "name": "Aluminium",
      "icon": "https://ikp.edgekit.net/h1rxzpffx/swapeco/img/scrap-item/beer.png"
  },
  {
      "name": "Brass",
      "icon": "https://ikp.edgekit.net/h1rxzpffx/swapeco/img/scrap-item/brass-nuckle.png"
  },
  {
      "name": "Copper",
      "icon": "https://ikp.edgekit.net/h1rxzpffx/swapeco/img/scrap-item/wire.png"
  }
]


export default function ScrapMetalPickup() {
  const navigation = useNavigation()
  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Urban Scrapman</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
            <Icons name="user-circle" size={20} />
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={{ uri: 'https://cdn.usegalileo.ai/sdxl10/39997ff1-8cec-4afa-9b46-3d957764e3f7.png' }}
        style={styles.banner}
        imageStyle={styles.bannerImage}
      >
        <View style={styles.bannerContent}>
        </View>
      </ImageBackground>
      <Text style={{...styles.infoTitle ,  marginLeft : 20}}>What we recycle</Text>
      <ScrollView horizontal contentContainerStyle={styles.categories} showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <TouchableOpacity key={index} style={styles.category} onPress={()=> navigation.navigate('Rates')}>
            <Image source={{ uri : item.icon}} style={{width : 30 , height : 30}}></Image>
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.infoCard}>
        <View style={styles.infoText}>
          <Text style={styles.infoTitle}>Recycle like a boss</Text>
          <Text style={styles.infoDescription}>From the comfort of your home, we do the heavy lifting for you.</Text>
        </View>
        <ImageBackground
          source={{ uri: 'https://cdn.usegalileo.ai/sdxl10/eaddcfd2-ae71-45fc-8596-f6a2e66959fd.png' }}
          style={styles.infoImage}
        />
      </View>
      <TouchableOpacity style={styles.ctaButton} onPress={()=> navigation.navigate('Schedule')}>
        <Text style={styles.ctaButtonText}>Schedule a pickup now</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom : 2,
    borderBottomLeftRadius : 20,
    borderBottomRightRadius : 20
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    letterSpacing : 2
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerImage: {
    resizeMode: 'cover',
  },
  bannerContent: {
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  bannerButtonText: {
    color: '#111714',
    fontWeight: 'bold',
  },
  categories: {
    flexDirection: 'row',
    gap : 10,
    padding: 16,
  },
  category: {
    width : 'fit',
    backgroundColor: '#F0F4F2',
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 12,
    paddingInline : 10,
    gap : 5
  },
  categoryText: {
    color: '#111714',
    fontSize: 14,
    fontWeight: '500',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    gap : 5
  },
  infoText: {
    flex: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111714',
  },
  infoDescription: {
    fontSize: 14,
    color: '#648772',
  },
  infoImage: {
    flex: 1,
    aspectRatio: 1.5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  ctaButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#111714',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F4F2',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerIcon: {
    fontSize: 24,
  },
  footerText: {
    fontSize: 12,
    color: '#648772',
  },
});
