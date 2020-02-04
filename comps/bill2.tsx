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
import { getOsPrice, getTotalVmsPrice, getTotalNsPrice, getBackupPrice, getDRecoveryPrice } from "./getPrice";
interface vmItem {
  item: string;
  qty: number;
  os: string;
  storage: number;
  backup: string;
  recovery: string;
  price: number;
}

interface nsItem {
  publicIp: number;
  loadBAndWaf: number;
  netBandwitGb: number;
  archiveGb: number;
  fileShareGb: number;
  price: number;
}
const bill = ({ vmList, nsList, removeVm, removeNs, prices }) => {
  const [totalVmPrice, setTotalVmPrice] = useState(Number(getTotalVmsPrice(vmList)));
  const [totalNsPrice, setTotalNsPrice] = useState(Number(getTotalNsPrice(nsList)));

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
            {item.os}_{item.item}{" "}
            <Text style={styles.amount}>
              ({getOsPrice(item.os, item.item,item.qty)} SAR)
            </Text>{" "}
            - {item.backup} <Text style={styles.amount}>
              ({getBackupPrice(item.qty, item.storage, item.backup)} SAR)
            </Text> - {item.recovery} <Text style={styles.amount}>
              ({getDRecoveryPrice(item.qty, item.storage, item.recovery)} SAR)
            </Text>- {item.qty} - {item.storage} GB
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => {
                setTotalVmPrice(Number(totalVmPrice) - Number(item.price));
                removeVm(index);
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
          {Number(totalVmPrice).toFixed(2)} SAR{" "}
          <Text style={{ color: "black" }}>Monthly</Text>
        </Text>
      </Text>
      <View style={styles.row}>
        <Text style={styles.listName}>Network & Storage Product List</Text>
      </View>
      <View>
        {nsList.length === 0 && (
          <Text style={styles.row}>No NS items added</Text>
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
            {Number(totalNsPrice).toFixed(2)} SAR{" "}
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
