import React from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { Text, Icon } from "react-native-elements";

export default function header() {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require('../assets/SITE_Logo.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 95,
    paddingTop: 7,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#C0C0C0"
  },
  title: {
    // textAlign: "center",
    // verticalAlign: 'ceter',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'green',
  },
  logo:{
    height:70,
    width:200,
    resizeMode: 'stretch'
  }
});
