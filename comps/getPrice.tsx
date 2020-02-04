import prices from ".././assets/pricing/prices.json";

export function getOsPrice(os: string, size: string, qty: number) {
  return (prices[os + size] * qty).toFixed(2);
}

export function getDRecoveryPrice(qty, storage, recovery) {
  let recoveryPrice: number = 0;
  if (recovery === "Yes") {
    recoveryPrice =
      qty * (prices.vmLicenseHourly * 720) + storage * prices.storage;
  }
  return recoveryPrice.toFixed(2);
}

export function getBackupPrice(storage, qty, backup) {
  let priceLicense: number = prices.vmLicenseHourly * qty;
  let priceStorage: number = prices.gbHourly * storage;

  switch (backup) {
    case "Daily":
      return (
        (priceLicense +
          prices.retationMonths *
            4 *
            (priceStorage + 6 * priceStorage * prices.dailyFactor)) *
        720
      ).toFixed(2);
    case "Weekly":
      return (
        (priceLicense + prices.retationMonths * 4 * priceStorage) *
        720
      ).toFixed(2);
    case "Monthly":
      return (
        (priceLicense + prices.retationMonths * priceStorage) *
        720
      ).toFixed(2);
  }
}
export function getStoragePrice(storage) {
  return (storage * prices.storage).toFixed(2);
}

export function getTotalUnitPrice() {
  return "total";
}

export function getTotalVmsPrice(vmList) {
  let totalVm: number = 0;
  vmList.map(
    (item: vmItem, index: number) => (totalVm = Number(item.price) + totalVm)
  );
  return totalVm.toFixed(2);
}

export function getTotalNsPrice(nsList) {
  let totalNs: number = 0;

  nsList.map(
    (item: nsItem, index: number) => (totalNs = Number(item.price) + totalNs)
  );
  return totalNs.toFixed(2);
}

export function getPublicIpPrice(publicIp: number) {
  return (publicIp * prices.ip).toFixed(2);
}

export function getLodBAndWafPrice(loadBAndWaf: number) {
  return (loadBAndWaf * prices.loadBalacerAndWaf).toFixed(2);
}

export function getNetBandwithPrice(netBandwithGb:number) {
  return (netBandwithGb*prices.bandwith).toFixed(2);
}

export function getArchivePrice(archiveGb:number) {
  return (archiveGb*prices.archive).toFixed(2);
}

export function getFileSharePrice(fileShareGb:number){
  return (prices.fileShare*fileShareGb).toFixed(2)
}