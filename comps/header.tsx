import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Icon } from "react-native-elements";

export default function header() {
  return (
    <View style={styles.header}>
      <Text h2 style={styles.title}>SITE BOQ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 20,
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
  }
});
