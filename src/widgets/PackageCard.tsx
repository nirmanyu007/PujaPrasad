import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {RootStackParamList} from '../../App';

interface PackageCardProps {
  backgroundcolor: string;
  textcolor: string;
  packagename: string;
  packageprice: number;
  persons: string;
  imgSrc: string;
  description: string;
  buttoncolor: string;
  // isSelected: boolean;
  onSelectPackage: () => void;
}

const {width} = Dimensions.get('window');

const PackageCard: React.FC<PackageCardProps> = ({
  backgroundcolor,
  textcolor,
  packagename,
  packageprice,
  persons,
  imgSrc,
  description,
  buttoncolor,
  // isSelected,
  onSelectPackage,
}) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);

  const toggleDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };

  const handleCardPress = () => {
    onSelectPackage();
    toggleDescription();
  };

  type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    'ViewPujaBooking'
  >;
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity
      onPress={handleCardPress}
      activeOpacity={0.9}
      style={styles.cardContainer}>
      {/* Radio Button */}
      {/* <View
        style={[
          styles.radioButton,
          {
            borderColor: buttoncolor,
            backgroundColor: isSelected ? buttoncolor : 'transparent',
          },
        ]}
      /> */}
      {/* Package Card */}
      <View
        style={[
          styles.card,
          {backgroundColor: backgroundcolor, shadowColor: buttoncolor},
        ]}>
        <View style={styles.cardContent}>
          <View style={styles.cardLeft}>
            {/* Package Name */}
            <Text style={[styles.packageName, {color: textcolor}]}>
              {packagename}
            </Text>
            {/* Persons Tag */}
            <Text style={styles.personsTag}>{persons}</Text>
            {/* Package Price */}
            <Text style={[styles.packagePrice, {color: textcolor}]}>
              ₹ {packageprice}/-
            </Text>
          </View>
          {/* Package Image */}
          <Image
            source={{uri: imgSrc}}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>

        {/* Accordion for Description */}
        {/* {isSelected && (
          <View style={styles.description}>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
        )} */}
      </View>

      {/* Participate Button */}
      <TouchableOpacity
        style={[styles.button, {backgroundColor: buttoncolor}]}
        onPress={onSelectPackage}>
        <Text style={styles.buttonText}>Participate</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    width: width * 0.9,
    alignSelf: 'center',
    position: 'relative',
  },
  radioButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    zIndex: 100,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  cardLeft: {
    flex: 1,
    justifyContent: 'space-between',
  },
  packageName: {
    fontSize: 18,
    fontWeight: '600',
  },
  personsTag: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 10,
    color: '#000',
  },
  packagePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  description: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'justify',
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,                         
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PackageCard;
