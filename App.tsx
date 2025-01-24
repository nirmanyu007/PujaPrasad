import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './src/Pages/HomePage';
import PujaPage from './src/Pages/PujaPage';
import PrasadPage from './src/Pages/PrasadPage';
import Explore from './src/Pages/Explore';
import Mandir from './src/Pages/Mandir';
// import PujaDetail from './src/Pages/PujaDetail';
// import CardBox from './src/Components/CardBox';
import {Image} from 'react-native';
import PujaDetail from './src/Component/PujaDetail';
import Detailing from './src/Component/Detailing';
import PujaDetailPage from './src/Component/PujaDetailPage';
import View_Puja_Booking from './src/Component/View_Puja_Booking';
import Congratulation from './src/Component/Congratulation';
import SelectPrasadPackage from './src/Component/SelectPrasadPackage';
import Cart from './src/Cart/Cart';
import Address from './src/Cart/Address';
import Blog from './src/Component/Blog';
import BlogCardDetail from './src/Component/BlogCardDetail';
import Libreary from './src/Component/Libreary';
import Arti from './src/Component/Arti';
import Chalisa from './src/Component/Chalisa';
import ArtiDetail from './src/Component/ArtiDetail';

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Create Stack Navigator
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF5704',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Puja"
        component={PujaPage}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/Fire.png',
              }}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Prasad"
        component={PrasadPage}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/laddoo.png',
              }}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/home.png',
              }}
              style={{width: 55, height: 55, tintColor: undefined}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/Compass.png',
              }}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mandir"
        component={Mandir}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/mandir.png',
              }}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ArtiDetail"
        screenOptions={{
          headerShown: false,
        }}>
        {/* Main Tab Navigator */}
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />

        {/* PujaDetail Screen */}
        <Stack.Screen
          name="PujaDetail"
          component={PujaDetail}
          options={{
            title: 'Puja Details',
            headerStyle: {backgroundColor: '#FF5704'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Details"
          component={Detailing}
          options={{
            title: 'Puja Details',
            headerStyle: {backgroundColor: '#FF5704'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="PreviewPuja"
          component={View_Puja_Booking}
          options={{
            title: 'Puja Details',
            headerStyle: {backgroundColor: '#FF5704'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="FormPage"
          component={PujaDetailPage}
          options={{
            title: 'Puja Details',
            headerStyle: {backgroundColor: '#FF5704'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Congratulation"
          component={Congratulation}
          options={{
            title: 'Puja Details',
            headerStyle: {backgroundColor: '#FF5704'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="SelectPrasadPackage"
          component={SelectPrasadPackage}
          options={{
            title: 'Puja Details',
            headerStyle: {backgroundColor: '#FF5704'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            title: 'Puja Details',
            headerStyle: {backgroundColor: '#FF5704'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{
            title: 'Puja Details',
            headerStyle: {backgroundColor: '#FF5704'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Blog"
          component={Blog}
          options={{
            title: 'Puja Details',
            headerStyle: {backgroundColor: '#FF5704'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="BlogDetailPage"
          component={BlogCardDetail}
          options={{
            title: 'Puja Details',
            headerStyle: {backgroundColor: '#FF5704'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Libreary"
          component={Libreary}
          options={{
            title: 'Puja Details',
            headerStyle: {backgroundColor: '#FF5704'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Arti"
          component={Arti}
          options={{
            title: 'Puja Details',
            headerStyle: {backgroundColor: '#FF5704'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Chalisa"
          component={Chalisa}
          options={{
            title: 'Puja Details',
            headerStyle: {backgroundColor: '#FF5704'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="ArtiDetail"
          component={ArtiDetail}
          options={{
            title: 'Puja Details',
            headerStyle: {backgroundColor: '#FF5704'},
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
