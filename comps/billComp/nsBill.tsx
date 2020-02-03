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
import {
  getOsPrice,
  getTotalVmsPrice,
  getTotalNsPrice,
  getBackupPrice,
  getDRecoveryPrice
} from "./../getPrice";
import { Table, Row, Rows } from "react-native-table-component";

interface nsItem {
  publicIp: number;
  loadBAndWaf: number;
  netBandwithTb: number;
  archiveGb: number;
  fileShareGb: number;
  price: number;
}
const nsBill = ({ nsList, removeNs, prices }) => {
  const [totalNsPrice, setTotalNsPrice] = useState(
    Number(getTotalNsPrice(nsList))
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.listName}>Network & Storage Product List</Text>
      </View>
      <View>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#004028" }}>
          <Row
            data={[
              "# IPs",
              "Load Balancer & WAF",
              " Internet Bandwith",
              "Archive",
              "Fileshare",
              "Action"
            ]}
            style={styles.head}
            textStyle={styles.textHead}
          />

          {nsList.map((item: nsItem, index: number) => (
            <Row
              data={[
                <Text style={styles.unit}>{item.publicIp} IPs</Text>,
                "Load Balancer & WAF",
                " Internet Bandwith",
                "Archive",
                "Fileshare",
                "Action"
              ]}
              textStyle={styles.textRow}
            />
          ))}
        </Table>

        {nsList.length === 0 && (
          <Text style={styles.row}>No NS items added</Text>
        )}
      </View>
    </View>
  );
};

export default nsBill;
const styles = StyleSheet.create({
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
