import React from 'react';
import HomePage from '../Screens/HomePage';
import Detail from '../Screens/Detail';
import Navigation from './Navigation';
import Serach from '../Screens/Search';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator headerMode="screen">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <Navigation navigation={navigation} main={true} />
            ),
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTransparent: true,
            header: ({navigation}) => <Navigation navigation={navigation} />,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Serach}
          options={{
            headerTransparent: true,
            header: ({navigation}) => <Navigation navigation={navigation} />,
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
