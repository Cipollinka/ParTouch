import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {UserProvider} from './src/user/Provider/UserProvider.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {Loader} from './src/components/OnBoardings/lodaer-screen.tsx';
import {OnBoardingOne} from './src/components/OnBoardings/onBoardingOne-screen.tsx';
import {OnBoardingTwo} from './src/components/OnBoardings/onBoardingTwo-screen.tsx';
import {OnBoardingThree} from './src/components/OnBoardings/onBoardingThree-screen.tsx';
import {OnBoardingFour} from './src/components/OnBoardings/onBoardingFour-screen.tsx';
import {OnBoardingFive} from './src/components/OnBoardings/onBoardingFive-screen.tsx';
import {Main} from './src/components/Main/MainLayout.tsx';
import { DecisionWheelScreen } from "./src/components/DecisionWheelScreen/decision-wheel-screen.tsx";

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, animationEnabled: false}}
          initialRouteName="Loader">
          <Stack.Screen name="Loader" component={Loader} />
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

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: "600"
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: "400"
//   },
//   highlight: {
//     fontWeight: "700"
//   }
// });

export default App;
