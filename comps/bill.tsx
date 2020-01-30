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
import { Table, Row, Rows } from 'react-native-table-component';

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
  netBandwithTb: number;
  archiveGb: number;
  fileShareGb: number;
  price: number;
}
const bill = ({ vmList, nsList, removeVm, removeNs, prices }) => {
  const [totalVmPrice, setTotalVmPrice] = useState(Number(getTotalVmsPrice(vmList)));
  const [totalNsPrice, setTotalNsPrice] = useState(Number(getTotalNsPrice(nsList)));

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.listName}>Virtual Machine List</Text>
      </View>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#004028' }}>
        <Row data={['Head', 'Head2', 'Head3', 'Head4']} style={styles.head} textStyle={styles.text} />
        <Row data={['b1', 'b2', 'b3', 'b4']} textStyle={styles.text} />

      </Table>
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
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#DCDCE0' },
  text: { margin: 6 }
});
