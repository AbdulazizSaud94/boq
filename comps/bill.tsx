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
  let totalVm: number = 0;

  vmList.map(
    (item: vmItem, index: number) => (totalVm = Number(item.price) + totalVm)
  );
  const [totalPrice, setTotalPrice] = useState(totalVm);
  return (
    <View>
      <Text style={styles.listHeadr}>
        OS || PaaS - Item - Backup - Recovery - Quatity - Storage
      </Text>
      {vmList.length === 0 && <Text style={styles.roew}>No VMs Added</Text>}
      {vmList.map((item: vmItem, index: number) => (
        <View key={index}>
          <Text>
            {item.os} - {item.item} - {item.backup} - {item.recovery} -{" "}
            {item.qty} - {item.storage} GB {"  "} price:{" "}
            <Text style={styles.amount}>({item.price} SAR)</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => {
                setTotalPrice(totalPrice - Number(item.price));
                removeVm(index);
              }}
            >
              <Text> Remove VM </Text>
            </TouchableOpacity>
          </Text>
        </View>
      ))}
      <Text>Total Price of VMs= <Text style={styles.amount}>{totalPrice.toFixed(2)} SAR</Text></Text>
      <NsList nsList={nsList} removeNs={removeNs} />
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
  },
  removeButton: {
    color: "#C42424",
    textDecorationLine: "underline",
    marginLeft: 15
  },
  amount: {
    color: "green"
  },
  listHeadr: {
    fontWeight: "bold",
    marginBottom: 5
  }
});
