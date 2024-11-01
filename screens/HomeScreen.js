import React from "react";
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from "react-native";
import Header from "../components/Header";

const HomeScreen = ({ navigation }) => {
  const roomsData = [
    {
      "id": "1",
      "name": "King Room with Balcony",
      "location": "Bangalore, India",
      "pricePerNight": 3312,
      "description": "Spacious room with a balcony and great views.",
      "image": "https://cf.bstatic.com/xdata/images/hotel/max1280x900/433845616.jpg?k=87bc315f35830189d9a1c935c3e167e648543c27f39ee4cafc5cf73ee24393b9&o=&hp=1",
      
    },
    
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.roomItem}
      onPress={() => navigation.navigate('RoomDetails', { room: item })} // Pass the entire room object
    >
      <Image source={{ uri: item.image }} style={styles.roomImage} />
      <View style={styles.roomInfo}>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomLocation}>{item.location}</Text>
        <Text style={styles.roomPrice}>${item.pricePerNight} per night</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={roomsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roomItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  roomImage: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  roomInfo: {
    justifyContent: 'space-between'
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  roomLocation: {
    fontSize: 14,
    color: 'gray'
  },
  roomPrice: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default HomeScreen;