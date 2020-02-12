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
  getOsUnitPric,
  getStoragePrice,
  getTotalVmsPrice,
  getTotalNsPrice,
  getBackupPrice,
  getDRecoveryPrice,
  getVmPrice,
  getPublicIpPrice,
  getLodBAndWafPrice,
  getArchivePrice,
  getNetBandwithPrice,
  getFileSharePrice,
  getNSPrice
} from "./getPrice";
import { Table, Row, Rows } from "react-native-table-component";
import prices from ".././assets/pricing/prices.json";

const bill = ({ vmList, nsList, removeVm, removeNs, prices }) => {
  const [totalVmPrice, setTotalVmPrice] = useState(
    Number(getTotalVmsPrice(vmList))
  );

  const [totalNsPrice, setTotalNsPrice] = useState(
    Number(getTotalNsPrice(nsList))
  );

  const [isPrinting, setIsPrinting] = useState(false);

  const [action, setSection] = useState();

  function firstFunction(_callback) {
    setIsPrinting(true);
    _callback();
  }
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.listName}>Virtual Machine List</Text>
      </View>
      {vmList.map((item: vmItem, index: number) => (
        <Table borderStyle={{ borderWidth: 2, borderColor: "#004028" }}>
          <Row
            data={["Item", "Quantity", "Unit Price", "Total Price"]}
            style={styles.head}
            textStyle={styles.textHead}
          />

          <Rows
            data={[
              [
                <Text style={styles.cell}>Size - OS: <Text style={styles.amount}>{item.item} - {item.os}</Text></Text>,
                <Text style={styles.cell}>{item.qty}</Text>,
                <Text style={styles.cell}>
                  <Text style={styles.amount}>
                    ({getOsUnitPric(item.os, item.item)} SAR)
                  </Text>
                </Text>,
                <Text style={styles.cell}>
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({getOsPrice(item.os, item.item, item.qty)} SAR)
                    </Text>
                  </Text>
                </Text>
              ],
              [
                <Text style={styles.cell}>Storage (SSD)</Text>,
                <Text style={styles.cell}>{item.storage} GB</Text>,
                <Text style={styles.cell}>
                  <Text style={styles.amount}>({prices.storage} SAR)</Text>
                </Text>,
                <Text style={styles.cell}>
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({getStoragePrice(item.storage)} SAR)
                    </Text>
                  </Text>
                </Text>
              ],
              [
                <Text style={styles.cell}>Backup: <Text style={styles.amount}>{item.backup}</Text></Text>,
                <Text style={styles.cell}>-</Text>,
                <Text style={styles.cell}>
                  <Text style={styles.amount}>
                    ({getOsUnitPric(item.os, item.item)} SAR)
                  </Text>
                </Text>,
                <Text style={styles.cell}>
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({getOsPrice(item.os, item.item, item.qty)} SAR)
                    </Text>
                  </Text>
                </Text>
              ],
              [
                <Text style={styles.cell}>Disaster Recovery:<Text style={styles.amount}>{item.backup}</Text></Text>,
                <Text style={styles.cell}>{item.storage} GB</Text>,
                <Text style={styles.cell}>
                  <Text style={styles.amount}>
                    ({getOsUnitPric(item.os, item.item)} SAR)
                  </Text>
                </Text>,
                <Text style={styles.cell}>
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({getOsPrice(item.os, item.item, item.qty)} SAR)
                    </Text>
                  </Text>
                </Text>
              ]
            ]}
            textStyle={styles.textRow}
          />
        </Table>
      ))}
      {vmList.length === 0 && (
        <Text style={styles.row}>No Virtual Machines Added</Text>
      )}
      <Text style={{ marginTop: 20 }}>
        Price All of VMs ={" "}
        <Text style={styles.amount}>
          {Number(totalVmPrice).toFixed(2)} SAR{" "}
          <Text style={{ color: "black" }}>Monthly</Text>
        </Text>
      </Text>
      <View
        style={{
          borderBottomColor: "#989898",
          borderBottomWidth: 2,
          marginTop: 70,
          marginBottom: 10
        }}
      />
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
              <div>
                {isPrinting === false && (
                  <Text style={styles.textHead}>Action</Text>
                )}
              </div>
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
                <div>
                  {isPrinting === false && (
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
                  )}
                </div>
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
      <View style={styles.row}>
        <Button
          title="Export Bill"
          onPress={() => {
            firstFunction(function() {
              setTimeout(function afterTwoSeconds() {
                window.print();
                setIsPrinting(false);
              }, 50);
            });
          }}
          color="#476A34"
        />
      </View>
    </View>
  );
};

export default bill;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 20
  },
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#DCDCE0" },
  text: { margin: 6 },

  container: { flex: 1, backgroundColor: "#fff" },

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
  head: { height: 40, backgroundColor: "#DCDCE0" },
  textRow: { margin: 6 },
  textHead: { margin: 6, fontWeight: "bold" }
});
