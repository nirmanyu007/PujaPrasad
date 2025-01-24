import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

type CartBoxProps = {
  item: {
    id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  };
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
};

const CartBox: React.FC<CartBoxProps> = ({
  item,
  incrementQuantity,
  decrementQuantity,
}) => {
  return (
    <View style={styles.cartItem}>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.quantityContainer}>
          <View
            style={{
              backgroundColor: '#FF6505',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => decrementQuantity(item.id)}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => incrementQuantity(item.id)}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    // backgroundColor: '#ddd',
    paddingHorizontal: 12,
    color: '#fff',
    padding: 8,
    borderRadius: 4,
  },
  quantityText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: '#fff',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5733',
    alignSelf: 'center',
  },
});

export default CartBox;
