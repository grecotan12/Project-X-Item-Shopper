import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { NavigationContainer } from "@react-navigation/native"; 
import { CameraScreen } from "./screens/CameraScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Camera"> 
        <Stack.Screen name="Camera" component={CameraScreen}/> 
      </Stack.Navigator> 
    </NavigationContainer>
  );
}

