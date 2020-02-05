import React, { useState } from "react";
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
  Platform,
  Switch,
  Slider
} from "react-native";
import { Card } from "react-native-elements";
import { Container, Header, Content, Form } from "native-base";

const addNS = ({ submitNs, nsList, prices }) => {
  const [publicIp, setPublicIp] = useState(0);
  const [loadBAndWaf, setLoadBAndWaf] = useState(0);
  const [netBandwithGb, setNetBandwithGb] = useState(0);
  const [archiveGb, setArchiveGb] = useState(0);
  const [fileShareGb, setFileShareGb] = useState(0);

  const calculatePrice = () => {
    let pIp: number = Number(publicIp) * prices.ip;
    let pLoadBAndWaf: number = Number(loadBAndWaf) * prices.loadBalacerAndWaf;
    let pArchive: number = Number(archiveGb) * prices.archive;
    let pNetBandwithGb: number = Number(netBandwithGb) * prices.bandwith;
    let pFileShare: number = Number(fileShareGb) * prices.fileShare;
    return pIp + pLoadBAndWaf + pArchive + pNetBandwithGb + pFileShare;
  };

  const validateAndSubmit = () => {
    let publicIpS: number = parseInt(publicIp, 10);
    let loadBAndWafS: number = parseInt(loadBAndWaf, 10);
    let netBandwithGbS: number = parseInt(netBandwithGb, 10);
    let archiveGbS: number = parseInt(archiveGb, 10);
    let fileShareGbS: number = parseInt(fileShareGb, 10);
    //check IP field
    if (publicIp >= 0 && Number.isInteger(publicIpS)) {
      //Check WAF and Load balacer field
      if (loadBAndWaf >= 0 && Number.isInteger(loadBAndWafS)) {
        if (netBandwithGb >= 0 && Number.isInteger(netBandwithGbS)) {
          if (archiveGb >= 0 && Number.isInteger(archiveGbS)) {
            if (fileShareGb >= 0 && Number.isInteger(fileShareGbS)) {
              let price: number = calculatePrice().toFixed(2);
              submitNs(
                publicIpS,
                loadBAndWafS,
                netBandwithGb,
                archiveGbS,
                fileShareGb,
                price
              );
            } else {
              alert("Please enter a valid Fileshare value");
            }
          } else {
            alert("Please enter a valid Archive value");
          }
        } else {
          alert("Please enter a valid Internet Bandwith value");
        }
      } else {
        alert("Please enter a valid WAF and load balancer value");
      }
    } else {
      alert("Please enter a valid number of IPs");
    }
  };

  return (
    <View>
      <Card title="Network & Storage Products">
        <View style={styles.row}>
          <View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.subtitle}>Number of public IP:</Text>
              <TextInput
                style={styles.textField}
                onChangeText={setPublicIp}
                value={publicIp}
              />
              <Text style={styles.unit}>IPs</Text>
            </View>
          </View>
          <View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.subtitle}>Archive:</Text>
              <TextInput
                style={styles.textField}
                onChangeText={setArchiveGb}
                value={archiveGb}
              />
              <Text style={styles.unit}>GB</Text>
            </View>
          </View>
          <View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.subtitle}>Fileshare:</Text>
              <TextInput
                style={styles.textField}
                onChangeText={setFileShareGb}
                value={fileShareGb}
              />
              <Text style={styles.unit}>GB</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.subtitle}>
                Application Load Balancer & WAF:
              </Text>
              <TextInput
                style={styles.textField}
                onChangeText={setLoadBAndWaf}
                value={loadBAndWaf}
              />
              <Text style={styles.unit}>Per Application</Text>
            </View>
          </View>
          <View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.subtitle}>Egress Internet Bandwith:</Text>
              <TextInput
                style={styles.textField}
                onChangeText={setNetBandwithGb}
                value={netBandwithGb}
              />
              <Text style={styles.unit}>GB</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row-reverse", marginTop: 15 }}>
          <View style={styles.btn}>
            <Button
              title="Add product"
              onPress={() => validateAndSubmit()}
              color="#476A34"
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

export default addNS;
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
    height: 25,
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
    flex: 1,
    flexDirection: "column"
  },
  textField: { height: 20, width: 50, borderColor: "gray", borderWidth: 1 },
  unit: { marginLeft: 5 }
});
