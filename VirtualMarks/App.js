import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Provider } from 'react-native-paper';
import AuthContext, { AuthProvider } from './src/context/AuthContext';
import { useContext } from 'react';
import AuthNav from './navigation/AuthNav';
import { View } from 'react-native';
import Home from './src/screens/Home';


export default function App() {

  return (
    <Provider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <BottomAndAuthNav />
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
}



const BottomAndAuthNav = () => {
  const { auth, loading } = useContext(AuthContext)

  return (

    <>
      {loading == true ?
        <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', marginBottom: 100 }}>
          <ActivityIndicator animating={true} color="#738290" />
        </View>
        :
        <>
          {auth?.token != null ?
            <Home />
            :
            <AuthNav />
          }
          {/* <Home /> */}
          {/* <AuthNav /> */}
        </>
      }
    </>
  )
}
