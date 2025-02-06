import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  NativeSyntheticEvent,
  Animated,
  NativeScrollEvent,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';
import Detailing from './Detailing';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AboutPujaBox from '../widgets/AboutPujaBox';
import PujaBenefitCard from '../widgets/PujaBenefitCard';
import PujaProcess from '../widgets/PujaProcess';
// import PujaPackage from '../widgets/PujaPackage';
import TempleDetail from '../widgets/TempleDetail';
import Review from '../widgets/Review';
import Faq from '../widgets/Faq';
import PackageCard from '../widgets/PackageCard';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {CountdownTimer} from './TimerCard';
import {NavigationProvider} from './NavigationContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import ImageStack from './ImageStack';
import StarRating from './StarRating';

type StackParamList = {
  PujaDetail: {
    pujaId: string;
    pujaData: Puja; // Pass the entire Puja object
  };
  ViewPujaBooking: {pujaId?: string; packagename?: string}; // Define any params if required, e.g., { id: number }
};

interface DetailingRef {
  scrollToPackages: () => void;
}

interface Puja {
  _id: string;
  title: string;
  poojaCardImage: string;
  poojaCardBenefit: string;
  images: string[];
  poojaDescription?: string;
  poojaBenefits?: string;
  mandirLists: {
    mandirId: string;
    poojaMandirDates: string[];
    poojaMandirTime?: string;
    originalPrice?: number;
    poojaMandirDays?: string[];
    singlePackage: {
      price: number;
      description: string;
    };
    partnerPackage: {
      price: number;
      description: string;
    };
    familyBhogPackage: {
      price: number;
      description: string;
    };
    jointFamilyPackage: {
      price: number;
      description: string;
    };
  }[];
}

interface MandirList {
  mandirId: string;
  poojaMandirDates: string[];
  poojaMandirTime?: string;
  originalPrice?: number;
}

interface PujaDetails {
  title: string;
  poojaCardBenefit: string;
  templeDetails: {
    nameEnglish: string;
    city: string;
    state: string;
  };
  poojaDate: string;
  poojaDay: string;
  images: string[];
}

const stripHtmlTags = (htmlString: string): string => {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, '');
};

const {width: screenWidth} = Dimensions.get('window');

const PujaDetail = ({route}: {route: any}) => {
  const detailingRef = useRef<DetailingRef | null>(null);
  const {pujaId, pujaData} = route.params;
  const [puja, setPuja] = useState<any>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const stickyNavPosition = 200; // Adjust this value to when you want navbar to stick

  const handleShareOnWhatsApp = () => {
    console.log('Shared on WhatsApp!');
  };

  const navigation = useNavigation<NavigationProp<StackParamList>>(); // Get the navigation object

  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };
  const handleSelectPackage2 = () => {
    if (packagesRef.current) {
      packagesRef.current.measure(
        (
          _fx: number,
          _fy: number,
          _width: number,
          height: number,
          _px: number,
          py: number,
        ) => {
          scrollViewRef.current?.scrollTo({y: py, animated: true});
        },
      );
    }
  };

  const renderCarouselItem = ({item}: {item: string}) => {
    return (
      <View style={styles.carouselImageContainer}>
        <Image source={{uri: item}} style={styles.carouselImage} />
      </View>
    );
  };
  const [templeDetails, setTempleDetails] = useState<any>(null);
  const [selectedPuja, setSelectedPuja] = useState<any>(null);
  const [poojaDate, setPoojaDate] = useState<string>('');
  const [poojaDay, setPoojaDay] = useState<string>('');
  const [poojaTime, setPoojaTime] = useState<string>('');

  useEffect(() => {
    const fetchPoojaAndTemple = async () => {
      try {
        // 1. Fetch all puja data
        const res = await fetch(`http://192.168.1.30:5001/fetch-all-pooja`);
        const data = await res.json();

        // 2. Find the puja where p._id === id
        const puja = data.poojas.find((p: any) => p._id === pujaId);

        if (!puja) {
          console.error('Puja not found for ID:', pujaId);
          return;
        } else {
          setSelectedPuja(puja);
        }

        // 3. Extract the mandirId from the FIRST item of mandirLists
        //    (you mentioned there's always exactly one object in mandirLists)
        const mandirId = puja.mandirLists?.[0]?.mandirId;
        console.log('sdvsdfbdndfgnfgnbdgndnsnfgdfnbfdbg', mandirId);
        if (!mandirId) {
          console.error('No mandirId found in mandirLists for this puja.');
          return;
        }

        // 4. Fetch the temple data based on mandirId
        const templeRes = await fetch(
          `http://192.168.1.30:5001/fetch-mandir-by-id/${mandirId}`,
        );
        const templeJson = await templeRes.json();
        const rawPoojaDate = puja.mandirLists?.[0]?.poojaMandirDates?.[0];
        if (rawPoojaDate) {
          const dateObject = new Date(rawPoojaDate);
          const formattedDate = `${dateObject.toLocaleDateString()}`;
          setPoojaDate(formattedDate);
        }

        setPoojaDay(puja.mandirLists?.[0]?.poojaMandirDays?.[0]);
        setTempleDetails(templeJson.mandir);
      } catch (error) {
        console.error('Error fetching puja or temple data:', error);
      }
    };

    fetchPoojaAndTemple();
  }, [pujaId]);

  useEffect(() => {
    const fetchPujaDetails = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.30:5001/fetch-all-pooja`,
        );
        const data = await response.json();
        const selectedPuja = data.poojas.find((p: any) => p._id === pujaId);
        setPuja(selectedPuja);
      } catch (error) {
        console.error('Error fetching puja details:', error);
      }
    };

    fetchPujaDetails();
  }, [pujaId]);

  useEffect(() => {
    if (pujaData) {
      setSelectedPuja(pujaData); // Use the passed puja data
      // Additional setup if needed...
    }
  }, [pujaData]);
  console.log('selectedPuja:', selectedPuja);

  // Remaining component logic...
  const AboutSection: React.FC<{
    innerRef: React.RefObject<View>;
    description: string;
  }> = ({innerRef, description}) => (
    <View ref={innerRef} style={styles.sectionContainer}>
      <View style={{width: '100%'}}>
        <Text
          style={{
            backgroundColor: '#FF8901',
            width: 110,
            paddingVertical: 3,
            borderRadius: 10,
            color: '#FFFEFA',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 700,
          }}>
          About Puja
        </Text>
      </View>

      <View>
        <AboutPujaBox description={description} />
      </View>
    </View>
  );
  const BenefitsSection: React.FC<{
    innerRef: React.RefObject<View>;
    poojaBenefits: {
      benefit1Heading: string;
      benefit1Desc: string;
      benefit2Heading: string;
      benefit2Desc: string;
      benefit3Heading: string;
      benefit3Desc: string;
    };
  }> = ({innerRef, poojaBenefits}) => (
    <View ref={innerRef} style={styles.sectionContainer}>
      <View style={{width: '100%'}}>
        <Text
          style={{
            backgroundColor: '#FF8901',
            width: 130,
            paddingVertical: 5,
            borderRadius: 10,
            color: '#FFFEFA',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '700',
          }}>
          Puja Benefits
        </Text>
      </View>
      <View>
        <PujaBenefitCard poojaBenefits={poojaBenefits} />
      </View>
    </View>
  );
  const ProcessSection: React.FC<{innerRef: React.RefObject<View>}> = ({
    innerRef,
  }) => (
    <View ref={innerRef} style={styles.sectionContainer}>
      <View
        style={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 16, fontWeight: 700, color: 'rgba(0,0,0,0.9)'}}>
          How To Book Puja With{' '}
        </Text>
        <Text style={{color: '#FD7109', fontSize: 16, fontWeight: 700}}>
          Vedic Vaibhav
        </Text>
      </View>
      <Text style={{textAlign: 'center', paddingBottom: '3%'}}>
        6 easy steps to offer Puja{' '}
      </Text>
      <View>
        <PujaProcess />
      </View>
    </View>
  );
  type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    'ViewPujaBooking'
  >;

  const handleSelectPackage = (packagename: string, pujaid: string) => {
    navigation.navigate('ViewPujaBooking', {
      pujaId: pujaid,
      packagename: packagename,
    });
  };

  const PackagesSection: React.FC<{
    innerRef: React.RefObject<View>;
    singlepackageprice: number;
    singlepackagedescription: string;
    couplepackageprice: number;
    couplepackagedescription: string;
    familypackageprice: number;
    familypackagedescription: string;
    vippackageprice: number;
    vippackagedescription: string;
    pujaid: string;
  }> = ({
    innerRef,
    singlepackageprice,
    singlepackagedescription,
    couplepackageprice,
    couplepackagedescription,
    familypackageprice,
    familypackagedescription,
    vippackageprice,
    vippackagedescription,
    pujaid,
  }) => (
    <View ref={packagesRef} style={styles.sectionContainer}>
      <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
        <Text
          style={{
            backgroundColor: '#FF8901',
            width: 130,
            paddingVertical: 5,
            borderRadius: 10,
            color: '#FFFEFA',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 700,
          }}>
          Puja Package
        </Text>
      </View>
      <Text style={{textAlign: 'center'}}>
        Click on the card to check package details
      </Text>

      <View>
        <PackageCard
          backgroundcolor="#ECF4FD"
          textcolor="#476CE4"
          packagename="SINGLE"
          packageprice={singlepackageprice}
          persons="1 Person"
          imgSrc="https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/individualpackage.png"
          description={singlepackagedescription}
          buttoncolor="#476CE4"
          onSelectPackage={() => handleSelectPackage('singlePackage', pujaid)}
        />
      </View>

      <View>
        <PackageCard
          backgroundcolor="#EDE7F9"
          textcolor="#4A0ABD"
          packagename="COUPLE"
          packageprice={couplepackageprice}
          persons="2 Persons"
          imgSrc="https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/partnerpackage.png"
          description={couplepackagedescription}
          buttoncolor="#4A0ABD"
          onSelectPackage={() => handleSelectPackage('partnerPackage', pujaid)}
        />
      </View>
      <View>
        <PackageCard
          backgroundcolor="#FEF5EC"
          textcolor="#F7A03E"
          packagename="FAMILY"
          packageprice={familypackageprice}
          persons="upto 6"
          imgSrc="https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/package3img.png"
          description={familypackagedescription}
          buttoncolor="#F7A03E"
          onSelectPackage={() =>
            handleSelectPackage('familyBhogPackage', pujaid)
          }
        />
      </View>
      <View>
        <PackageCard
          backgroundcolor="#E1FED4"
          textcolor="#359807"
          packagename="VIP"
          packageprice={vippackageprice}
          persons="Corporate"
          imgSrc="https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/package4img.png"
          description={vippackagedescription}
          buttoncolor="#359807"
          onSelectPackage={() =>
            handleSelectPackage('jointFamilyPackage', pujaid)
          }
        />
      </View>
    </View>
  );
  const TempleDetailsSection: React.FC<{innerRef: React.RefObject<View>}> = ({
    innerRef,
  }) => (
    <View ref={innerRef} style={styles.sectionContainer}>
      <View style={{width: '100%', display: 'flex'}}>
        <Text
          style={{
            backgroundColor: '#FF8901',
            width: 130,
            paddingVertical: 5,
            borderRadius: 10,
            color: '#FFFEFA',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 700,
          }}>
          Temple Details
        </Text>
      </View>
      <View>
        <TempleDetail />
      </View>
    </View>
  );
  const ReviewsSection: React.FC<{innerRef: React.RefObject<View>}> = ({
    innerRef,
  }) => (
    <View ref={innerRef} style={styles.sectionContainer}>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 700,
            textAlign: 'center',
            color: '#1E1E1E',
          }}>
          Review & Rating
        </Text>
      </View>
      <Review />
    </View>
  );

  const FAQSection: React.FC<{innerRef: React.RefObject<View>}> = ({
    innerRef,
  }) => (
    <View ref={innerRef} style={styles.sectionContainer}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 700,
          // textAlign: 'center',
          color: '#1E1E1E',
          paddingLeft: '3%',
        }}>
        Frequently Asked Questions (FAQs)
      </Text>
      <View>
        <Faq />
      </View>
    </View>
  );

  const aboutRef = useRef<View>(null);
  const benefitsRef = useRef<View>(null);
  const processRef = useRef<View>(null);
  const packagesRef = useRef<View>(null);
  const templeDetailsRef = useRef<View>(null);
  const reviewsRef = useRef<View>(null);
  const faqRef = useRef<View>(null);

  const [activeSection, setActiveSection] = useState('about');
  const scrollViewRef = useRef<ScrollView>(null);

  const sectionRefs = [
    {label: 'about', ref: aboutRef},
    {label: 'benefits', ref: benefitsRef},
    {label: 'process', ref: processRef},
    {label: 'packages', ref: packagesRef},
    {label: 'templeDetails', ref: templeDetailsRef},
    {label: 'reviews', ref: reviewsRef},
    {label: 'faq', ref: faqRef},
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;

    sectionRefs.forEach(section => {
      section.ref.current?.measure(
        (
          _fx: number,
          _fy: number,
          _width: number,
          height: number,
          _px: number,
          py: number,
        ) => {
          if (scrollPosition >= py && scrollPosition < py + height) {
            setActiveSection(section.label);
          }
        },
      );
    });
  };
  const handleNavigationClick = (sectionLabel: string) => {
    const section = sectionRefs.find(s => s.label === sectionLabel);
    if (section && section.ref.current) {
      section.ref.current.measure(
        (
          _fx: number,
          _fy: number,
          _width: number,
          height: number,
          _px: number,
          py: number,
        ) => {
          scrollViewRef.current?.scrollTo({y: py, animated: true});
        },
      );
    }
  };

  return (
    <>
      {selectedPuja && templeDetails ? (
        <NavigationProvider navigation={navigation}>
          <View style={styles.container}>
            {/* Content Scroll */}
            <ScrollView
              ref={scrollViewRef}
              style={styles.scrollViewContent}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {useNativeDriver: false},
              )}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: '2%',
                  paddingVertical: '2%',
                }}>
                <AntDesign
                  onPress={handleGoBack}
                  name="arrowleft"
                  size={23}
                  color="black"
                />
                <Text
                  style={{
                    paddingLeft: '2%',
                    fontSize: 18,
                    color: 'black',
                    fontWeight: 600,
                  }}>
                  {selectedPuja.poojaID}
                </Text>
              </View>
              {/* Carousel */}
              <View style={styles.carouselContainer}>
                <Carousel<string>
                  data={selectedPuja.images}
                  renderItem={renderCarouselItem}
                  sliderWidth={screenWidth}
                  itemWidth={screenWidth}
                  loop={true}
                  autoplay={true}
                  autoplayDelay={1000}
                  autoplayInterval={3000}
                  vertical={false}
                />
              </View>

              {/* Puja Details */}
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>{selectedPuja.title}</Text>
                <Text style={styles.title}>
                  {selectedPuja.poojaCardBenefit.replace(/<\/?[^>]+(>|$)/g, '')}
                </Text>
                <View style={styles.detailRow}>
                  <Image
                    source={{
                      uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/temple.png',
                    }}
                    style={styles.icon}
                  />
                  <Text style={styles.detailText}>
                    {templeDetails.nameEnglish},{templeDetails.location}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Image
                    source={{
                      uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/date.png',
                    }}
                    style={styles.icon}
                  />
                  <Text style={styles.detailText}>
                    {poojaDate}, {poojaDay}
                  </Text>
                </View>

                <CountdownTimer
                  targetDate={
                    selectedPuja.mandirLists?.[0]?.poojaMandirDates?.[0]
                  }
                />
                <View style={styles.container}>
                  {/* Top Section with ImageStack and StarRating */}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: 15,
                    }}>
                    <ImageStack />
                    <Text
                      style={{
                        fontSize: 26,
                        fontWeight: '600',
                        color: '#F4B400',
                        paddingLeft: 70,
                      }}>
                      4.7
                    </Text>
                    {Array.from({length: 5}).map((_, index) => (
                      <Image
                        key={index}
                        source={{
                          uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/star.png',
                        }}
                        style={{width: 20, height: 20, marginLeft: 2}}
                      />
                    ))}
                    {/* <AntDesign name="star" color="#FDD835" size={23} />
                    <AntDesign name="star" color="#FDD835" size={23} />
                    <AntDesign name="star" color="#FDD835" size={23} />
                    <AntDesign name="star" color="#FDD835" size={23} />
                    <AntDesign name="star" color="#FDD835" size={23} /> */}
                    {/* <Image  source={{uri:'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/starrating.svg'}} style={{height:20,width:20,}}/> */}
                  </View>

                  {/* Rating Description */}
                  <Text style={styles.ratingText}>Based on 120 ratings</Text>
                </View>
              </View>

              {/* Additional Details */}
              <Animated.View
                style={[
                  styles.stickyNavigationContainer,
                  {
                    transform: [
                      {
                        translateY: scrollY.interpolate({
                          inputRange: [
                            stickyNavPosition,
                            stickyNavPosition + 50,
                          ], // Smooth transition range
                          outputRange: [0, -50], // Moves up and sticks at top
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                {/* Sticky Navigation */}
                <ScrollView
                  horizontal
                  style={styles.stickyNavigation}
                  showsHorizontalScrollIndicator={false}>
                  {sectionRefs.map(section => (
                    <TouchableOpacity
                      key={section.label}
                      style={[
                        styles.navItem,
                        activeSection === section.label && styles.activeNavItem,
                      ]}
                      onPress={() => handleNavigationClick(section.label)}>
                      <Text
                        style={
                          activeSection === section.label
                            ? styles.activeNavText
                            : styles.navText
                        }>
                        {section.label.charAt(0).toUpperCase() +
                          section.label.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* Content Sections */}
                <ScrollView
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                  showsVerticalScrollIndicator={true}>
                  <AboutSection
                    innerRef={aboutRef}
                    description={
                      selectedPuja?.poojaDescription ??
                      'No description available'
                    }
                  />

                  <BenefitsSection
                    innerRef={benefitsRef}
                    poojaBenefits={selectedPuja?.poojaBenefits}
                  />
                  <ProcessSection innerRef={processRef} />
                  <PackagesSection
                    innerRef={packagesRef}
                    singlepackageprice={
                      selectedPuja?.mandirLists?.[0]?.singlePackage?.price ?? 0
                    }
                    singlepackagedescription={
                      selectedPuja?.mandirLists?.[0]?.singlePackage
                        ?.description ?? 'No description'
                    }
                    couplepackageprice={
                      selectedPuja?.mandirLists?.[0]?.partnerPackage?.price ?? 0
                    }
                    couplepackagedescription={
                      selectedPuja?.mandirLists?.[0]?.partnerPackage
                        ?.description ?? 'No description'
                    }
                    familypackageprice={
                      selectedPuja?.mandirLists?.[0]?.familyBhogPackage
                        ?.price ?? 0
                    }
                    familypackagedescription={
                      selectedPuja?.mandirLists?.[0]?.familyBhogPackage
                        ?.description ?? 'No description'
                    }
                    vippackageprice={
                      selectedPuja?.mandirLists?.[0]?.jointFamilyPackage
                        ?.price ?? 0
                    }
                    vippackagedescription={
                      selectedPuja?.mandirLists?.[0]?.jointFamilyPackage
                        ?.description ?? 'No description'
                    }
                    pujaid={pujaId}
                  />
                  <TempleDetailsSection innerRef={templeDetailsRef} />
                  <ReviewsSection innerRef={reviewsRef} />
                  <FAQSection innerRef={faqRef} />
                </ScrollView>
              </Animated.View>
            </ScrollView>

            {/* Fixed Button */}
            <View style={styles.floatingButton}>
              <TouchableOpacity
                onPress={handleSelectPackage2}
                style={styles.selectPackageButton}>
                <Text style={styles.selectPackageText}>Select Package</Text>
              </TouchableOpacity>
            </View>
          </View>
        </NavigationProvider>
      ) : (
        <Text>fdjn</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flex: 1,
  },
  stickyNavigationContainer: {
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Keeps navbar above other content
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  selectPackageButton: {
    backgroundColor: '#FF7D00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 50,
    width: '90%',
    elevation: 5,
  },
  selectPackageText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  stickyNavigation: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 10,
  },
  navItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    // backgroundColor: '#e0e0e0', // Default background color
  },
  activeNavItem: {
    backgroundColor: '#FFA500', // Orange color for active navbar item
  },
  navText: {
    fontSize: 14,
    color: '#333',
  },
  activeNavText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  carouselContainer: {
    alignItems: 'center',
  },
  carouselImageContainer: {
    paddingHorizontal: '3%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: 185,
    borderRadius: 12,
  },
  detailsContainer: {
    paddingHorizontal: '4%',
    marginBottom: 20, // Add some space for clarity
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    marginTop: 10,
    color: 'rgba(0,0,0,0.95)',
  },
  benefitsContainer: {
    marginVertical: 5,
  },
  benefitsText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  ratingText: {
    marginLeft: 10,
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
    fontStyle: 'italic',
    paddingTop: 10,
  },
  sectionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default PujaDetail;
