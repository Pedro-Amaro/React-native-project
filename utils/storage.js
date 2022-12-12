import AsyncStorage from "@react-native-async-storage/async-storage"

const storeData = async (key, value) => {
    const valorJson = JSON.stringify(value);
    await AsyncStorage.setItem(key, valorJson);

}

const getData = async (key) => {
    const textoJson = await AsyncStorage.getItem(key);
    const jsonConvertido = JSON.parse(textoJson);
    return jsonConvertido
}

const clearStorage = async () => {
    AsyncStorage.clear();
}

export {
    storeData,
    getData,
    clearStorage,
}