import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import CartBox from './CartBox';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  useNavigation,
  NavigationProp,
  RouteProp,
  useRoute,
} from '@react-navigation/native';

type CartItem = {
  id: string;
  title: string;
  description: string;
  price: number | string;
  quantity: number;
  image: string;
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
    navigation.goBack(); // Navigate back to the previous screen
  };

  // Ensure `price` is always treated as a number
  const [cartItems, setCartItems] = useState<CartItem[]>(
    initialCartItems.map(item => ({
      ...item,
      price:
        typeof item.price === 'string'
          ? parseFloat(item.price.replace(/[^0-9.]/g, ''))
          : item.price,
    })),
  );

  const incrementQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const decrementQuantity = (id: string) => {
    setCartItems(
      prevItems =>
        prevItems
          .map(item =>
            item.id === id && item.quantity > 1
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0), // Remove items with quantity 0
    );
  };

  const getTotalAmount = () => {
    return cartItems.reduce(
      (total, item) =>
        total +
        (typeof item.price === 'number' ? item.price : 0) * item.quantity,
      0,
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Entypo onPress={handleGoBack} name="cross" size={24} color="#000" />
          <Text style={styles.headerText}>Cart</Text>
        </View>
        <TouchableOpacity onPress={() => setCartItems([])}>
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', paddingVertical: '5%'}}>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/cart_cart.png',
          }}
          style={{width: 160, height: 50}}
        />
      </View>

      {/* Cart Items or Empty Cart Message */}
      {cartItems.length > 0 ? (
        <>
          {/* Cart Summary */}
          <View style={styles.cartSummary}>
            <Text style={styles.cartSummaryText}>
              Total Items ({getTotalItems()})
            </Text>
          </View>

          {/* Cart Items */}
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <CartBox
                item={item}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
              />
            )}
          />

          {/* Bill Details */}
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
            <Text style={styles.savings}>Your total savings ₹50</Text>
            {/* Bottom Image */}
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/bottom.png',
              }}
              style={styles.bottomImage}
              resizeMode="cover"
            />
          </View>

          {/* Checkout Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Address')}
            style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Add Products</Text>
        </View>
      )}
    </View>
  );
};

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
  clearButton: {
    fontSize: 14,
    color: '#FF0000',
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
  savings: {
    fontSize: 12,
    color: 'black',
    marginTop: 8,
    zIndex: 100,
    paddingBottom: 16,
    paddingLeft: '3%',
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
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default Cart;
