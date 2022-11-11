import {Device} from '@capacitor/device';

const deviceData = {
    getInfo: async () => {
        return await Device.getInfo();
    },
    getBatteryInfo: async () => {
        return await Device.getBatteryInfo();
    },
    getLanguageCode: async () => {
        return await Device.getLanguageCode();
    },
    getLanguageTag: async () => {
        return await Device.getLanguageTag();
    }
};
export default deviceData;
