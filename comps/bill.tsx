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
import VmBill from "./billComp/vmBill";
import NsBill from "./billComp/nsBill";

import {
  getOsPrice,
  getTotalVmsPrice,
  getTotalNsPrice,
  getBackupPrice,
  getDRecoveryPrice
} from "./getPrice";
import { Table, Row, Rows } from "react-native-table-component";

const bill = ({ vmList, nsList, removeVm, removeNs, prices }) => {
  return (
    <View style={styles.container}>
      <VmBill vmList={vmList} removeVm={removeVm} />
      <View
        style={{
          borderBottomColor: "#989898",
          borderBottomWidth: 2,
          marginTop: 10,
          marginBottom: 10
        }}
      />
      <NsBill nsList={nsList} removeNs={removeNs}/>
    </View>

  );
};

export default bill;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 20
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#DCDCE0" },
  text: { margin: 6 }
});
