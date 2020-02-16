import React, { useState } from "react";
import { Container, Header, Content, Form } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
  Modal,
  TouchableHighlight,
  Alert,
} from "react-native";
import { Card } from "react-native-elements";
import AddVm from "./reqComps/addVm";
import VmList from "./reqComps/vmList";
import AddNS from "./reqComps/addNS";
import NsList from "./reqComps/nsList";

const req = ({
  submitVm,
  vmList,
  removeVm,
  submitNs,
  nsList,
  removeNs,
  submitEnv,
  env,
  prices
}) => {
  const [catg, setCatg] = useState("Connectivity");
  const [item, setItem] = useState("GP-Medium (4 vCPU, 8GB Memory)");
  const [qty, setQty] = useState("0");
  return (
    <Container>
      {/* <Content> */}
      <AddVm
        submitVm={submitVm}
        vmList={vmList}
        submitEnv={submitEnv}
        env={env}
        prices={prices}
      />
      <VmList vmList={vmList} removeVm={removeVm} />
      <View
        style={{
          borderBottomColor: "#989898",
          borderBottomWidth: 2,
          marginTop: 40,
          marginBottom: 20
        }}
      />
      <AddNS submitNs={submitNs} nsList={nsList} prices={prices} />
      <NsList nsList={nsList} removeNs={removeNs} />
      <View style={{ marginBottom: 30 }}></View>
      {/* </Content> */}
    </Container>
  );
};

export default req;
const styles = StyleSheet.create({
  inputBox: {
    width: 200,
    height: 35,
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8,
    marginBottom: 15
  },
  btn: {
    width: 120,
    marginTop: 10
  },
  card: {
    flex: 1
  },
  subtitle: {
    fontWeight: "bold",
    marginBottom: 5
  }
});
