import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

interface CardData {
  title: string;
  description: string;
  expandedDescription: string;
}

const data: CardData[] = [
  {
    title: 'For the Well-Being of Your Children',
    description:
      'According to scriptures, performing the 11,000 Mahamrityunjaya Mantra Jaap...',
    expandedDescription:
      'According to scriptures, performing the 11,000 Mahamrityunjaya Mantra Jaap, along with the Yam Dand-Mukti Pujan and Ayushya Havan at the Markandey Mahadev Temple, is believed to invoke Lord Shiva’s blessings for children’s health, prosperity, and well-being.',
  },
  {
    title: 'For a Prosperous Career',
    description: 'Seeking divine blessings for success in your career...',
    expandedDescription:
      'Seeking divine blessings for success in your career, the Rudrabhishek with 108 Bilva leaves is said to remove obstacles in professional life and provide clarity in decision-making.',
  },
  {
    title: 'For Family Harmony',
    description:
      'Strengthen family bonds and resolve conflicts by performing...',
    expandedDescription:
      'Strengthen family bonds and resolve conflicts by performing the Saptashati Durga Path at a sacred site, believed to enhance unity and understanding within the family.',
  },
];

const PujaBenefitCard: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const renderItem = ({
    item,
    index,
  }: {
    item: CardData;
    index: number;
  }): React.ReactElement => {
    const isExpanded = expandedIndex === index;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>
          {isExpanded ? item.expandedDescription : item.description}
        </Text>
        <TouchableOpacity onPress={() => setExpandedIndex(isExpanded ? null : index)}>
          <Text style={styles.showMore}>
            {isExpanded ? 'Show less ▲' : 'Show more ▼'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel<CardData>
        data={data}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width * 0.8}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.7}
        loop={true} // Enable looping
        autoplay={true} // Enable autoplay
        autoplayDelay={1000} // Initial delay before autoplay starts (in ms)
        autoplayInterval={3000} // Interval between auto-scrolls (in ms)
        vertical={false} // Ensure horizontal scrolling
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
    // backgroundColor: '#FFF7ED',
    borderRadius: 10,
    borderWidth:1,
    marginTop:'5%',
    padding: 16,
    borderColor:'rbga(0,0,0,0.1)',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
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
    marginTop: 8,
  },
});

export default PujaBenefitCard;
