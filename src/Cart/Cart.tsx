import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import CartBox from './CartBox';
import Entypo from 'react-native-vector-icons/Entypo';
import Antdesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useNavigation,
  NavigationProp,
  RouteProp,
  useRoute,
} from '@react-navigation/native';

type CartItem = {
  id: string; // this will be the realtime mandirId
  prasad: any; // the complete prasad object
  selectedPackage: {
    id: string;
    title: string;
    price: number;
    description: string;
  };
  quantity: number;
};

type StackParamList = {
  Cart: CartItem[];
  Address: undefined;
};

const Cart: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, 'Cart'>>();
  const initialCartItems = [...(route.params || [])];

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const incrementQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const decrementQuantity = async (id: string) => {
    try {
      setCartItems(prevItems => {
        const itemToDecrement = prevItems.find(item => item.id === id);
        if (itemToDecrement && itemToDecrement.quantity === 1) {
          const updatedItems = prevItems.filter(item => item.id !== id);
          AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems)).catch(error =>
            console.error('Error updating cart in storage:', error),
          );
          return updatedItems;
        } else {
          const updatedItems = prevItems.map(item =>
            item.id === id ? {...item, quantity: item.quantity - 1} : item,
          );
          AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems)).catch(error =>
            console.error('Error updating cart in storage:', error),
          );
          return updatedItems;
        }
      });
    } catch (error) {
      console.error('Error in decrementQuantity:', error);
    }
  };

  const deleteItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      // You may decide whether to use prasadPrice or the package price or a sum.
      // Here, we assume the price is from the selectedPackage.
      const price = item.selectedPackage.price || 0;
      return total + price * (item.quantity || 1);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const fetchCartData = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      if (storedCartItems) {
        const parsedItems: CartItem[] = JSON.parse(storedCartItems);
        setCartItems(parsedItems);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load cart data.');
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleClearCart = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
      setCartItems([]);
      Alert.alert('Success', 'Cart cleared!');
    } catch (error) {
      Alert.alert('Error', 'Failed to clear cart.');
      console.error('Error clearing cart data:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Entypo onPress={handleGoBack} name="cross" size={24} color="#000" />
          <Text style={styles.headerText}>Cart</Text>
        </View>
        <TouchableOpacity
          style={styles.clearCartButton}
          onPress={handleClearCart}>
          <Antdesign name="shoppingcart" size={15} color="black" />
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cartImageContainer}>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/cart_cart.png',
          }}
          style={{width: 160, height: 50}}
        />
      </View>
      {cartItems.length > 0 ? (
        <>
          <View style={styles.cartSummary}>
            <Text style={styles.cartSummaryText}>
              Total Items ({getTotalItems()})
            </Text>
          </View>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <CartBox
                item={item}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                deleteItem={deleteItem}
              />
            )}
          />
          <View style={styles.billDetails}>
            <Text style={styles.billText}>Bill details</Text>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Item total</Text>
              <Text style={styles.billValue}>₹{getTotalAmount()}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Platform Convenience Fee</Text>
              <Text style={styles.billValue}>₹25 FREE</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Charge</Text>
              <Text style={styles.billValue}>₹25 FREE</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Sub Total</Text>
              <Text style={styles.billValue}>₹{getTotalAmount()}</Text>
            </View>
            <View style={styles.billRow2}>
              <Text style={styles.billLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>₹{getTotalAmount()}</Text>
            </View>
            <View style={styles.savingsRow}>
              <Text style={styles.savings}>Your total savings</Text>
              <Text style={styles.savings}> ₹50</Text>
            </View>
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/bottom.png',
              }}
              style={styles.bottomImage}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Address')}
            style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your Cart is Empty!</Text>
          <Text style={styles.emptyCartSubText}>
            Bring Divine Grace Home. Explore Prasad Options Now
          </Text>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: '3%',
    color: 'black',
  },
  clearCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    padding: 5,
    borderRadius: 9,
  },
  clearButton: {
    fontSize: 14,
    color: 'black',
    paddingLeft: 5,
  },
  cartImageContainer: {
    alignItems: 'center',
    paddingVertical: '5%',
  },
  cartSummary: {
    paddingLeft: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  cartSummaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  billDetails: {
    position: 'relative',
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 15,
    width: '100%',
  },
  billText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingLeft: '4%',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 50,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  billRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 26,
    paddingHorizontal: 16,
  },
  billLabel: {
    fontSize: 14,
    color: '#666',
  },
  billValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5733',
  },
  savingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    marginTop: 8,
    paddingBottom: 16,
  },
  savings: {
    fontSize: 12,
    color: 'black',
  },
  checkoutButton: {
    backgroundColor: '#00BD68',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  emptyCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  emptyCartSubText: {
    paddingHorizontal: '15%',
    textAlign: 'center',
  },
});
