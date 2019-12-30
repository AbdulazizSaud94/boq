import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Modal } from "react-native";
import VmList from "./reqComps/vmList";
import NsList from "./reqComps/nsList";

const bill = ({ vmList, nsList, removeVm, removeNs, prices }) => {
  return (
    <View>
      <VmList vmList={vmList} removeVm={removeVm} />
      <NsList nsList={nsList} removeNs={removeNs} />
      <Text>{prices.firstName}</Text>
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
  }
});
