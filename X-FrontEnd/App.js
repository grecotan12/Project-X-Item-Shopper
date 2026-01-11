import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { NavigationContainer } from "@react-navigation/native"; 
import { CameraScreen } from "./screens/CameraScreen";
import { MainScreen } from "./screens/MainScreen";
import { UploadScreen } from "./screens/UploadScreen";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [imageUri, setImageUri] = useState(null);

  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => <MainScreen {...props} imageUri={imageUri} setImageUri={setImageUri}/>}
        </Stack.Screen> 
        <Stack.Screen name="Camera">
          {(props) => <CameraScreen {...props} imageUri={imageUri} setImageUri={setImageUri}/>}
        </Stack.Screen> 
        <Stack.Screen name="Upload">
          {(props) => <UploadScreen {...props} imageUri={imageUri} setImageUri={setImageUri}/>}
        </Stack.Screen> 
      </Stack.Navigator> 
    </NavigationContainer>
  );
}

