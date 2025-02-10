import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MandirInstruction from './MandirInstruction';
import MandirIntro from './MandirIntro';
import MandirHistory from './MandirHistory';
import MandirPuja from './MandirPuja';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import axios from 'axios';
import DifferentMandir from './DifferentMandir';

type StackParamList = {
  MandirDetail: {
    id: string;
    templeData: any; // ✅ Explicitly Define templeData
  };
};

const decodeHtmlEntities = (text: string): string => {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'") // Add more as needed
    .replace(/&nbsp;/g, '');
};

const stripHtmlTagsAndDecode = (html: string): string => {
  const withoutHtmlTags = html.replace(/<\/?[^>]+(>|$)/g, ''); // Strip HTML tags
  return decodeHtmlEntities(withoutHtmlTags); // Decode HTML entities
};

const MandirDetail = () => {
  const route = useRoute<RouteProp<StackParamList, 'MandirDetail'>>();
  const {id, templeData} = route.params;
  const [pujas, setPujas] = useState<any[]>([]); // State to store filtered Pujas
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  useEffect(() => {
    // Scroll to the top whenever the component is rendered or updated
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
    }
  }, [id, templeData]);

  useEffect(() => {
    const fetchPujas = async () => {
      try {
        const response = await axios.get(
          'http://192.168.1.30:5001/fetch-all-pooja',
        );
        console.log('Pujas API Response:', response.data); // Debug API response

        // Check if response data is valid and contains the `poojas` array
        if (response.data && Array.isArray(response.data.poojas)) {
          const allPujas = response.data.poojas;

          // Filter Pujas by matching Mandir ID
          const filteredPujas = allPujas.filter((pooja: any) =>
            pooja.mandirLists.some(
              (mandir: any) => mandir.mandirId === templeData._id,
            ),
          );

          setPujas(filteredPujas);
        } else {
          console.error('Pujas API returned invalid data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching Pujas:', error);
      }
    };

    fetchPujas();
  }, [templeData._id]);

  //  useEffect(() => {
  //    console.log('Filtered Pujas:', pujas);
  //  }, [pujas]);

  //  useEffect(() => {
  //    console.log('Received Temple Data:', templeData);
  //    console.log('Description:', templeData.description);
  //  }, [templeData]);

  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign
          onPress={handleGoBack}
          name="arrowleft"
          size={23}
          color="black"
        />
        <Text style={styles.headerText}>
          {/* {templeData.nameEnglish || 'Mandir'} */}
          Mandir
        </Text>
      </View>

      {/* Mandir Detail Box */}
      <View style={{backgroundColor: '#FFFEFA'}}>
        <View style={styles.mandirBox}>
          {/* Image */}
          <Image
            source={{
              uri:
                templeData.mandirSectionImage ||
                'https://vedic-vaibhav.blr1.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/baijnath.png', // ✅ Fallback in case API image is missing
            }}
            style={styles.image}
          />

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {templeData.nameEnglish || 'Mandir'}
            </Text>
            <Text style={styles.subtitle}>
              {templeData.location || 'Location Not Available'}
            </Text>
          </View>
        </View>

        {/* Instructions Section */}
        <View style={styles.section}>
          <MandirInstruction
            location={templeData.location || 'Location Not Available'}
            openTiming={templeData.openTiming || 'Not Available'}
            closeTiming={templeData.closeTiming || 'Not Available'}
            localLanguage={templeData.localLanguage || 'Not Available'}
          />
        </View>
        <View
          style={{
            borderStyle: 'dashed',
            borderWidth: 0.3,
            borderColor: 'black',
            marginHorizontal: 15,
          }}></View>

        {/* Introduction Section */}
        <View style={styles.section}>
          <MandirIntro
            description={
              stripHtmlTagsAndDecode(templeData.mandirSectionIntro || 'No introduction available.')
            }
          />
        </View>
        <View style={styles.section}>
          <MandirHistory
            description={stripHtmlTagsAndDecode(
              templeData.mandirSectionHistory || 'No introduction available.')
            }
          />
        </View>
        <View style={{backgroundColor: '#0A6B81'}}>
          <MandirPuja name={templeData.nameEnglish || 'Mandir'} pujas={pujas} />
        </View>
        <View style={{backgroundColor: '#C5891B'}}>
          <DifferentMandir currentMandirId={templeData._id} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 15,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginLeft: 10,
  },
  mandirBox: {
    borderRadius: 17,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    paddingHorizontal: 15,
  },
  image: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    backgroundColor: '#800020', // Deep red color for the text container
    padding: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingTop: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    // marginTop: 5,
  },
  section: {
    marginVertical: 20,
  },
});

export default MandirDetail;
