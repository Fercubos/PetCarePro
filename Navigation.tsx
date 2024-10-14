//Navigation
//npm i @react-navigation/native
//npm i @react-navigation/stack

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Button, View } from 'react-native';
// the packahge we are using for navigation uses a native navigation stack 

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={NavRoot} />
        <Stack.Screen name="Login" component={NavExample} />
        <Stack.Screen name="Register" component={NavExample2} />
        {/* <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Pets" component={Pets} />
        <Stack.Screen name="AddPet" component={AddPet} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function NavRoot(navigation : any){
    return(
        <view>
            <text>Hi from navigaiton </text>
            <Button title="Login" 
            onPress={()=>
            navigation.navigate('NavExample2')} />
            <Button title="Login" 
            onPress={()=>
            navigation.navigate('NavExample2', {data: 'some data'})
            } />
        </view>
    );
}
function NavExample(){
    return(
        <view>
            <text>Hi from navigaiton </text>
        </view>
    );
}
function NavExample2({navigation, route} : any){
    return(
        <view>
            <text>Nav example 2 . Some data : {route.params.data}</text>
        </view>
    );
}