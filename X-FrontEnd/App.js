import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { CameraScreen } from "./screens/CameraScreen";
import { MainScreen } from "./screens/MainScreen";
import { UploadScreen } from "./screens/UploadScreen";
import { useEffect, useState } from "react";
import { ObjectsScreen } from "./screens/ObjectsScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from "expo-secure-store";
import axios from 'axios';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  // const [llm, setLLM] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const registerDev = async () => {
      let token = await SecureStore.getItemAsync("device_token");

      if (!token) {
        const res = await axios.post("https://api.dosguardx.com/register-device");
        const data = await res.data;
        await SecureStore.setItemAsync("device_token", data.token);
      }
    }
    registerDev();
  }, [])

  const [fontsLoaded] = useFonts({
    'Title-Font': require('./assets/fonts/Title-Font.ttf'),
    'Normal-Font': require('./assets/fonts/Normal-Font.ttf')
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    // Add loading component later
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#29518c"
          },
          headerTitleStyle: {
            fontFamily: 'Title-Font',
            color: 'white'
          }
        }}
      >
        <Stack.Screen name="Home">
          {(props) => <MainScreen {...props}
          // llm={llm} setLLM={setLLM} 
          />}
        </Stack.Screen>
        <Stack.Screen name="Camera">
          {(props) => <CameraScreen {...props} imageUri={imageUri} setImageUri={setImageUri}
          // llm={llm} 
          />}
        </Stack.Screen>
        <Stack.Screen name="Upload">
          {(props) => <UploadScreen {...props} imageUri={imageUri} setImageUri={setImageUri}
          //llm={llm} 
          />}
        </Stack.Screen>
        <Stack.Screen name="Objects" component={ObjectsScreen}
        // llm={llm} 
        />
        <Stack.Screen name="Result" component={ResultScreen}
        // llm={llm} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

