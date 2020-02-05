import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Modal,
  TouchableHighlight,
  Alert,
  Platform,
  Switch,
  Slider
} from "react-native";
import { Card } from "react-native-elements";
import { Container, Header, Content, Form } from "native-base";
import { Picker, PickerItem } from ".././uikit/picker/picker.web.tsx";

const osList = {
  CentOS: "CentOS",
  Redhat: "RedHat",
  Windows16: "Windows 2016",
  Windows12: "Microsoft Windows Server 2012 R2",
  MicrosoftSQL: "Microsoft SQL Server",
  MariaDB: "MariaDB",
  PostgreSQL: "PostgreSQL",
  Docker: "Docker Instance"
};

// const itemList={
//   GP-Nano: "GP-Nano (1 vCPU, 0.5 GB Memory)",

// }

const addVm = ({ submitVm, vmList, prices }) => {
  const [os, setOs] = useState("CentOS");
  const [item, setItem] = useState("GP_Large");
  const [backup, setBackup] = useState("Daily");
  const [recovery, setRecovery] = useState("Yes");
  const [qty, setQty] = useState(1);
  const [storage, setStorage] = useState(32);

  const calculatePrice = () => {
    let fRecovery: number = 0;
    let fVmPrice: number = prices[os + item];
    let fStorage: number = storage * prices.storage;
    let fBackup: number = prices["backup" + backup];
    if (recovery === "Yes") {
      fRecovery += prices.disasterRecovery;
    }
    let totalPrice: number = (fVmPrice * qty).toFixed(2);
    return totalPrice;
  };

  const validateAndSubmit = () => {
    let quantity: number = parseInt(qty, 10);
    let gbStorage: number = parseInt(storage, 10);
    //check quantity field
    if (qty > 0 && Number.isInteger(quantity)) {
      //Check storage field
      if (storage >= 32 && Number.isInteger(gbStorage)) {
        let price: number = calculatePrice();
        submitVm(item, os, backup, recovery, quantity, gbStorage, price);
      } else {
        alert("Please enter a valid storage");
      }
    } else {
      alert("Please enter a valid quantity");
    }
  };

  return (
    <View>
      <Card title="Virtual Machines">
        <View style={styles.row}>
          <View>
            <Text style={styles.subtitle}>OS || PaaS:</Text>
            <Picker selectedValue={os} onValueChange={setOs}>
              {Object.entries(osList).map(i => (
                <PickerItem key={i[0]} label={i[1]} value={i[0]} />
              ))}
            </Picker>
          </View>
          <View>
            <Text style={styles.subtitle}>Quantity:</Text>
            <TextInput
              style={styles.textField}
              onChangeText={setQty}
              value={qty}
            />
          </View>
          <View>
            <Text style={styles.subtitle}>Backup:</Text>
            <Picker selectedValue={backup} onValueChange={setBackup}>
              <PickerItem label="Daily" value="Daily" />
              <PickerItem label="Weekly" value="Weekly" />
              <PickerItem label="Monthly" value="Monthly" />
            </Picker>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.subtitle}>Item:</Text>
            <Picker
              mode="dropdown"
              style={{ width: 310 }}
              selectedValue={item}
              onValueChange={setItem}
            >
              {os != "Windows16" && os != "Windows12" && (
                <PickerItem
                  label="GP-Nano (1 vCPU, 0.5 GB Memory)"
                  value="GP_Nano"
                />
              )}
              {os != "Windows16" && os != "Windows12" && (
                <PickerItem
                  label="GP-Micro (1 vCPU, 1 GB Memory)"
                  value="GP_Micro"
                />
              )}
              <PickerItem
                label="GP-Small (2 vCPU, 4 GB Memory)"
                value="GP_Small"
              />
              <PickerItem
                label="GP-Medium (4 vCPU, 8 GB Memory)"
                value="GP_Medium"
              />
              <PickerItem
                label="GP-Large (8 vCPU, 16 GB Memory)"
                value="GP_Large"
              />
              <PickerItem
                label="GP-XLarge (16 vCPU, 32 GB Memory)"
                value="GP_XLarge"
              />
              <PickerItem
                label="MO-Large (16 vCPU, 64 GB Memory)"
                value="MO_Large"
              />
              <PickerItem
                label="MO-XLarge (16 vCPU, 128 GB Memory)"
                value="MO_XLarge"
              />
              <PickerItem
                label="CO-Large (32 vCPU, 64 GB Memory)"
                value="CO_Large"
              />
              <PickerItem
                label="CO-XLarge (64 vCPU, 128 GB Memory)"
                value="CO_XLarge"
              />
              <PickerItem
                label="CO-XXLarge (64 vCPU, 256 GB Memory)"
                value="CO_XXLarge"
              />
            </Picker>
          </View>
          <View>
            <Text style={styles.subtitle}>Recovery:</Text>
            <Picker
              mode="dialog"
              style={{ width: 100 }}
              selectedValue={recovery}
              onValueChange={setRecovery}
            >
              <PickerItem label="Yes" value="Yes" />
              <PickerItem label="No" value="No" />
            </Picker>
          </View>
          <View>
            <Text style={styles.subtitle}>Storage:</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TextInput
                style={styles.textField}
                onChangeText={setStorage}
                value={storage}
              />
              <Text>GB</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row-reverse", marginTop: 15 }}>
          <View style={styles.btn}>
            <Button
              title="Add VM"
              onPress={() => validateAndSubmit()}
              color="#476A34"
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

export default addVm;
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
    width: 100,
    height: 25,
    marginTop: 30,
    marginLeft: 40,
    marginBottom: 10
  },
  card: {
    flex: 1
  },
  subtitle: {
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 10,
    paddingRight: 5
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20
  },
  col: {
    marginTop: 0
  },
  textField: { height: 20, width: 80, borderColor: "gray", borderWidth: 1 }
});
