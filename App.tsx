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
import Library from './src/Component/Libreary';
import CustomDrawer from './src/Component/CustomDrawer';
import PujaBooking from './src/Component/PujaBooking';
import PrasadBooking from './src/Component/PrasadBooking';
import TermsCondition from './src/Component/TermsCondition';
import PrivacyPolicy from './src/Component/PrivacyPolicy';

export type RootStackParamList = {
  Otp: undefined;
  TabNavigator: undefined;
  ContactUs: undefined;
  About: undefined;
  PujaDetail: undefined;
  ViewPujaBooking: undefined;
  Congratulation: undefined;
  SelectPrasadPackage: undefined;
  Blogs: undefined;
  Libreary: undefined;
  Suvichar: undefined;
  BlogDetail: undefined;
  Arti: undefined;
  Chalisa: undefined;
  ArtiDetail: undefined;
  ChalisaDetail: undefined;
  MandirDetail: undefined;
  Cart: undefined;
  Address: undefined;
  PujaDetailPage: undefined;
  // MainDrawer:undefined;
  DrawerNavigator: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  ContactUs: undefined;
  Profile: undefined;
  About: undefined;
  Puja: undefined;
};

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Create Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const Drawer = createDrawerNavigator();



const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name="Puja" component={PujaPage} />
      <Drawer.Screen name="Mandir" component={Mandir} />
      <Drawer.Screen name="Prasad" component={PrasadPage} />
      <Drawer.Screen name="Explore" component={Explore} />
      <Drawer.Screen name="ContactUs" component={ContactUs} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="MyBooking" component={MyBooking} />
      <Drawer.Screen name="TermsCondition" component={TermsCondition} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Drawer.Navigator>
  );
};

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
        name="PujaPage"
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
        component={DrawerNavigator}
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
        {/* <Stack.Screen name="MainDrawer" component={DrawerNavigator} /> */}
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="PujaDetail" component={PujaDetail} />
        <Stack.Screen name="Congratulation" component={Congratulation} />
        <Stack.Screen name="ViewPujaBooking" component={View_Puja_Booking} />
        <Stack.Screen name="Blogs" component={Blog} />
        <Stack.Screen name="Libreary" component={Library} />
        <Stack.Screen name="Suvichar" component={Suvichar} />
        <Stack.Screen name="BlogDetail" component={BlogCardDetail} />
        <Stack.Screen name="Arti" component={Arti} />
        <Stack.Screen name="Chalisa" component={Chalisa} />
        <Stack.Screen name="ArtiDetail" component={ArtiDetail} />
        <Stack.Screen name="ChalisaDetail" component={ChalisaDetail} />
        <Stack.Screen name="MandirDetail" component={MandirDetail} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="PujaDetailPage" component={PujaDetailPage} />
        <Stack.Screen
          name="SelectPrasadPackage"
          component={SelectPrasadPackage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
