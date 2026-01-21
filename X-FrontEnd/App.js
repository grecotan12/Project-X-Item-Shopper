import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { CameraScreen } from "./screens/CameraScreen";
import { MainScreen } from "./screens/MainScreen";
import { UploadScreen } from "./screens/UploadScreen";
import { useState } from "react";
import { ObjectsScreen } from "./screens/ObjectsScreen";
import { ResultScreen } from "./screens/ResultScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const [llm, setLLM] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => <MainScreen {...props} llm={llm} setLLM={setLLM} />}
        </Stack.Screen>
        <Stack.Screen name="Camera">
          {(props) => <CameraScreen {...props} imageUri={imageUri} setImageUri={setImageUri} />}
        </Stack.Screen>
        <Stack.Screen name="Upload">
          {(props) => <UploadScreen {...props} imageUri={imageUri} setImageUri={setImageUri} />}
        </Stack.Screen>
        <Stack.Screen name="Objects" component={ObjectsScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

