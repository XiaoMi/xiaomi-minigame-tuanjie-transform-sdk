import { convertDataToPointer } from '../utils';
let qgOnBLECharacteristicValueChangeCallback;
const OnBLECharacteristicValueChange = (res) => {
    const deviceIdPtr = convertDataToPointer(res.deviceId);
    const serviceIdPtr = convertDataToPointer(res.serviceId);
    const characteristicIdPtr = convertDataToPointer(res.characteristicId);
    const valuePtr = convertDataToPointer(res.value);
    GameGlobal.Module.dynCall_viiiii(qgOnBLECharacteristicValueChangeCallback, deviceIdPtr, serviceIdPtr, characteristicIdPtr, valuePtr, res.value.byteLength);
    GameGlobal.Module._free(deviceIdPtr);
    GameGlobal.Module._free(serviceIdPtr);
    GameGlobal.Module._free(characteristicIdPtr);
    GameGlobal.Module._free(valuePtr);
};
function QG_OnBLECharacteristicValueChange() {
    qg.onBLECharacteristicValueChange(OnBLECharacteristicValueChange);
}
function QG_OffBLECharacteristicValueChange() {
    qg.offBLECharacteristicValueChange();
}
function QG_RegisterOnBLECharacteristicValueChangeCallback(callback) {
    qgOnBLECharacteristicValueChangeCallback = callback;
}
export default {
    QG_OnBLECharacteristicValueChange,
    QG_OffBLECharacteristicValueChange,
    QG_RegisterOnBLECharacteristicValueChangeCallback,
};
