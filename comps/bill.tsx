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
import {t1} from './getPrice';
const bill = ({ vmList, nsList, removeVm, removeNs, prices }) => {
  let totalVm: number = 0;
  let totalNs: number = 0;

  vmList.map(
    (item: vmItem, index: number) => (totalVm = Number(item.price) + totalVm)
  );

  nsList.map(
    (item: nsItem, index: number) => (totalNs = Number(item.price) + totalNs)
  );
  const [totalVmPrice, setTotalVmPrice] = useState(totalVm);
  const [totalNsPrice, setTotalNsPrice] = useState(totalNs);

  const calculatePricePerItem = (os, size, qty, backup, recovery, storage) => {
    let fRecovery: number = 0;
    let fVmPrice: number = prices[os + item];
    let fStorage: number = storage * prices.storage;
    let fBackup: number = prices["backup" + backup];
    if (recovery === "Yes") {
      fRecovery += prices.disasterRecovery;
    }
    let totalPrice: number = (fVmPrice * qty).toFixed(2);
    return totalPrice;
  };
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.listName}>Virtual Machine List</Text>
      </View>
      <Text style={styles.listHeadr}>
        OS || PaaS - Item - Backup - Recovery - Quatity - Storage
      </Text>
      {vmList.length === 0 && <Text style={styles.row}>No VMs Added</Text>}
      {vmList.map((item: vmItem, index: number) => (
        <View key={index}>
          <Text>
            {item.os} - {item.item} - {item.backup} - {item.recovery} -{" "}
            {item.qty} - {item.storage} GB {"  "} price:{" "}
            <Text style={styles.amount}>({item.price} SAR)</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => {
                setTotalVmPrice(totalVmPrice - Number(item.price));
                removeVm(index);
                t1();
              }}
            >
              <Text> Remove VM </Text>
            </TouchableOpacity>
          </Text>
        </View>
      ))}
      <Text style={{ marginTop: 20 }}>
        Price All of VMs={" "}
        <Text style={styles.amount}>
          {totalVmPrice.toFixed(2)} SAR{" "}
          <Text style={{ color: "black" }}>Monthly</Text>
        </Text>
      </Text>
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
              <Text style={styles.unit}>{item.netBandwithTb} TB</Text> -
              Archive: <Text style={styles.unit}>{item.archiveGb} GB</Text> -
              Fileshare: <Text style={styles.unit}>{item.fileShareGb} GB</Text>
              {"  "} price:{" "}
              <Text style={styles.amount}>({item.price} SAR)</Text> Monthly
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => {
                  setTotalNsPrice(totalNsPrice - Number(item.price));
                  removeNs(index);
                }}
              >
                <Text> Remove NS </Text>
              </TouchableOpacity>
            </Text>
          </View>
        ))}
        <Text style={{ marginTop: 20 }}>
          Price of All Network & Storage={" "}
          <Text style={styles.amount}>
            {totalNsPrice.toFixed(2)} SAR{" "}
            <Text style={{ color: "black" }}>Monthly</Text>
          </Text>
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: "#989898",
          borderBottomWidth: 2,
          marginTop: 50,
          marginBottom: 10
        }}
      />
      <View style={{ marginTop: 30 }}>
        <Text style={styles.listHeadr}>Total price: </Text>
        <Text style={styles.amount}>
          {(totalNsPrice + totalVmPrice).toFixed(2)} SAR{" "}
          <Text style={{ color: "black" }}>Monthly</Text>
        </Text>
      </View>
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
  },
  listName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10
  },
  unit: {
    color: "#04762C"
  },
  row: {
    flexDirection: "row",
    marginTop: 20
  }
});
