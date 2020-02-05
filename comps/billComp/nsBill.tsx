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
import VmList from "./reqComps/vmList";
import NsList from "./reqComps/nsList";
import {
  getPublicIpPrice,
  getTotalNsPrice,
  getLodBAndWafPrice,
  getArchivePrice,
  getNetBandwithPrice,
  getFileSharePrice,
  getNSPrice
} from "./../getPrice";
import { Table, Row, Rows } from "react-native-table-component";

interface nsItem {
  publicIp: number;
  loadBAndWaf: number;
  netBandwithGb: number;
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
                <Text style={styles.cell}>
                  {item.publicIp} IPs{"\n"}
                  <Text style={styles.amount}>
                    ({getPublicIpPrice(item.publicIp)} SAR)
                  </Text>
                </Text>,
                <Text style={styles.cell}>
                  {item.loadBAndWaf} / Application{"\n"}
                  <Text style={styles.amount}>
                    ({getLodBAndWafPrice(item.loadBAndWaf)} SAR)
                  </Text>
                </Text>,
                <Text style={styles.cell}>
                  {item.netBandwithGb} GB{"\n"}
                  <Text style={styles.amount}>
                    ({getNetBandwithPrice(item.netBandwithGb)} SAR)
                  </Text>
                </Text>,
                <Text style={styles.cell}>
                  {item.archiveGb} GB{"\n"}
                  <Text style={styles.amount}>
                    ({getArchivePrice(item.archiveGb)} SAR)
                  </Text>
                </Text>,
                <Text style={styles.cell}>
                  {item.fileShareGb} GB{"\n"}
                  <Text style={styles.amount}>
                    ({getFileSharePrice(item.fileShareGb)} SAR)
                  </Text>
                </Text>,
                <TouchableOpacity
                  onPress={() => {
                    setTotalNsPrice(
                      Math.abs(totalNsPrice - Number(getNSPrice(item)))
                    );
                    removeNs(index);
                  }}
                >
                  <Text style={styles.removeButton}> Remove Item </Text>
                </TouchableOpacity>
              ]}
              textStyle={styles.textRow}
            />
          ))}
        </Table>
        {nsList.length === 0 && (
          <Text style={styles.row}>No Network & Storage items added</Text>
        )}
        <Text style={{ marginTop: 20 }}>
          Price of All Network & Storage ={" "}
          <Text style={styles.amount}>
            {Number(totalNsPrice).toFixed(2)} SAR{" "}
            <Text style={{ color: "black" }}>Monthly</Text>
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default nsBill;
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },

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
  container: { flex: 1, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#DCDCE0" },
  textRow: { margin: 6 },
  textHead: { margin: 6, fontWeight: "bold" }
});
