import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; // ✅ Import MaterialIcons

interface BenefitData {
  title: string;
  description: string;
}

interface PujaBenefitCardProps {
  poojaBenefits: {
    benefit1Heading: string;
    benefit1Desc: string;
    benefit2Heading: string;
    benefit2Desc: string;
    benefit3Heading: string;
    benefit3Desc: string;
  };
}

const PujaBenefitCard: React.FC<PujaBenefitCardProps> = ({poojaBenefits}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Convert `poojaBenefits` into a format usable by the Carousel
  const data: BenefitData[] = [
    {
      title: poojaBenefits.benefit1Heading,
      description: poojaBenefits.benefit1Desc.replace(/<\/?[^>]+(>|$)/g, ''), // Strip HTML tags
    },
    {
      title: poojaBenefits.benefit2Heading,
      description: poojaBenefits.benefit2Desc.replace(/<\/?[^>]+(>|$)/g, ''), // Strip HTML tags
    },
    {
      title: poojaBenefits.benefit3Heading,
      description: poojaBenefits.benefit3Desc.replace(/<\/?[^>]+(>|$)/g, ''), // Strip HTML tags
    },
  ];

  const renderItem = ({
    item,
    index,
  }: {
    item: BenefitData;
    index: number;
  }): React.ReactElement => {
    const isExpanded = expandedIndex === index;

    return (
      <View style={styles.card}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 8,
          }}>
          <Icon name="flower" color="#FF6505" size={18} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <Text style={styles.description} numberOfLines={isExpanded ? 0 : 3}>
          {item.description}
        </Text>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setExpandedIndex(isExpanded ? null : index)}>
          <Text style={styles.showMore}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </Text>
          <MaterialIcon
            name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={20}
            color="#FFA500"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel<BenefitData>
        data={data}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width * 0.9}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.7}
        loop={true}
        autoplay={true}
        autoplayDelay={1000}
        autoplayInterval={3000}
        vertical={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    marginTop: '5%',
    padding: 16,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 3,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  showMore: {
    fontSize: 14,
    color: '#FF6505',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 8,
  },
});

export default PujaBenefitCard;
