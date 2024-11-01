import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RoomDetails = ({ route }) => {
  const room = {
    "id": "1",
    "name": "King Room with Balcony",
    "location": "Bangalore, India",
    "pricePerNight": 3312,
    "description": "Spacious room with a balcony and great views.",
    "image": "https://cf.bstatic.com/xdata/images/hotel/max1280x900/433845616.jpg?k=87bc315f35830189d9a1c935c3e167e648543c27f39ee4cafc5cf73ee24393b9&o=&hp=1",
    "amenities": [
      "1 queen bed",
      "Free Wi-Fi",
      "Air conditioning",
      "Breakfast included",
      "Balcony"
    ],
    "coordinates": {
      "latitude": "13.0359",
      "longitude": "77.6431"
    },
    "bookingOptions": {
      "isRefundable": true,
      "paymentMethod": "Pay at the property"
    }
  }; // Replace with your actual room data fetching logic

  return (
    <View style={styles.container}>
      <Image source={{ uri: room.image }} style={styles.image} />
      <Text style={styles.name}>{room.name}</Text>
      <Text style={styles.location}>{room.location}</Text>
      <Text style={styles.price}>${room.pricePerNight} per night</Text>
      <Text style={styles.description}>{room.description}</Text>

      <Text style={styles.sectionTitle}>Amenities:</Text>
      <View style={styles.amenities}>
        {room.amenities.map((amenity, index) => (
          <Text key={index} style={styles.amenityItem}>- {amenity}</Text>
        ))}
      </View>

      {/* You can add more sections for coordinates and booking options */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amenities: {
    marginLeft: 20,
  },
  amenityItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default RoomDetails;