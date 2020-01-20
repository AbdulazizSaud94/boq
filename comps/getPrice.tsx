import prices from ".././assets/pricing/prices.json";

export function getOsPrice(os: string, size: string, qty: number) {
  return (prices[os + size]*qty).toFixed(2);
}

export function getDRecoveryPrice(qty, storage,recovery) {
  let recoveryPrice: number = 0;
  if (recovery === "Yes") {
    recoveryPrice = (qty*prices.vmMonthly)+(storage*prices.storage);
  }
  return recoveryPrice.toFixed(2);
}

export function getBackupPrice(qty, storage, backup) {
  return (qty*prices.vmMonthly)+(storage*prices.storage);
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
