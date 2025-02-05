import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; // ✅ Import Material Icons

const Faq = () => {
  const [activeFaq, setActiveFaq] = useState<number>(-1);

  const faqs = [
    {
      question: 'Why should I choose Vedic Vaibhav for performing Puja?',
      answer:
        'Vedic Vaibhav is a reputable provider of online puja services, astrology consultations, and prasad delivery, allowing you to engage in spiritual practices from the comfort of your home.',
    },
    {
      question: 'What services does Vedic Vaibhav provide?',
      answer:
        'Vedic Vaibhav provides a range of services, including personalized pujas, astrology consultations, and prasad delivery services.',
    },
    {
      question: 'How can I book a puja through Vedic Vaibhav?',
      answer:
        'You can easily book a puja through Vedic Vaibhav by visiting our website or mobile app, selecting the desired puja, and following the instructions.',
    },
  ];

  const handleFaqToggle = (index: number) => {
    setActiveFaq(index === activeFaq ? -1 : index);
  };

  return (
    <View style={styles.container}>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqContainer}>
          <TouchableOpacity
            onPress={() => handleFaqToggle(index)}
            style={styles.faqHeader}>
            <Text style={styles.question}>{faq.question}</Text>
            <MaterialIcon
              name={
                activeFaq === index
                  ? 'keyboard-arrow-up'
                  : 'keyboard-arrow-down'
              }
              size={30}
              color="black"
            />
          </TouchableOpacity>
          {activeFaq === index && (
            <Text style={styles.answer}>{faq.answer}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F9F9F9',
    marginBottom: '5%',
  },
  faqContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#BFBEBD',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 14,
    color: 'black',
    flex: 1, // Ensures text takes full width before the icon
  },
  answer: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
});

export default Faq;
