import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

async function getList() {
  try {
    const serverURL = Platform.OS == "ios" ? "localhost" : "10.0.2.2:80";
    let url = "http://" + serverURL + "/crud/api.php?mode_get=read";
    const { data: response } = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("No ashame : " + error);
  }
}

const ListScreen = () => {
  const navigation = useNavigation();
  let [listDataFromServer, defineMeTheList] = useState([]);
  useEffect(() => {
    let mounted = true
    navigation.addListener("focus", () => {
      getList().then(items => {
        console.log(items);
        defineMeTheList(items);
      });
    })
    return () => mounted = false;

  });
  const formPage = ((row) => {
    navigation.navigate("Form", {
      name: row.name,
      age: row.age,
      personId: row.personId
    })
  });
  const deleteMe = ((row) => {
    console.log("delete me.. React native dam hard !");

    var formData = new FormData();

    formData.append("mode", "delete");
    formData.append("personId", row.personId);
    // copy axios url from prev list 
    const serverURL = Platform.OS == "ios" ? "localhost" : "10.0.2.2:80";
    let url = "http://" + serverURL + "/crud/api.php";

    axios.post(url, formData).then(function (output) {
      if (output.data.success == true) {
        // it's odd but we cannot refresh to own or maybe i  don't know 
        //so 
        defineMeTheList(listDataFromServer.filter(item => item.personId != row.personId));
      } else {
        console.log("Something odd " + output.data);
      }
    }).catch(function (error) {
      console.log(error);
    });


  })
  const anyData = () => {
    return (<View>{
      listDataFromServer.map((row) => (
        <ListItem.Swipeable key={row.personId} bottomDivider
          onPress={() => formPage(row)}
          rightContent={
            <Button title="Delete me" buttonStyle={{ minHeight: '100%', backgroundColor: "red" }}
              onPress={() => deleteMe(row)} />}>
          <ListItem.Content>
            <ListItem.Title>{row.name}</ListItem.Title>
            <ListItem.Subtitle>{row.age}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem.Swipeable>
      ))
    }</View>)
  }
  const emptyData = () => {
    return (<View><Text style={{ color: "red" }}>We nada record </Text></View>)
  }
  return (<View style={{ padding: 10 }}>
    <Text style={{ padding: 10 }}>On android  we press double rr and in ios should command r  but just now not sure. </Text>
    <Text>So this is the end crud . a github repo will be at the below link </Text>
    <Text>The next is CRUD backend either PHP or ASP.net Core (Don't worried .. it just like old webform QueryString and Form)
    </Text>
    {(listDataFromServer?.length > 0) ? anyData() : emptyData()}
  </View>)
}
export default ListScreen;