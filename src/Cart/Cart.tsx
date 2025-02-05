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
  id: string;
  title: string;
  description: string;
  price: number | string;
  quantity: number;
  image: string; // This should be used consistently for the image URI
};
;


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

 const decrementQuantity = async (id: string) => {
   try {
     setCartItems(prevItems => {
       // Find the item being decremented
       const itemToDecrement = prevItems.find(item => item.id === id);

       // If the item exists and its quantity is 1, remove it completely
       if (itemToDecrement && itemToDecrement.quantity === 1) {
         const updatedItems = prevItems.filter(item => item.id !== id);

         console.log('Item removed, Updated Cart Items:', updatedItems); // Debugging

         // Update AsyncStorage - Remove the cart if empty
         if (updatedItems.length === 0) {
           AsyncStorage.removeItem('cartItems')
             .then(() => console.log('Cart cleared from AsyncStorage')) // Debugging
             .catch(error => console.error('Error clearing cart:', error));
         } else {
           AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems))
             .then(() => console.log('Cart updated in AsyncStorage')) // Debugging
             .catch(error =>
               console.error('Error updating cart in storage:', error),
             );
         }

         return updatedItems;
       } else {
         // Otherwise, just decrement the quantity
         const updatedItems = prevItems.map(item =>
           item.id === id ? {...item, quantity: item.quantity - 1} : item,
         );

         console.log('Updated Cart Items:', updatedItems); // Debugging

         AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems))
           .then(() => console.log('Cart updated in AsyncStorage')) // Debugging
           .catch(error =>
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
      const price =
        typeof item.price === 'string'
          ? parseFloat(item.price.replace(/[^0-9.]/g, ''))
          : item.price || 0;

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

        // Ensure the image property is consistent
        const processedItems: CartItem[] = parsedItems.map(item => ({
          ...item,
          price: item.price
            ? typeof item.price === 'string'
              ? parseFloat(item.price.replace(/[^0-9.]/g, ''))
              : item.price
            : 0, // Default price to 0
          image: item.image || 'https://via.placeholder.com/150', // Provide a fallback for the image
        }));

        setCartItems(processedItems);
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
     await AsyncStorage.removeItem('cartItems'); // Remove entire cart array
     setCartItems([]); // Clear local state
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
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Entypo onPress={handleGoBack} name="cross" size={24} color="#000" />
          <Text style={styles.headerText}>Cart</Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F1F1F1',
            padding:5,
            borderRadius:9
          }}
          onPress={handleClearCart}>
          <Antdesign name="shoppingcart" size={15} color="black" />
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
                deleteItem={deleteItem}
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                display: 'flex',
                paddingHorizontal: '5%',
              }}>
              <Text style={styles.savings}>Your total savings</Text>
              <Text style={styles.savings}> ₹50</Text>
            </View>
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
          <Text style={styles.emptyCartText}>Your Cart is Empty!</Text>
          <Text style={{paddingHorizontal: '15%', textAlign: 'center'}}>
            Bring Divine Grace Home. Explore Prasad Options Now
          </Text>
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
    color: 'black',
    paddingLeft:5
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
    width: '100%',
    display: 'flex',
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '70%',
    display: 'flex',
  },
});

export default Cart;
