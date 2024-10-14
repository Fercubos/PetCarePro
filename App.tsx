import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button,Image } from 'react-native';
import { useState } from 'react';
import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import{
  initializeAuth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  UserCredential, 
  getReactNativePersistance
}from'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
}from 'firebase/firestore';
import{
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
}from 'firebase/storage';

//Reason  to use enviroment variables
//Not uploading api keys /ids of any sort 



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID ,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId:  process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId:process.env.EXPO_PUBLIC_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// const auth = initializeAuth(
//   app, 
//   { persistence: getReactNativePersistance(ReactNativeAsyncStorage) }
// );
export default function AppNavigation() {
  return (
    <Navigation/>
  );
}
export default function App() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [imageURL, setImageURL] = useState('');

  //target - get image URL from firebase to display in the app
  //option 1 - use simple  route from bucket 

  var puppyRef = ref(storage, 'ejemplo/puppy.jpg');
  getDownloadURL(puppyRef)
  .then(url => {
    console.log('URL of the image: ', url);
    setImageURL(url);
  })
  .catch(error => {
    console.log('Error getting image URL', error);
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in'+ user.email);
    } else {
      console.log('Logged Out');
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />


      <TextInput
        placeholder='email'
        onChangeText={text => 
          setEmail(text)}
      />
        <TextInput
          placeholder='password'
          secureTextEntry={true}
          onChangeText={text => 
            setPassword(text)}
      />
      <Button
        title='Sign Up'
        onPress={async () => {
          //Thhis method reutnr a promise (as some asaync mehtods do)
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential: UserCredential) => {
            console.log("User Created" + userCredential.user);
          })
          .catch((error : any) => {
            if (error.code === 'auth/weak-password') {
              console.log('Thatpassword is CRAPPY');
            }
            console.log("Error" + error.message + "" +error.code );
          });
        }}
      />

      <View>
        <Button
          title='Sign In'
          onPress={async () => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: UserCredential) => {
              console.log("User Signed In" + userCredential.user);
            })
            .catch((error : any) => {
              console.log("Error" + error.message + "" +error.code );
            })
          }}
        />

        <Button
          title='Log Out'
          onPress={async () => {
            console.log('Logging Out');
            auth.signOut();
          }}
        />
      </View>

      <TextInput
        placeholder='name'
        onChangeText={text => 
          setName(text)}
      />
      <TextInput
        placeholder='breed'
        onChangeText={text => 
          setBreed(text)}
      />
      <Button
        title = 'Add'
        onPress={async () => {
          try {
            //try code block 
            //code that migt be risky can be run within the try block
            //risky means that it can raise an exception
            //intention is to deal with exceptions gracefully
            //{Fail gracefully}
            //How is data arrenged in forestore
            //collection -> document -> data
            //can think of is as a table in relational db 
            //documents- think of them as rows in table
            // get a referece 
            var perritosCollection = collection(db, 'perritos');

            const newDoc = await addDoc(
              perritosCollection,
              {
              name: name,
              breed: breed
            });
            console.log('Id of the new perrito: ', newDoc.id);

          }catch (error) {
            console.log('Exception when trying to add an animal' + error);
          }
        }} 
      />
      <Button
        title = 'get all'
        onPress={async () => {
          var snapshot = await getDocs(collection(db, 'perritos'));
          snapshot.forEach((currentDocument) => {
            console.log(currentDocument.data());
          });
        }} 
      />
      <Button
        title = 'Query'
        onPress={async () => {
        }} 
      />
      {
        imageURL !="" ?
        <Image
          style={{width: 100, height: 100}}
          source={{uri: imageURL}}
        />
        :
        <Text>Image not available</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
