import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import StandardPuja from '../Component/StandardPuja';
import PersonalizedPuja from '../Component/PersonalizedPuja';
import PujaNavbar from '../Component/PujaNavbar';

const PujaPage = () => {
  const [activeTab, setActiveTab] = useState<'standard' | 'personalized'>(
    'standard',
  );

  const renderContent = () => {
    if (activeTab === 'standard') {
      return <StandardPuja />;
    }
    if (activeTab === 'personalized') {
      return <PersonalizedPuja/>
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.duing}>
        <PujaNavbar />
        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'standard' && styles.activeTab]}
            onPress={() => setActiveTab('standard')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'standard' && styles.activeTabText,
              ]}>
              Standard Puja
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'personalized' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('personalized')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'personalized' && styles.activeTabText,
              ]}>
              Personalized Puja
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
  },
  duing:{
    width: '100%',
    paddingHorizontal: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    // marginHorizontal: '4%',
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    width:'100%'
  },
  tab: {
    // flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width:'50%'
  },
  activeTab: {
    backgroundColor: '#FF8901',
  },
  tabText: {
    color: '#000',
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#000',
  },
});

export default PujaPage;
