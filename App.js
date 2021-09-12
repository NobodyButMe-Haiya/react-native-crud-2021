import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormScreen from './Form'
import ListScreen from './List'
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="List" component={ListScreen} options={({ navigation }) => ({
          headerRight: () =>
            <Button title="Create"
              onPress={() =>
                navigation.navigate("Form", {
                  name: "",
                  age: "",
                  personId:""
                })} />,
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
