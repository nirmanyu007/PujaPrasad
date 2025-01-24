import { View, Text } from 'react-native'
import React from 'react'

const Congratulation = () => {
  return (
    <View style={{display:'flex', justifyContent:'center', alignItems:'center',margin:'auto',width:'100%'}}>
      <Text style={{fontSize:24, fontWeight:700,color:'black'}}>Congratulation</Text>
      <Text style={{fontSize:14, paddingTop:'1%',color:'black'}}>Your request has been sent to Mandir.</Text>
      <Text style={{fontSize:12, fontWeight:700, paddingTop:'5%',textAlign:'center',color:'black',width:'75%'}}>
        We will notify you shortly once the Mandir confirms your booking. Thank
        you for your patience!"
      </Text>
    </View>
  );
}

export default Congratulation