import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import Header from "./comps/header";
import req from "./comps/req";
import bill from "./comps/bill";
import prices from "./assets/pricing/prices.json";

const pages = { req, bill };

export default function App() {
  const [vmList, addVm] = useState([]);
  const [page, setPage] = useState("req");
  const [bill, setBill] = useState();
  const PagePan = pages[page];
  const [nsList, addNs] = useState([]);
  const [env, setEnv] = useState({ number: 1, utilization: 100 });

  const submitVm = (v1, v2, v3, v4, v5, v6) => {
    addVm([
      ...vmList,
      {
        item: v1,
        os: v2,
        backup: v3,
        recovery: v4,
        qty: v5,
        storage: v6
      }
    ]);
  };

  const submitEnv = (number, utilization) => {
    setEnv({
      number: number,
      utilization: utilization
    });
  };

  const submitNs = (v1, v2, v3, v4, v5, v6) => {
    addNs([
      ...nsList,
      {
        publicIp: v1,
        loadBAndWaf: v2,
        netBandwithGb: v3,
        archiveGb: v4,
        fileShareGb: v5,
        jumpServer: v6
      }
    ]);
  };

  const removeVm = (index: number): void => {
    const newVmList = [...vmList];
    newVmList.splice(index, 1);
    addVm(newVmList);
  };

  const removeNs = (index: number): void => {
    const newNsList = [...nsList];
    newNsList.splice(index, 1);
    addNs(newNsList);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.tabbar}>
        <TouchableOpacity onPress={() => setPage("req")} style={{ flex: 1 }}>
          <Text style={[styles.tab, page === "req" && styles.active]}>
            Requierments
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPage("bill")} style={{ flex: 1 }}>
          <Text style={[styles.tab, page === "bill" && styles.active]}>
            Bill
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.page}>
        <PagePan
          vmList={vmList}
          submitVm={submitVm}
          removeVm={removeVm}
          nsList={nsList}
          submitNs={submitNs}
          removeNs={removeNs}
          submitEnv={submitEnv}
          env={env}
          prices={prices}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  tabbar: {
    flexDirection: "row",
    backgroundColor: "#476A34",
    borderBottomColor: "#eee",
    borderBottomWidth: 1
  },

  tab: {
    paddingVertical: 20,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },

  active: { backgroundColor: "#3B5E2B" },
  page: {
    padding: 20,
    flex: 1
  }
});
