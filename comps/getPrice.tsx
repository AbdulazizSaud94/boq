import prices from ".././assets/pricing/prices.json";

export function getVmPrice(os: string, size: string, qty: number) {
  return (prices["CentOS" + size] * qty).toFixed(2);
}

export function getVmUnitPrice(os: string, size: string, qty: number) {
  return prices["CentOS" + size].toFixed(2);
}

export function getOsLicensePrice(os: string, size: string, qty: number) {
  switch (os) {
    case "Redhat":
      return (prices[os + size] * qty).toFixed(2);
    case "Windows16":
      return (prices[os + size] * qty).toFixed(2);
    case "Windows12":
      return (prices[os + size] * qty).toFixed(2);
    default:
      return (0).toFixed(2);
  }
}

export function getOsLicenseUnitPric(os: string, size: string) {
  switch (os) {
    case "Redhat":
      return prices[os + size].toFixed(2);
    case "Windows16":
      return prices[os + size].toFixed(2);
    case "Windows12":
      return prices[os + size].toFixed(2);
    default:
      return (0).toFixed(2);
  }
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

export function getTotalVmsPrice(vmList) {
  let totalVm: number = 0;
  vmList.map(
    (item: vmItem, index: number) =>
      (totalVm = Number(getVmItemPrice(item)) + totalVm)
  );
  return totalVm.toFixed(2);
}

export function getTotalNsPrice(nsList) {
  let totalNs: number = 0;

  nsList.map((item: nsItem, index: number) => (totalNs += Number(getNSPrice(item))));
  return totalNs.toFixed(2);
}

export function getPublicIpPrice(publicIp: number) {
  return (publicIp * prices.ip).toFixed(2);
}

export function getLodBAndWafPrice(loadBAndWaf: number) {
  return (loadBAndWaf * prices.loadBalacerAndWaf).toFixed(2);
}

export function getNetBandwithPrice(netBandwithGb: number) {
  return (netBandwithGb * prices.bandwith).toFixed(2);
}

export function getArchivePrice(archiveGb: number) {
  return (archiveGb * prices.archive).toFixed(2);
}

export function getFileSharePrice(fileShareGb: number) {
  return (prices.fileShare * fileShareGb).toFixed(2);
}

export function getJumpServerPrice(jumpServer: number) {
  return (prices.jumpServer * jumpServer).toFixed(2);
}

export function getVmItemPrice(item) {
  let total: number = 0;
  total =
    total +
    Number(getVmPrice(item.os, item.item, item.qty))+
    Number(getOsLicensePrice(item.os, item.item, item.qty)) +
    Number(getBackupPrice(item.storage, item.qty, item.backup)) +
    Number(getDRecoveryPrice(item.qty, item.storage, item.recovery)) +
    Number(getStoragePrice(item.storage));
  return total.toFixed(2);
}

export function getNSPrice(item) {
  let total: number = 0;
  total =
    total +
    Number(getPublicIpPrice(item.publicIp)) +
    Number(getLodBAndWafPrice(item.loadBAndWaf)) +
    Number(getNetBandwithPrice(item.netBandwithGb)) +
    Number(getArchivePrice(item.archiveGb)) +
    Number(getFileSharePrice(item.fileShareGb))+Number(getJumpServerPrice(item.jumpServer));
  return total.toFixed(2);
}

export function getMembershipFees(qty: number) {
  return qty.toFixed(0);
}

export function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}