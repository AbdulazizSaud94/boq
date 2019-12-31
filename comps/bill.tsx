import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Modal,
  TouchableOpacity
} from "react-native";
import VmList from "./reqComps/vmList";
import NsList from "./reqComps/nsList";

const bill = ({ vmList, nsList, removeVm, removeNs, prices }) => {
  const [vmPrice, setVmPrice] = useState(0);
  const [nsPrice, setNsPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  return (
    <View>
      {vmList.map((item: vmItem, index: number) => (
        <View key={index}>
          <Text>
            {item.os} - {item.item} - {item.backup} - {item.recovery} -{" "}
            {item.qty} - {item.storage} GB {"  "}
            <TouchableOpacity style={styles.removeButton} onPress={removeVm}>
              <Text> Remove VM </Text>
            </TouchableOpacity>
          </Text>
        </View>
      ))}
      <NsList nsList={nsList} removeNs={removeNs} />
      <Text>{prices.exchangeStndard}</Text>
    </View>
  );
};

export default bill;
const styles = StyleSheet.create({
  inputBox: {
    width: 200,
    height: 35,
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8,
    marginBottom: 15
  }
});
