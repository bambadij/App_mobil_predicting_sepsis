import { StatusBar } from "expo-status-bar";
import { StyleSheet,Text,Dimensions,View,Image,TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import React, {useEffect, useState,useRef} from 'react';
import { MaterialIcons  ,FontAwesome } from '@expo/vector-icons';

const Home =({navigation}) => {

    const [currentStep, setCurrentStep] = useState(0)
    const scrollViewRef = useRef(null);

    const [ steps, setSteps] = useState([
      {
        image: require('../assets/sep.jpg'),
        title: "SEPSIS Prediction", 
        description: 'This app was built to predict if patients \n are Sepsis Positive or Sepsis Negative.',
        // description_fr:'La septicémie est une réponse inflammatoire généralisée suite à une infection grave.'
      },
      {
        image: require('../assets/machine.jpg'),
        title: "Machine Learning Model",
        description: "It use a machine learning model \n to make prediction based on patient",
        // description_fr:""
      },
      {
        image: require('../assets/notools.jpg'),
        title: "NOT A TOOL TO DIAGNOSE",
        description:'This app is not a diagnostic tool;\n it is for information purpose only',
        description_fr: "Cet outil n'est pas un outil de diagnosstic; \n il est uniquement destiné à des fins d'information."
      },
    ])

   
    const handleScroll = (event) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(offsetX / width);
      setCurrentStep(currentIndex);
    };
  
    const nextStep = () => {
      if (scrollViewRef.current && currentStep < steps.length - 1) {
        const nextIndex = currentStep + 1;
        setCurrentStep(nextIndex);
        scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
      }
    };
    const prevStep = () => {
      if (scrollViewRef.current && currentStep > 0) {
        const prevIndex = currentStep - 1;
        setCurrentStep(prevIndex);
        scrollViewRef.current.scrollTo({ x: prevIndex * width, animated: true });
      }
    };
    
    return (
      <SafeAreaView>
         <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={handleScroll}
          >
          <View style={styles.container}>
        <Image source={steps[currentStep].image} style={styles.stepImage} resizeMode="cover"/>
        <View style={styles.stepIndicatorView}>
          {steps.map((step, index) => {
            return (
              <View style={{...styles.stepIndicator, 
                width: currentStep === index ? 40 : 30,
                backgroundColor:  currentStep === index ? "#043c85" : "#d9dee3"
              }} key={index}></View>
            )
          })}
        </View>
        <Text style={styles.title}>{steps[currentStep].title}</Text>
        <Text style={styles.description}>{steps[currentStep].description}</Text>
        <View style={styles.navigationView}>
        {
            currentStep > 0 ? 
              <TouchableOpacity 
                onPress={() => prevStep()}
                style={{...styles.navigationBtn, borderTopEndRadius: 20, borderBottomEndRadius:20,}}>
                <Text style={styles.navigationBtnTxt}><FontAwesome name="arrow-left" size={30} color="#043c85" /></Text>
              </TouchableOpacity>
              :
              <View></View>
          }
            {/* <TouchableOpacity
                onPress={() => navigation.navigate('Home')} 
                
            >
                <Text style={{ ...styles.navigationBtnTxt, textAlign: 'center' }}>Ignorer</Text>
            </TouchableOpacity> */}
          {currentStep === steps.length - 1 ? (
          <TouchableOpacity
          onPress={() => navigation.navigate('Sepsis')}
            style={{ ...styles.navigationBtn, borderTopStartRadius: 20, borderBottomStartRadius: 20, textAlign: 'center' }}
          >
            <Text style={styles.navigationBtnTxt}><MaterialIcons name="done-outline" size={30} color="#043c85" /></Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={nextStep}
            style={{ ...styles.navigationBtn, borderTopStartRadius: 20, borderBottomStartRadius: 20 }}
          >
            <Text style={styles.navigationBtnTxt}><FontAwesome name="arrow-right" size={30} color="#043c85" /></Text>
          </TouchableOpacity>
        )}
        </View>
      </View>
        </ScrollView>
        </SafeAreaView>
    );
  }
  

export default Home
const { width,height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepImage:{
        width:width,
        height:height *0.6,
        marginVertical:10
    },
    stepIndicatorView:{
        flexDirection:"row"
    },
    stepIndicator:{
        height:10,
        marginHorizontal:5,
        borderRadius:10
    },
    title:{
        fontWeight:"bold",
        fontSize:14,
        marginVertical:13,
    },
    description:{
        textAlign:"center",
        paddingHorizontal:8,
        fontSize:12
    },
    navigationBtn:{
        // backgroundColor:"#043c85",
        height:40,
        width:80,
        justifyContent:"center",
        alignItems:"center",
    },
    navigationBtnTxt:{
        color:'white',
        fontWeight:"bold"
    },
    navigationView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      },
  });