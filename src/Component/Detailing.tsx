import React, {useRef, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
} from 'react-native';
import AboutPujaBox from '../widgets/AboutPujaBox';
import PujaBenefitCard from '../widgets/PujaBenefitCard';
import PujaProcess from '../widgets/PujaProcess';
import PujaPackage from '../widgets/PujaPackage';
import TempleDetail from '../widgets/TempleDetail';
import Review from '../widgets/Review';
import Faq from '../widgets/Faq';

// Individual Section Components
const AboutSection: React.FC<{innerRef: React.RefObject<View>}> = ({
  innerRef,
}) => (
  <View ref={innerRef} style={styles.sectionContainer}>
    <View style={{width: '100%'}}>
      <Text
        style={{
          backgroundColor: '#FF8901',
          width: 110,
          paddingVertical: 3,
          borderRadius: 10,
          color: '#FFFEFA',
          textAlign:'center',
          fontSize:16,
          fontWeight:700
        }}>
        About Puja
      </Text>
    </View>

    <View>
        <AboutPujaBox/>
    </View>
  </View>
);

const BenefitsSection: React.FC<{innerRef: React.RefObject<View>}> = ({
  innerRef,
}) => (
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
          fontWeight: 700,
        }}>
        Puja Benefits
      </Text>
    </View>
    <View><PujaBenefitCard/></View>
  </View>
);

const ProcessSection: React.FC<{innerRef: React.RefObject<View>}> = ({
  innerRef,
}) => (
  <View ref={innerRef} style={styles.sectionContainer}>
    <View
      style={{flexDirection: 'row', display: 'flex', justifyContent: 'center'}}>
      <Text style={{fontSize: 16, fontWeight: 700, color: 'rgba(0,0,0,0.9)'}}>
        How To Book Puja With{' '}
      </Text>
      <Text style={{color: '#FD7109', fontSize: 16, fontWeight: 700}}>
        Vedic Vaibhav
      </Text>
    </View>
    <Text style={{textAlign:'center', paddingBottom:'3%'}}>6 easy steps to offer Puja </Text>
    <View>
      <PujaProcess />
    </View>
  </View>
);



const PackagesSection: React.FC<{innerRef: React.RefObject<View>}> = ({
  innerRef,
}) => (
  <View ref={innerRef} style={styles.sectionContainer}>
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
    <Text style={{textAlign:'center'}}>
      Click on the card to check package details
    </Text>
    <View>
        <PujaPackage/>
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
    <View><TempleDetail/></View>
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
        paddingLeft:'3%'
      }}>
      Frequently Asked Questions (FAQs)
    </Text>
    <View>
      <Faq />
    </View>
  </View>
);

// Main Component
const Detailing: React.FC = () => {
  const aboutRef = useRef<View>(null);
  const benefitsRef = useRef<View>(null);
  const processRef = useRef<View>(null);
  
  const packagesRef = useRef<View>(null);
  const templeDetailsRef = useRef<View>(null);
  const reviewsRef = useRef<View>(null);
  const faqRef = useRef<View>(null);

  const [activeSection, setActiveSection] = useState('about');

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

  return (
    <View style={styles.container}>
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
            ]}>
            <Text
              style={
                activeSection === section.label
                  ? styles.activeNavText
                  : styles.navText
              }>
              {section.label.charAt(0).toUpperCase() + section.label.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content Sections */}
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}>
        <AboutSection innerRef={aboutRef} />
        <BenefitsSection innerRef={benefitsRef} />
        <ProcessSection innerRef={processRef} />

        <PackagesSection innerRef={packagesRef} />
        <TempleDetailsSection innerRef={templeDetailsRef} />
        <ReviewsSection innerRef={reviewsRef} />
        <FAQSection innerRef={faqRef} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#e0e0e0', // Default background color
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
  sectionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#FFFEFA',
    backgroundColor: '#FF8901',
    // width:110,
    display:'flex',
    textAlign:'center',
    paddingVertical:3,
    borderRadius:10
  },
  sectionContent: {
    fontSize: 14,
    color: '#555',
  },
  sectionImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default Detailing;
