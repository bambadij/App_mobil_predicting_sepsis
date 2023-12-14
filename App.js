import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home'
import Sepsi from './components/Sepsi';
import Sepsis from './components/Sepsis';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Result from './components/Result';
import  Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#043c85',
            },
            headerTintColor: '#FFF',
            headerBackTitle: 'Back',
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen 
           options={{ title: 'Home', animation: 'slide_from_bottom' }}
          name="Home" component={Home} />

          <Stack.Screen
            options={{ title: 'Sepsis Predicting', animation: 'slide_from_bottom' }}
            name="Sepsis"
            component={Sepsis}
          />
          <Stack.Screen
            options={{ title: 'Result Predicting', animation: 'slide_from_bottom' }}
            name="Result"
            component={Result}
          />
        </Stack.Navigator>
        <Toast/>
      </NavigationContainer>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
