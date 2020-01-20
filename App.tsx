import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

// const list = {
//   win:'windows 2012',
//   red:'red hat 6'
// }
// export default function App() {
//   const [val, setVal] = useState();

//   return (
//     <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
//       <Picker selectedValue={val} onValueChange={setVal}>
//       {Object.entries(list).map((i)=> <PickerItem key={i[0]} label={i[1]} value={i[0]} />)}

//       </Picker>

//     </View>
//   );
// }

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

  const submitVm = (v1, v2, v3, v4, v5, v6, v7) => {
    addVm([
      ...vmList,
      {
        item: v1,
        os: v2,
        backup: v3,
        recovery: v4,
        qty: v5,
        storage: v6,
        price: v7,
        
      }
    ]);
  };

  const submitNs = (v1, v2, v3, v4, v5, v6) => {
    addNs([
      ...nsList,
      {
        publicIp: v1,
        loadBAndWaf: v2,
        netBandwithTb: v3,
        archiveGb: v4,
        fileShareGb: v5,
        price: v6
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
    backgroundColor: "#369248",
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

  active: { backgroundColor: "#33673E" },
  page: {
    padding: 20,
    flex: 1
  }
});
