import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

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
import ChalisaDetail from './src/Component/ChalisaDetail';
import Suvichar from './src/Component/Suvichar';
import MandirDetail from './src/Component/MandirDetail';
import Profile from './src/Component/Profile';
// import HomeNavBAr from './src/Component/HomeNavBAr';
import HomeNavBar from './src/Component/HomeNavBAr';
import MyBooking from './src/Component/MyBooking';
import ContactUs from './src/Component/ContactUs';
import About from './src/Component/About';
import Otp from './src/Component/Otp';

export type RootStackParamList = {
  Otp: undefined;
  TabNavigator: undefined;
  ContactUs: undefined;
  About: undefined;
  PujaDetail:undefined;
  PreviewPuja:undefined;
};

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Create Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const Drawer = createDrawerNavigator();




const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        initialRouteName="Otp"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="PujaDetail" component={PujaDetail} />
        <Stack.Screen name="PreviewPuja" component={} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
