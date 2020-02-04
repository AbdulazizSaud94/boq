import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

const nsList = ({ nsList, removeNs }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.listName}>Network & Storage Product List</Text>
      </View>
      <View>
        {nsList.length === 0 && (
          <Text style={styles.roew}>No NS items added</Text>
        )}
        {nsList.map((item: nsItem, index: number) => (
          <View key={index}>
            <Text>
              Number of IPs:{" "}
              <Text style={styles.unit}>{item.publicIp} IPs</Text> - Load
              Balancer & WAF:{" "}
              <Text style={styles.unit}>{item.loadBAndWaf} / Application</Text>{" "}
              - Internet Bandwith:{" "}
              <Text style={styles.unit}>{item.netBandwithGb} GB</Text> -
              Archive: <Text style={styles.unit}>{item.archiveGb} GB</Text> -
              Fileshare: <Text style={styles.unit}>{item.fileShareGb} GB</Text>
              {"  "}
              <TouchableOpacity style={styles.removeButton} onPress={removeNs}>
                <Text> Remove NS </Text>
              </TouchableOpacity>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default nsList;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 8
  },
  item: {
    width: 160
  },
  listName: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10
  },
  removeButton: {
    color: "#C42424",
    textDecorationLine: "underline",
    marginLeft: 15
  },
  unit: {
    color: "#04762C"
  },
  row: {
    flexDirection: "row",
    marginTop: 20
  }
});
