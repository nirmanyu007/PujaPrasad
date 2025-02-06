import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

type CartBoxProps = {
  item: {
    id: string;
    title: string;
    description: string;
    price: number | string;
    quantity: number;
    image: string;
  };
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  deleteItem: (id: string) => void;
};

const CartBox: React.FC<CartBoxProps> = ({
  item,
  incrementQuantity,
  decrementQuantity,
  deleteItem,
}) => {
  const parsePrice = (price: number | string): number => {
    if (!price) return 0;
    return typeof price === 'number'
      ? price
      : parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
  };

  const totalPrice = parsePrice(item.price) * item.quantity || 0;

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            'Confirm Delete',
            `Are you sure you want to remove ${item.title}?`,
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Delete', onPress: () => deleteItem(item.id)},
            ],
          );
        }}>
        <AntDesign name="delete" size={30} color="#FF0000" />
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.cartItem}>
        <Image
          source={{
            uri: item.image || 'https://via.placeholder.com/150',
          }}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title || 'Unknown Title'}</Text>
          <Text style={styles.itemDescription}>
            {item.description || 'No description available.'}
          </Text>
          <View style={styles.quantityContainer}>
            <View style={styles.quantityWrapper}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => {
                  if (item.quantity > 1) decrementQuantity(item.id);
                }}>
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
        <Text style={styles.itemPrice}>₹{totalPrice.toFixed(2)}</Text>
      </View>
    </Swipeable>
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
    width: '25%',
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.7)',
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  quantityWrapper: {
    backgroundColor: '#FF6505',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  quantityButton: {
    paddingHorizontal: 12,
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
    alignSelf: 'flex-end',
  },
  deleteButton: {
    backgroundColor: '#FFCBC8',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    flexDirection: 'column',
  },
  deleteButtonText: {
    color: '#FF0000',
  },
});

export default CartBox;
