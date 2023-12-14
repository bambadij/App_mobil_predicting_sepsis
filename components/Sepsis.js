import React, { useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Pressable,
  ActivityIndicator,
  StyleSheet ,ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const Sepsis = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [PR, setPR] =useState('');
  const [PRG,setPRG] =useState('');
  const [PL,setPL] =useState('');
  const [SK,setSK] =useState('');
  const [TS,setTS] =useState('');
  const [M11,setM11] =useState('');
  const [BD2,setBD2] =useState('');
  const [Age,setAge] =useState('');
  const [Insurance,setInsurance] =useState('');

  const onChangePRhandler = pr => {
    setPR(pr);
  }
  const onChangePRGhandler = prg => {
    setPRG(prg);
  }
  const onChangePLhandler = pl => {
    setPL(pl);
  }
  const onChangeSKhandler = sk =>{
    setSK(sk);
  }
  const onChangeTShandler = ts =>{
    setTS(ts)
  } 

  const onChangeM11handler =m11 => {
    setM11(m11);
  }
  const onChangeBD2handler = bd2 => {
    setBD2(bd2);
  }
  const onChangeAgehandler = age => {
    setAge(age);
  }
  const onSubmitFormHandler = async() => {
    const data = {
      PRG,PR,PL,SK,TS,BD2,M11,Age,Insurance
    }
    setIsLoading(true);
    try {
      await
          // Replace http://127.0.0.1:8000/predict with your api online
        axios.post(`http://127.0.0.1:8000/predict`,data,{
          headers: {
            'Content-Type': 'application/json',
          },
           
        })
        .then(res => {
          console.log('response status:', res.status);  // Statut HTTP
          console.log('response data:', res.data.predictions[0]);   
          if(res.status ==200){
            setPR('')
            setPRG('')
            setPL('')
            setAge('')
            setBD2('')
            setM11('')
            setInsurance('')
            setSK('')
            setTS('')
            navigation.navigate('Result',res.data.predictions[0])
            setIsLoading(false);
          }
          
        })
    } catch (error) {
      if(error.request.status == 422){
        Toast.show({
          type:'error',
          text1: 'An valodation error occurred',
          text2:'Error',
          autoHide:true,
          visibilityTime:5000,
          position:'top',
          bottomOffset:50,
          topOffset:100,
          // backgroundColor:'#66a5f5'
        })
      }
      console.log('error',error.request.status)
      setIsLoading(false);
    }
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          name="PRG"
          placeholder="Plasma Glucose (PRG)"
          selectionColor="#a9a9a9"
          autoCapitalize="none"
          // textDecorationLine="underline"
          underlineColorAndroid="transparent"
          color="black"
          keyboardType="numeric"
         value={PRG}
         onChangeText={onChangePRGhandler}
        />
        <TextInput
          style={styles.input}
          name="PL"
          placeholder="Blood Work Result-1 (mu U/ml)"
          selectionColor="#a9a9a9"
          autoCapitalize="none"
          // textDecorationLine="underline"
          underlineColorAndroid="transparent"
          color="black"
          keyboardType="numeric"
          value={PL}
          onChangeText={onChangePLhandler}
        />
         <TextInput
            style={styles.input}
            placeholder="Blood Pressure (mm Hg)"
            name="PR"
            selectionColor="#a9a9a9"
            underlineColorAndroid="transparent"
            color="black"
            autoCapitalize="none"
            keyboardType="numeric"
            value={PR}
            onChangeText={onChangePRhandler}
          />
          <TextInput
            style={styles.input}
            placeholder="Blood Work Result-2 (mm)"
            name="SK"
            selectionColor="#a9a9a9"
            underlineColorAndroid="transparent"
            color="black"
            autoCapitalize="none"
            keyboardType="numeric"
            value={SK}
            onChangeText={onChangeSKhandler}
          />
            <TextInput
            style={styles.input}
            placeholder="TS-Blood Work Result-3 TS (mm)"
            name="TS"
            selectionColor="#a9a9a9"
            underlineColorAndroid="transparent"
            color="black"
            autoCapitalize="none"
            keyboardType="numeric"
            value={TS}
            onChangeText={onChangeTShandler}
          />
           <TextInput
          style={styles.input}
          name="M11"
          placeholder="Body Mass Index (weight in kg/(height in m)^2)"
          selectionColor="#a9a9a9"
          autoCapitalize="none"
          // textDecorationLine="underline"
          underlineColorAndroid="transparent"
          color="black"
          value={M11}
          keyboardType="numeric"
          onChangeText={onChangeM11handler}
        />
            <TextInput
          style={styles.input}
          name="BD2"
          placeholder="BD2: Blood Work Result-4 (mu U/ml)"
          selectionColor="#a9a9a9"
          autoCapitalize="none"
          // textDecorationLine="underline"
          underlineColorAndroid="transparent"
          color="black"
          value={BD2}
          keyboardType="numeric"
          onChangeText={onChangeBD2handler}
        />
          <TextInput
          style={styles.input}
          name="Age"
          placeholder="Patient's Age (years)"
          selectionColor="#a9a9a9"
          autoCapitalize="none"
          // textDecorationLine="underline"
          underlineColorAndroid="transparent"
          color="black"
          value={Age} 
          keyboardType="numeric"
          onChangeText={onChangeAgehandler}
        />
        <View style={styles.input}>
          <Picker
            selectedValue={Insurance}
            onValueChange={itemValue => setInsurance(itemValue)}
            // onValueChange={handleSubjectChange}
            mode="dropdown"
            style={styles.dropdown}>
            <Picker.Item
              label="Patient insurance"
              style={styles.pocker}
            />
            <Picker.Item label="Insurant" value="1" />
            <Picker.Item label="No Insurant" value="0" />
          </Picker>
        </View>  
        <View>
        </View>
        <Pressable
          onPress={onSubmitFormHandler}
          style={() => [
            {
              backgroundColor: isLoading ? '#a9a9a9' : '#043c85',
            },
            styles.buttonConnexion,
          ]}>
          {() => (
            <Text style={{color: '#fff', textAlign: 'center'}}>
              {isLoading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                'Predict Now'
              )}
            </Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

const {width, height} = Dimensions.get('window');
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor:'#8fba82'
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    // padding: 20,
    marginTop: 50,
     width: '90%',
     marginLeft:15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBtnContainer:{
    opacity:0.7,
    position:'absolute',
    right:0,
    bottom:0,
    backgroundColor:'lightgrey',
    width:'100%',
    height:'25%',
},
uploadBtn:{
    display:'flex',
    alignItems:"center",
    justifyContent:'center'
},
  image: {
    height: 50,
    width: 50,
    borderRadius: 40,
    marginBottom: 10,
  },
  scroll: {
    width: width,
  },
  text: {
    marginVertical: height * 0.05,
    width: width * 0.8,
    fontSize: 12,
  },
  text_deco: {
    color: 'red',
    textDecorationLine: 'underline',
  },
  input: {
    marginTop: height * 0.035,
    width: width * 0.8,
    height:50 ,
    padding: 10,
    fontSize: 13,
    borderRadius: 5,
    borderWidth: 0.5,
    justifyContent: 'center',
    borderColor: 'black',
    color:'gray'
  },
  inputimg: {
    marginTop: height * 0.015,
    width: width * 0.8,
    height:50 ,
    padding: 10,
    fontSize: 10,
    // borderRadius: 1,
    // borderWidth: 0.5,
    justifyContent: 'center',
  },
  inputjt: {
    marginTop: height * 0.035,
    width: width * 0.8,
    height:50 ,
    padding: 5,
    fontSize: 16,
    borderRadius: 1,
    borderWidth: 0.1,
    justifyContent: 'center',
  },
  textArea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 16,
    padding: 10,
    width: width* 0.8,
    marginTop: height * 0.015,
    borderRadius: 5,
    
  },
  icon: {
    position: 'absolute',
    right: '3%',
    elevation: 7,
    top: '30%',
    color: 'gray',
  },
  buttonConnexion: {
    marginTop: height * 0.05,
    width: width * 0.8,
    height: 50,
    fontSize: 16,
    borderRadius: 5,
    justifyContent: 'center',
  },
  terme_button: {
    width: width * 0.8,
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0.16,
  },
  dropdown: {},
  pocker: {
    color: 'gray',
  },
  error: {
    justifyContent: 'center',
    textAlign: 'center',
    color: 'red',
    fontSize: 12,
  },
  success: {
    color: 'green',
    fontSize: 12,
  },
});

export default Sepsis;
