import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView
} from "react-native";
import VmList from "../reqComps/vmList";
import {
  getOsPrice,
  getTotalVmsPrice,
  getTotalNsPrice,
  getBackupPrice,
  getDRecoveryPrice
} from "../getPrice";
import { Table, Row, Rows } from "react-native-table-component";

interface vmItem {
  item: string;
  qty: number;
  os: string;
  storage: number;
  backup: string;
  recovery: string;
  price: number;
}

const vmBill = ({ vmList, removeVm }) => {
  const [totalVmPrice, setTotalVmPrice] = useState(
    Number(getTotalVmsPrice(vmList))
  );
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.listName}>Virtual Machine List</Text>
      </View>
      <ScrollView>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#004028" }}>
          <Row
            data={[
              "OS || PaaS",
              "Backup",
              "Disaster Recovery",
              "Storage",
              "Quantity",
              "Acion"
            ]}
            style={styles.head}
            textStyle={styles.textHead}
          />

          {vmList.map((item: vmItem, index: number) => (
            <Row
              data={[
                <Text style={styles.cell}>
                  {item.os} - {item.item}
                  {"\n"}
                  <Text style={styles.amount}>
                    ({getOsPrice(item.os, item.item, item.qty)} SAR)
                  </Text>
                </Text>,
                <Text style={styles.cell}>
                  {item.backup} {"\n"}
                  <Text style={styles.amount}>
                    ({getBackupPrice(item.storage, item.qty, item.backup)} SAR)
                  </Text>
                </Text>,
                <Text style={styles.cell}>
                  {item.recovery} {"\n"}
                  <Text style={styles.amount}>
                    ({getDRecoveryPrice(item.qty, item.storage, item.recovery)}{" "}
                    SAR)
                  </Text>
                </Text>,
                <Text style={styles.cell}>{item.storage} GB</Text>,
                <Text style={styles.cell}>{item.qty}</Text>,
                <TouchableOpacity
                  onPress={() => {
                    setTotalVmPrice(Number(totalVmPrice) - Number(item.price));
                    removeVm(index);
                  }}
                >
                  <Text style={styles.removeButton}> Remove VM </Text>
                </TouchableOpacity>
              ]}
              textStyle={styles.textRow}
            />
          ))}
        </Table>
      </ScrollView>
      {vmList.length === 0 && <Text style={styles.row}>No VMs Added</Text>}
    </View>
  );
};

export default vmBill;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff",},

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
  cell: {
    padding: 3,
    paddingLeft: 10
  },
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#DCDCE0" },
  textRow: { margin: 6 },
  textHead: { margin: 6, fontWeight: "bold" }
});
