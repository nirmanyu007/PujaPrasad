import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const PujaProcess = () => {
  const steps = [
    {
      id: 1,
      image:
        'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/number1.png',
      title: 'Select Your Pooja',
      description: 'Choose the Pooja that aligns with your spiritual goals',
    },
    {
      id: 2,
      image:
        'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/number2.png',
      title: 'Choose a Package',
      description: 'Pick a package that suits your needs.',
    },
    {
      id: 3,
      image:
        'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/number3.png',
      title: 'Provide Devotee Details (Gotra & Name)',
      description: 'Enter essential details to personalize your Pooja',
    },
    {
      id: 4,
      image:
        'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/number4.png',
      title: 'Receive a Puja Reminder',
      description: 'Stay informed with timely Pooja reminders',
    },
    {
      id: 5,
      image:
        'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/number5.png',
      title: 'Get Puja Video and Photos',
      description:
        'Receive high-quality video footage and photos of your puja on WhatsApp within 2-3 days.',
    },
    {
      id: 6,
      image:
        'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/number6.png',
      title: 'Receive Prasad at Your Doorstep',
      description:
        'Experience divine blessings as the prasad is delivered straight to your home within 5-7 days.',
    },
  ];

  return (
    <View style={styles.container}>
      {steps.map(step => (
        <View key={step.id} style={styles.stepContainer}>
          <Image source={{uri: step.image}} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{step.title}</Text>
            <Text style={styles.description}>{step.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  description: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.7)',
    marginTop: 5,
  },
});

export default PujaProcess;
