import React from 'react';
import {UserProvider} from './user/Provider/UserProvider.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {OnBoardingOne} from './components/OnBoardings/onBoardingOne-screen.tsx';
import {OnBoardingTwo} from './components/OnBoardings/onBoardingTwo-screen.tsx';
import {OnBoardingThree} from './components/OnBoardings/onBoardingThree-screen.tsx';
import {OnBoardingFour} from './components/OnBoardings/onBoardingFour-screen.tsx';
import {OnBoardingFive} from './components/OnBoardings/onBoardingFive-screen.tsx';
import {Main} from './components/Main/MainLayout.tsx';

const Stack = createStackNavigator();

export default function MainRoot() {
  return (
    <UserProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{headerShown: false, animationEnabled: false}}
              initialRouteName="onBoardOne">
              <Stack.Screen name="onBoardOne" component={OnBoardingOne} />
              <Stack.Screen name="onBoardTwo" component={OnBoardingTwo} />
              <Stack.Screen name="onBoardThree" component={OnBoardingThree} />
              <Stack.Screen name="onBoardFour" component={OnBoardingFour} />
              <Stack.Screen name="onBoardFive" component={OnBoardingFive} />
              <Stack.Screen name="MainLayout" component={Main} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
  );
}
