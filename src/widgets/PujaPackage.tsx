import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';

const PujaPackage = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const packages = [
    {
      id: 1,
      title: 'Individual',
      subTitle: 'For 1 Devotee',
      price: '₹850/-',
      description:
        'During the puja sankalp, Pandit ji will respectfully call out your name and gotra, along with the names of other participants. This ensures that your intentions and prayers are personally included in the ritual, seeking blessings for you and your family.',
      image:
        'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/individual.png',
    },
    {
      id: 2,
      title: 'Couple',
      subTitle: 'For 2 Devotees',
      price: '₹1500/-',
      description:
        'Designed for couples to seek blessings together. Includes your names and gotras in the puja sankalp for enhanced spiritual benefits.',
      image:
        'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/couple.png',
    },
    {
      id: 3,
      title: 'Family',
      subTitle: 'For 6 Devotees',
      price: '₹2500/-',
      description:
        'Perfect for families to join the puja together. Includes up to 6 family members in the puja sankalp.',
      image:
        'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/family.png',
    },
    {
      id: 4,
      title: 'Joint Family',
      subTitle: 'For Upto 12 Devotees',
      price: '₹5000/-',
      description:
        'Ideal for joint families to partake in the puja. Includes up to 12 family members in the sankalp for collective blessings.',
      image:
        'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/joint.png',
    },
  ];

  const handleCardPress = (id: number) => {
    setExpandedCard(prev => (prev === id ? null : id));
  };

  const renderCard = ({
    item,
  }: {
    item: {
      id: number;
      title: string;
      subTitle: string;
      price: string;
      description: string;
      image: string;
    };
  }) => {
    const isExpanded = expandedCard === item.id;
    return (
      <TouchableOpacity
        onPress={() => handleCardPress(item.id)}
        style={[styles.card, isExpanded ? styles.expandedCard : {}]}>
        <View style={styles.cardContent}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubTitle}>{item.subTitle}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
          </View>
          <Image source={{uri: item.image}} style={styles.cardImage} />
        </View>
        {isExpanded && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={packages}
      keyExtractor={item => item.id.toString()}
      renderItem={renderCard}
      contentContainerStyle={styles.container}
      nestedScrollEnabled={true} // Enable nested scrolling
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  expandedCard: {
    backgroundColor: '#eef5ff',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 133,
    height: '100%',
    borderRadius: 10,
    marginRight: 10,
    objectFit: 'contain',
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardSubTitle: {
    fontSize: 14,
    color: '#666',
  },
  cardPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  descriptionContainer: {
    marginTop: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default PujaPackage;
