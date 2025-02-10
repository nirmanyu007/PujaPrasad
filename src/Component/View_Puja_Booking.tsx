import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RootStackParamList} from '../../App';

// type StackParamList = {
//   PujaDetailPage: undefined;
// };

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

const View_Puja_Booking = ({route}: {route: any}) => {
  const {pujaId} = route.params;
  const {packagename} = route.params;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleClick = () => {
    navigation.navigate('PujaDetailPage', {
      packageName: packagename,
      price: calculateTotalPrice(),
    }); // Navigate to PreviewPuja screen
  };
  //   const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const [customPrice, setCustomPrice] = useState<string>('');
  const [selectedOfferings, setSelectedOfferings] = useState<
    {id: string; title: string; price: number}[]
  >([]);

  const data = {
    title: 'Mahamrityunjaya Jaap and Rudrabhishek 11 Shashtri',
    description:
      'The Mahamrityunjay Jaap offers protection from negative forces, untimely death, and aids in healing and recovery from illnesses.',
    package: 'Individual',
    date: '20 Jan, 2025',
    day: 'Tuesday',
    location: 'Kashi Vishwanath Temple, Varanasi, Uttar Pradesh, India',
    price: '₹850/-',
  };

  const offeringItems = [
    {
      id: '1',
      title: 'Dakshina to Pandit',
      description:
        'Dakshina is a token of gratitude given to the Pandit for conducting rituals and prayers.',
      imageUri:
        'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/leaf.png',
    },
    {
      id: '2',
      title: 'Donate to Mandir',
      description:
        'Support the sacred traditions by donating to the Mandir. Your contribution helps preserve its heritage.',
      imageUri:
        'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/jhanda.png',
    },
    {
      id: '3',
      title: 'Brahman Bhoj',
      description:
        'A sacred tradition of offering meals to Brahmins as an act of gratitude and spiritual merit.',
      imageUri:
        'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/Puja/bhoj.png',
    },
  ];
  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const openModal = (item: string) => {
    setModalVisible(item);
  };

  const closeModal = () => {
    setModalVisible(null);
    setCustomPrice('');
  };
  const handleNumericChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, ''); // Ensure only numbers
    setCustomPrice(numericValue);
  };

  const handleModalConfirm = (title: string, price: number) => {
    const offering = offeringItems.find(item => item.title === title);
    if (!offering) return;

    const updatedOfferings = [...selectedOfferings];
    const existingIndex = updatedOfferings.findIndex(
      item => item.id === offering.id,
    );

    if (existingIndex !== -1) {
      // Update existing offering
      updatedOfferings[existingIndex] = {id: offering.id, title, price};
    } else {
      // Add new offering
      updatedOfferings.push({id: offering.id, title, price});
    }

    setSelectedOfferings(updatedOfferings);
    closeModal();
  };
  const calculateTotalPrice = () => {
    // Parse the Puja price to a number (assuming it's in the format "₹850/-")
    const pujaPrice = packagePrice;

    // Calculate the total price of selected offerings
    const offeringsTotal = selectedOfferings.reduce(
      (sum, item) => sum + item.price,
      0,
    );

    // Return the total amount
    return pujaPrice + offeringsTotal;
  };
  const renderPriceOptions = (title: string) => (
    <View style={{alignItems: 'center', flexDirection: 'row', gap: 8}}>
      {[51, 101, 501, 1100, 2100].map(amount => (
        <TouchableOpacity
          key={amount}
          style={styles.priceButton}
          onPress={() => handleModalConfirm(title, amount)}>
          <Text style={styles.priceButtonText}>₹{amount}</Text>
        </TouchableOpacity>
      ))}
      {/* <TextInput
        placeholder="Add your preference"
        value={customPrice}
        onChangeText={handleNumericChange}
        style={styles.input}
        keyboardType="numeric"
      /> */}
      {/* <Button
        title="Confirm"
        onPress={() => handleModalConfirm(title, parseFloat(customPrice) || 0)}
      /> */}
    </View>
  );
  const renderBillDetails = () => (
    <View style={styles.billDetails}>
      <View style={styles.billRow}>
        <Text style={styles.billLabel}>Puja Price</Text>
        <Text style={styles.billValue}>₹{packagePrice}/-</Text>
      </View>
      {selectedOfferings.map(offering => (
        <View key={offering.id} style={styles.billRow}>
          <Text style={styles.billLabel}>{offering.title}</Text>
          <Text style={styles.billValue}>₹{offering.price}</Text>
        </View>
      ))}
      <View style={styles.separator} />
      <View style={styles.billRow}>
        <Text style={[styles.billLabel, {fontWeight: 'bold'}]}>
          Total Amount
        </Text>
        <Text
          style={[styles.billValue, {fontWeight: 'bold', color: '#28A745'}]}>
          ₹{calculateTotalPrice()}
        </Text>
      </View>
    </View>
  );
  const renderDakshinaModal = () => (
    <Modal
      visible={modalVisible === 'Dakshina to Pandit'}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={{backgroundColor: '#fff'}}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.modalTitle}>Dakshina to Pandit Ji!</Text>

              {renderPriceOptions('Dakshina to Pandit')}

              <TextInput
                placeholder="Add your preferred amount"
                value={customPrice}
                onChangeText={handleNumericChange}
                keyboardType="numeric"
                style={styles.input}
              />

              <Image
                source={{
                  uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/paymentdiya.png',
                }}
                style={styles.diyaImage}
              />

              <Text style={styles.confirmationText}>
                You will receive a personalized card confirming that your
                donation has been successfully processed. This card serves as an
                acknowledgment and a token of gratitude for your generous
                contribution.
              </Text>
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() =>
                  handleModalConfirm(
                    'Dakshina to Pandit',
                    parseFloat(customPrice) || 0,
                  )
                }>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={{justifyContent: 'flex-start'}}
            onPress={closeModal}>
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/panditji.png',
              }}
              style={styles.panditImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderDonateModal = () => (
    <Modal
      visible={modalVisible === 'Donate to Mandir'}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Donate to the Mandir!</Text>
          {renderPriceOptions('Donate to Mandir')}
          <TextInput
            placeholder="Add your preferred amount"
            value={customPrice}
            onChangeText={handleNumericChange}
            keyboardType="numeric"
            style={styles.input}
          />

          <Image
            source={{
              uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/paymentdiya.png',
            }}
            style={styles.diyaImage}
          />

          <Text style={styles.confirmationText}>
            You will receive a personalized card confirming that your donation
            to the Mandir has been successfully processed. This card serves as
            an official acknowledgment and a token of gratitude for your
            generous contribution.
          </Text>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() =>
              handleModalConfirm(
                'Dakshina to Pandit',
                parseFloat(customPrice) || 0,
              )
            }>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
          <View style={{width: '100%', justifyContent: 'flex-start'}}>
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/mandir.png',
              }}
              style={{width: '100%', height: 100, borderRadius: 8}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderBrahmanBhojModal = () => (
    <Modal
      visible={modalVisible === 'Brahman Bhoj'}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Brahman Bhoj!</Text>
          <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
                gap: 10,
              }}>
              {[
                {pandits: 2, price: 301},
                {pandits: 4, price: 601},
                {pandits: 6, price: 901},
                {pandits: 8, price: 1201},
              ].map(option => (
                <TouchableOpacity
                  key={option.price}
                  style={styles.bhojOption}
                  onPress={() =>
                    handleModalConfirm('Brahman Bhoj', option.price)
                  }>
                  <Text style={styles.bhojText}>{`${option.pandits} Pandit${
                    option.pandits > 1 ? 's' : ''
                  }`}</Text>
                  <Image
                    source={{
                      uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/panditji.png',
                    }}
                    style={styles.bhojImage}
                  />
                  <Text style={styles.bhojPrice}>₹{option.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{marginTop: 16, alignItems: 'center', width: '80%'}}>
              <TextInput
                placeholder="Enter custom price"
                value={customPrice}
                onChangeText={handleNumericChange}
                style={styles.input}
                keyboardType="numeric"
              />
            </View>
            <Image
              source={{
                uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/paymentdiya.png',
              }}
              style={styles.paymentImage}
            />
            <Text style={styles.confirmationText}>
              You will receive a personalized card and images confirming your
              Brahman Bhoj contribution as an acknowledgment and token of
              gratitude.
            </Text>
            <TouchableOpacity
              style={styles.doneButton} // Add your custom styles here
              onPress={() =>
                handleModalConfirm('Brahman Bhoj', parseFloat(customPrice) || 0)
              }>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const [templeDetails, setTempleDetails] = useState<any>(null);
  const [selectedPuja, setSelectedPuja] = useState<any>(null);
  const [poojaDate, setPoojaDate] = useState<string>('');
  const [poojaTime, setPoojaTime] = useState<string>('');
  const [packagePrice, setPackagePrice] = useState(0);

  useEffect(() => {
    const fetchPoojaAndTemple = async () => {
      try {
        const res = await fetch(`http://192.168.1.30:5001/fetch-all-pooja`);
        const data = await res.json();
        const puja = data.poojas.find((p: any) => p._id === pujaId);
        if (!puja) return;

        setSelectedPuja(puja);

        const mandirId = puja.mandirLists?.[0]?.mandirId;
        if (!mandirId) return;

        const templeRes = await fetch(
          `http://192.168.1.30:5001/fetch-mandir-by-id/${mandirId}`,
        );
        const templeJson = await templeRes.json();
        setTempleDetails(templeJson.mandir);

        const rawPoojaDate = puja.mandirLists?.[0]?.poojaMandirDates?.[0];
        setPoojaTime(puja.mandirLists?.[0]?.poojaMandirTime);
        if (rawPoojaDate) {
          const dateObject = new Date(rawPoojaDate);
          const formattedDate = `${dateObject.toLocaleDateString()}`;
          setPoojaDate(formattedDate);
        }

        // Set package price from the selected package
        if (packagename) {
          const selPkg = puja.mandirLists[0][packagename];
          if (selPkg) {
            setPackagePrice(selPkg.price);
          }
        }
      } catch (error) {
        console.error('Error fetching puja and temple details:', error);
      }
    };
    fetchPoojaAndTemple();
  }, [pujaId, packagename]);

  return (
    <>
      {selectedPuja && templeDetails ? (
        <View style={styles.wrapper}>
          <ScrollView contentContainerStyle={styles.container}>
            {/* Puja Booking Preview */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: '3%',
              }}>
              <AntDesign
                onPress={handleGoBack}
                name="arrowleft"
                size={23}
                color="black"
              />
              <Text style={styles.headerText}>Preview Puja Booking</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.title}>{selectedPuja.title}</Text>
              <Text style={styles.description}>
                {stripHtmlTagsAndDecode(selectedPuja.poojaCardBenefit)}
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#E1E0E0',
                  marginBottom: 10,
                }}></View>
              <View style={styles.row}>
                <Text style={styles.label}>Package:</Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#E1E0E0',
                    marginBottom: 10,
                  }}></View>
                <Text style={styles.value}>{packagename}</Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#E1E0E0',
                  marginBottom: 10,
                }}></View>
              <View style={styles.row}>
                <Text style={styles.label}>Date & Time of Puja:</Text>

                <Text style={styles.value}>{`${poojaDate}, ${poojaTime}`}</Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#E1E0E0',
                  marginBottom: 10,
                }}></View>
              <View style={styles.locationRow}>
                <Image
                  source={{
                    uri: 'https://img.icons8.com/ios-filled/50/000000/marker.png',
                  }}
                  style={styles.icon}
                />
                <Text style={styles.location}>{templeDetails.nameEnglish}</Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#E1E0E0',
                  borderStyle: 'dotted', // ✅ Makes the border dotted
                  marginBottom: 10,
                }}></View>

              <Text style={styles.price}>₹{packagePrice}/-</Text>
            </View>

            {/* Offering Items */}
            <Text style={[styles.headerText, {marginTop: 16}]}>
              Add More Offering Item
            </Text>
            {offeringItems.map(item => (
              <View key={item.id} style={styles.offeringCard}>
                <View style={{flex: 1, marginLeft: 12}}>
                  <Text style={styles.offeringTitle}>{item.title}</Text>
                  <Text style={styles.offeringDescription}>
                    {item.description}
                  </Text>
                </View>
                <View style={{position: 'relative'}}>
                  <Image
                    source={{uri: item.imageUri}}
                    style={styles.offeringImage}
                  />
                  <View style={{position: 'absolute', bottom: -15, left: 15}}>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => openModal(item.title)}>
                      <Text style={styles.addButtonText}>
                        {selectedOfferings.find(
                          offering => offering.id === item.id,
                        )
                          ? 'ADDED'
                          : 'ADD'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            <View>
              {/* Bill Details */}
              <Text style={[styles.headerText, {marginTop: 16}]}>
                Bill Details
              </Text>

              {renderBillDetails()}
            </View>
            {renderDakshinaModal()}
            {renderDonateModal()}
            {renderBrahmanBhojModal()}
          </ScrollView>
          <View style={styles.bottomSection}>
            <Text style={styles.totalText}>Total ₹{calculateTotalPrice()}</Text>
            <TouchableOpacity
              onPress={handleClick}
              style={styles.proceedButton}>
              <Text style={styles.proceedText}>Proceed &gt;&gt;&gt;</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text>Loading</Text>
      )}
    </>
  );
};

export default View_Puja_Booking;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    // flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    paddingLeft: '2%',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    // marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    // elevation: 4,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    borderColor: '#CFCECD',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  value: {
    fontSize: 14,
    color: '#FF7F00',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  location: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#476CE4',
    textAlign: 'left',
  },
  offeringCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  offeringImage: {
    width: 100,
    height: 90,
    borderRadius: 25,
  },
  offeringTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  offeringDescription: {
    fontSize: 14,
    color: '#555',
  },
  addButton: {
    backgroundColor: '#28A745',
    paddingVertical: 6,
    paddingHorizontal: 12,
    // borderRadius: 4,
    width: 70,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  billDetails: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 50,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billLabel: {
    fontSize: 14,
    color: '#333',
  },
  billValue: {
    fontSize: 14,
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDD',
    marginVertical: 8,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#DDD',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  proceedButton: {
    backgroundColor: '#FF7F00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    width: '60%',
    textAlign: 'center',
  },
  proceedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '98%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingTop: 16,
    alignItems: 'center',
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 16},
  priceButton: {
    backgroundColor: '#FF6505',
    borderRadius: 4,
    padding: 8,
    marginVertical: 4,
    alignItems: 'center',
  },
  priceButtonText: {color: '#FFF', fontSize: 16},
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 4,
    width: '80%',
    marginVertical: 8,
  },
  bhojOption: {
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    // justifyContent:'space-between',
    // gap:8,
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    width: '20%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bhojText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  bhojImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  bhojPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#28A745',
  },
  paymentImage: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
    marginTop: 16,
  },
  confirmationText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  doneButton: {
    backgroundColor: '#FF6505',
    borderRadius: 7,
    padding: 10,
    marginTop: 16,
    width: '30%',
    alignItems: 'center',
    marginBottom: '5%',
  },
  doneButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  diyaImage: {
    width: 250,
    height: 80,
    resizeMode: 'contain',
    // marginVertical: 16,
  },

  panditImage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    marginTop: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 5,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
});
