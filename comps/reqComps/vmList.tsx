import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

const vmList = ({ vmList, removeVm }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.listName}>Virtual Machine List</Text>
      </View>
      <View>
        {vmList.length > 0 && (
          <Text style={styles.listHeadr}>
            QTY - Size - OS - Storage - Backup - DR
          </Text>
        )}
        {vmList.length === 0 && <Text style={styles.roew}>No VMs Added</Text>}
        {vmList.map((item: vmItem, index: number) => (
          <View key={index}>
            <Text>
              {item.qty}   -   {item.item}   -   {item.os}   -   {item.storage} GB   -   {item.backup}   -   {item.recovery}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeVm(index)}
              >
                <Text> Remove VM </Text>
              </TouchableOpacity>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default vmList;
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
    fontSize: 18,
    marginBottom: 10
  },
  removeButton: {
    color: "#C42424",
    textDecorationLine: "underline",
    marginLeft: 15
  },
  listHeadr: {
    color: "#04762C",
    fontWeight: "bold",
    marginBottom: 5
  },
  row: {
    flexDirection: "row",
    marginTop: 20
  }
});
