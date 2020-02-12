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
            data={[
              <Text style={styles.textHead}>
                Item{" "}
                {isPrinting === false && (
                  <TouchableOpacity
                    onPress={() => {
                      setTotalVmPrice(
                        Math.abs(
                          Number(totalVmPrice) - Number(getVmPrice(item))
                        )
                      );
                      removeVm(index);
                    }}
                  >
                    <Text style={styles.removeButton}> Remove VM </Text>
                  </TouchableOpacity>
                )}
              </Text>,

              "Quantity",
              "Unit Price",
              "Total Price"
            ]}
            style={styles.head}
            textStyle={styles.textHead}
          />

          <Rows
            data={[
              [
                <Text style={styles.cell}>
                  Size - OS:{" "}
                  <Text style={styles.amount}>
                    {item.item} - {item.os}
                  </Text>
                </Text>,
                <Text style={styles.cell}>{item.qty}</Text>,
                <Text style={styles.cell}>
                  <Text style={styles.amount}>
                    ({getOsUnitPric(item.os, item.item)}) SAR
                  </Text>
                </Text>,
                <Text style={styles.cell}>
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({getOsPrice(item.os, item.item, item.qty)}) SAR
                    </Text>
                  </Text>
                </Text>
              ],
              [
                <Text style={styles.cell}>Storage (SSD)</Text>,
                <Text style={styles.cell}>{item.storage} GB</Text>,
                <Text style={styles.cell}>
                  <Text style={styles.amount}>
                    ({prices.storage.toFixed(2)}) SAR
                  </Text>
                </Text>,
                <Text style={styles.cell}>
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({getStoragePrice(item.storage)}) SAR
                    </Text>
                  </Text>
                </Text>
              ],
              [
                <Text style={styles.cell}>
                  Backup: <Text style={styles.amount}>{item.backup}</Text>
                </Text>,
                <Text style={styles.cell}>-</Text>,
                <Text style={styles.cell}>
                  <Text style={styles.amount}>
                    ({getBackupPrice(item.storage, item.qty, item.backup)}) SAR
                  </Text>
                </Text>,
                <Text style={styles.cell}>
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({getBackupPrice(item.storage, item.qty, item.backup)})
                      SAR
                    </Text>
                  </Text>
                </Text>
              ],
              [
                <Text style={styles.cell}>
                  Disaster Recovery:{" "}
                  <Text style={styles.amount}>{item.recovery}</Text>
                </Text>,
                <Text style={styles.cell}>-</Text>,
                <Text style={styles.cell}>
                  <Text style={styles.amount}>
                    ({getDRecoveryPrice(item.qty, item.storage, item.recovery)})
                    SAR
                  </Text>
                </Text>,
                <Text style={styles.cell}>
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      (
                      {getDRecoveryPrice(item.qty, item.storage, item.recovery)}
                      ) SAR
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
        <Text style={{ marginTop: 10 }}>No Virtual Machines Added</Text>
      )}
      <Text style={{ marginTop: 20 }}>
        Price All of VMs ={" "}
        <Text style={styles.amount}>
          {Number(totalVmPrice).toFixed(2)} SAR{" "}
          <Text style={{ color: "black" }}>Monthly</Text>
        </Text>
      </Text>
      <View style={styles.row}>
        <Text style={styles.listName}>Network & Storage Product List</Text>
      </View>
      <View>
        {nsList.map((item: nsItem, index: number) => (
          <Table borderStyle={{ borderWidth: 2, borderColor: "#004028" }}>
            <Row
              data={[
                <Text style={styles.textHead}>
                  Item{" "}
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
                </Text>,
                "Quantity",
                "Unit Price",
                "Total Price"
              ]}
              style={styles.head}
              textStyle={styles.textHead}
            />
            <Rows
              data={[
                [
                  <Text style={styles.cell}>Public IPs</Text>,
                  <Text style={styles.cell}>{item.publicIp}</Text>,
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({prices.ip.toFixed(2)}) SAR
                    </Text>
                  </Text>,
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({getPublicIpPrice(item.publicIp)}) SAR
                    </Text>
                  </Text>
                ],
                [
                  <Text style={styles.cell}>Load Balancer & WAF</Text>,
                  <Text style={styles.cell}>
                    {item.loadBAndWaf} / Application
                  </Text>,
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({prices.loadBalacerAndWaf.toFixed(2)}) SAR
                    </Text>
                  </Text>,
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({getLodBAndWafPrice(item.loadBAndWaf)}) SAR
                    </Text>
                  </Text>
                ],

                [
                  <Text style={styles.cell}>Internet Bandwith</Text>,
                  <Text style={styles.cell}>{item.netBandwithGb} GB</Text>,
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({prices.bandwith.toFixed(2)}) SAR
                    </Text>
                  </Text>,
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({getNetBandwithPrice(item.netBandwithGb)}) SAR
                    </Text>
                  </Text>
                ],
                [
                  <Text style={styles.cell}>Archive</Text>,
                  <Text style={styles.cell}>{item.archiveGb} GB</Text>,
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({prices.archive.toFixed(2)}) SAR
                    </Text>
                  </Text>,
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({getArchivePrice(item.archiveGb)}) SAR
                    </Text>
                  </Text>
                ],
                [
                  <Text style={styles.cell}>Fileshare</Text>,
                  <Text style={styles.cell}>{item.fileShareGb} GB</Text>,
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({prices.fileShare.toFixed(2)}) SAR
                    </Text>
                  </Text>,
                  <Text style={styles.cell}>
                    <Text style={styles.amount}>
                      ({getFileSharePrice(item.fileShareGb)}) SAR
                    </Text>
                  </Text>
                ]
              ]}
              textStyle={styles.textRow}
            />
          </Table>
        ))}
        {nsList.length === 0 && (
          <Text style={{ marginTop: 10 }}>
            No Network & Storage items added
          </Text>
        )}
        <Text style={{ marginTop: 20 }}>
          Price of All Network & Storage ={" "}
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
          marginTop: 40,
          marginBottom: 10
        }}
      />
      <Text style={{ marginTop: 20 }}>
        OverAll Price ={" "}
        <Text style={styles.amount}>
          {Number(totalNsPrice + totalVmPrice).toFixed(2)} SAR{" "}
          <Text style={{ color: "black" }}>Monthly</Text>
        </Text>
      </Text>
      <View style={{ flexDirection: "row", marginTop: 15 }}>
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
    marginLeft: 2,
    fontSize: 11
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
    fontSize: 18
  },
  unit: {
    color: "#04762C"
  },
  row: {
    flexDirection: "row",
    marginTop: 50
  },
  cell: {
    padding: 3,
    paddingLeft: 10
  },
  head: { height: 40, backgroundColor: "#DCDCE0" },
  textRow: { margin: 6 },
  textHead: { margin: 6, fontWeight: "bold" }
});
