import { useState, useEffect } from "react";
import {
 StyleSheet,
 Text,
 View,
 FlatList,
 TouchableOpacity,
 SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const requestOptions = {
 method: "GET",
};

export default function App() {
 const [facts, setFacts] = useState();

 useEffect(() => {
  const fetchData = async () => {
   try {
    const res = await fetch(
     "https://cat-fact.herokuapp.com/#/cat/facts",
     requestOptions
    );
    const json = await res.json();
    setFacts([...json?.all]);
   } catch (error) {
    console.log(error);
    setFacts(error);
   }
  };

  fetchData();
 }, []);

 function Item({ title }) {
  return (
   <TouchableOpacity
    onPress={() => {
     console.log("button pressed");
    }}
   >
    <View style={styles.item}>
     <Text style={styles.item}>{title}</Text>
    </View>
   </TouchableOpacity>
  );
 }

 return (
  <SafeAreaView style={styles.container}>
   <FlatList
    data={facts}
    renderItem={(fact) => <Item title={fact?.item?.text} />}
    keyExtractor={(item, i) => `${item.id}${i}`}
   />
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
 },
 item: {
  color: "black",
  padding: 20,
  marginVertical: 8,
  marginHorizontal: 16,
 },
 title: {
  fontSize: 32,
 },
});
