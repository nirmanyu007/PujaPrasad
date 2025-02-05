import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface CountdownProps {
  targetDate: string; // Expected format: 'YYYY-MM-DDTHH:MM:SS'
}

export const CountdownTimer: React.FC<CountdownProps> = ({targetDate}) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {days: 0, hours: 0, minutes: 0, seconds: 0};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F3DA91']}
      style={styles.gradientContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Puja booking will close in:</Text>
        <View style={styles.timeContainer}>
          <View style={styles.box}>
            <Text style={styles.value}>{timeLeft.days}</Text>
            <Text style={styles.label}>Day</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.value}>{timeLeft.hours}</Text>
            <Text style={styles.label}>Hours</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.value}>{timeLeft.minutes}</Text>
            <Text style={styles.label}>Mins</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.value}>{timeLeft.seconds}</Text>
            <Text style={styles.label}>Secs</Text>
          </View>
        </View>
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/pooja-images/diyasvg.svg',
          }}
          // style={styles.image}
        />
      </View>
      
        <Image
          source={{
            uri: 'https://vedic-vaibhav.blr1.cdn.digitaloceanspaces.com/vedic-vaibhav/Puja-Prasad-App/HomePage/diaaa.png',
          }}
          style={{height:100,width:50,position:'absolute',right:20,bottom:0}}
          // style={styles.image}
        />
      
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,.2)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    position:'relative',
  },
  container: {
    // backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    // textAlign: 'center',
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 1,
  },
  box: {
    backgroundColor: '#EAC042',
    borderRadius: 8,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    marginRight:10
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  label: {
    fontSize: 12,
    marginTop: 2,
    color: 'black',
  },
  //   image: {
  //     alignSelf: 'center',
  //     marginTop: 10,
  //     width: 50,
  //     height: 50,
  //     resizeMode: 'contain',
  //   },
});

// Usage Example:
// <CountdownTimer targetDate="2025-12-31T23:59:59" />
