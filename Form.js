import { useNavigation, useRoute } from '@react-navigation/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

const FormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  let { name, age, personId } = route.params
  // seem we cannot duplicate param name so make it little diff
  const [nameInForm, sayMyName] = useState('');
  const [ageInForm, sayMyAge] = useState('');
  // this is pre-emptive check for update and create  bugs upon react refreshing 
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (name != null) {
      console.log("are got value name : [" + name + "]");
      if (name.length > 0 && nameInForm.length == 0 && counter == 0) {
        sayMyName(name);
        setCounter(counter + 1);
      } else {
        console.log("something wrong");
        console.log("name in form [" + nameInForm + "]")
      }
    } else {
      console.log(" name is nada ?")
    }
    if (age != null) {
      console.log("are got value age : [" + age + "]");

      if (age > 0 && ageInForm == 0 && counter == 0) {
        sayMyAge(age)
      }
    } else {
      console.log(" nada age ? ")
    }
  });
  // now we create save button  
  const submit = () => {
    // check all value first 
    console.log("Name : [" + nameInForm + ']');
    console.log("Age : [" + ageInForm + ']');
    console.log("person id  : [" + personId + ']');

    // if empty person id = create else update 
    let mode = "create";
    if (personId != null) {
      if (personId > 0) {
        mode = "update";
      }
    }
    // crate a form data  value 
    var formData = new FormData();

    formData.append("mode", mode);
    formData.append("name", nameInForm.toString());
    formData.append("age", ageInForm.toString());
    formData.append("personId", personId.toString());
    // copy axios url from prev list 
    const serverURL = Platform.OS == "ios" ? "localhost" : "10.0.2.2:80";
    let url = "http://" + serverURL + "/crud/api.php";

    axios.post(url, formData).then(function (output) {
      if (output.data.success == true) {
        navigation.navigate("List");
      } else {
        console.log("Something odd " + output.data);
      }
    }).catch(function (error) {
      console.log(error);
    });

  }
  return (
    <View style={{ padding: 10 }}>
      <Input placeholder="Name" value={nameInForm} onChangeText={text => sayMyName(text)} />
      <Input placeholder="Age" value={ageInForm} onChangeText={text => sayMyAge(text)} />
      <View style={{ paddingBottom: 10 }}>
        <Button title="Submit" onPress={() => submit()} />
      </View>
    </View>
  );
}
export default FormScreen;
