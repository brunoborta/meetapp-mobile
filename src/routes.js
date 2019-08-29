import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Profile from './pages/Profile';

const signRoute = createSwitchNavigator({
  SignIn,
  SignUp,
});

const appRoute = createBottomTabNavigator(
  {
    Dashboard,
    Subscriptions,
    Profile,
  },
  {
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
      style: {
        backgroundColor: '#2B1A2F',
      },
    },
  }
);

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        signRoute,
        appRoute,
      },
      {
        initialRouteName: isSigned ? 'appRoute' : 'signRoute',
      }
    )
  );
