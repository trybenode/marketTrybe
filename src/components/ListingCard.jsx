import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Avatar, Button } from 'react-native-paper';

const ListingCard = ({ image, title, price, seller, onPress }) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover source={{ uri: image }} style={styles.image} />
      
      <Card.Content>
        <Text variant="titleMedium">{title}</Text>
        <Text variant="bodyMedium" style={styles.price}>${price}</Text>
        <View style={styles.sellerInfo}>
          <Avatar.Image size={30} source={{ uri: seller.avatar }} />
          <Text variant="bodySmall" style={styles.sellerName}>{seller.name}</Text>
        </View>
      </Card.Content>

      <Card.Actions>
        <Button mode="contained-tonal">View</Button>
        <Button mode="text">Favorite</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: 150,
  },
  price: {
    color: '#008080',
    fontWeight: 'bold',
    marginTop: 5,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  sellerName: {
    marginLeft: 8,
  },
});

export default ListingCard;