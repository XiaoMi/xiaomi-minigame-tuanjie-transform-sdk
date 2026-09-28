import response from './response';
import { formatJsonStr } from './utils';
const CloudIDObject = {};
function fixQGCallFunctionData(data) {
    
    for (const key in data) {
        if (typeof data[key] === 'object') {
            fixQGCallFunctionData(data[key]);
        }
        else if (typeof data[key] === 'string' && CloudIDObject[data[key]]) {
            data[key] = CloudIDObject[data[key]];
        }
    }
}
export default {
    QGCallFunctionInit(conf) {
        const config = formatJsonStr(conf);
        qg.cloud.init(config);
    },
    QGCallFunction(name, data, conf, s, f, c) {
        const d = JSON.parse(data);
        fixQGCallFunctionData(d);
        qg.cloud.callFunction({
            name,
            data: d,
            config: conf === '' ? null : JSON.parse(conf),
            ...response.handlecloudCallFunction(s, f, c),
        });
    },
    QGCloudID(cloudId) {
        
        const res = qg.cloud.CloudID(cloudId);
        const r = JSON.stringify(res);
        CloudIDObject[r] = res;
        return r;
    },
};
