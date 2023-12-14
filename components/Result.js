import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, Alert ,  Dimensions,ScrollView
} from 'react-native'
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

// import { Entypo,Ionicons,FontAwesome5 } from '@expo/vector-icons';

const Result = (props) => {
  console.log('item',props);
  const sepsisStatus = props.route.params.Sepsis;
  const badgeStyle = sepsisStatus === 'Negative' ? styles.warningBadge : styles.dangerBadge;  
  const tableHead = ['PRG', 'PL', 'PR', 'M11', 'SK', 'BD2', 'TS', 'Age', 'Insurance'];
  const tableData = [
    [
      props.route.params.PRG,
      props.route.params.PL,
      props.route.params.PR,
      props.route.params.M11,
      props.route.params.SK,
      props.route.params.BD2,
      props.route.params.TS,
      props.route.params.Age,
      props.route.params.Insurance,
    ],
  ];

  return (
    <ScrollView style={styles.scroll}>
        <View style={{ marginHorizontal: 15}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10,alignItems:'center' }}>Infos</Text>
        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={tableHead} style={{ height: 40, backgroundColor: '#f1f8ff' }} textStyle={{ margin: 2 }} />
          <Rows data={tableData}  textStyle={{ margin: 1 }} />
        </Table>
        </View>
        <View style={styles.container}>
            {props.route.params.Sepsis === 'Positive' ? (
              <Image
              style={styles.stepImage} resizeMode="cover"
                source={require('../assets/stopn.jpg') }
              />
            ):(
          <Image
            style={styles.icon}
            source={{ uri: 'https://img.icons8.com/color/70/000000/facebook-like.png' }}
          />
      )}
        <View style={styles.description}>
          <Text style={styles.description}>
          Result: <Text style={badgeStyle}>{sepsisStatus}</Text>
          </Text>
        </View>
      <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={(() => props.navigation.navigate('Sepsis'))}>
        <Text style={styles.buttonText}>Try Again </Text>
      </TouchableOpacity>
    </View> 
    </ScrollView>
  )
}
const {width, height} = Dimensions.get('window');
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  navigationStackBar: {
    // flexDirection: 'row',
     height: height,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  btnBack: {
    position: 'absolute',
    left: -1,
    zIndex: 99,
    marginLeft:3,
  },
  head: {  
    height: 40, 
    backgroundColor: '#f1f8ff',
},
wrapper: { 
    flexDirection: 'row',
},
stepImage:{
  width:width*0.9,
  height:height *0.3,
  // marginVertical:1
},
title: { 
    flex: 1, 
    backgroundColor: '#f6f8fa',
},
  stackBarTitle: {
    position: 'absolute',
     width: screenWidth,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    // height: 0,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnActive: {
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 5,
  },
  container: {
    flex: 1,
    // 0backgroundColor: '#EEEEEE',
    alignItems: 'center',
    paddingTop: 50,
  },
  scroll: {
    width: width,
  },
    row: {  
        height: 28,  
    },
  icon: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 1,
    color: '#5F6D7A',
  },
  description: {
    marginTop: 10,
    textAlign: 'center',
    color: '#A9A9A9',
    fontSize: 16,
    margin: 40,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#043c85',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  warningBadge: {
    color: 'orange',
    fontWeight: 'bold',
  },
  dangerBadge: {
    color: 'red', 
    fontWeight: 'bold',
  },
})
export default Result;