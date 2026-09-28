import moduleHelper from './module-helper';
import { formatJsonStr } from './utils';
let shareResolve;
export default {
    QGShareAppMessage(conf) {
        qg.shareAppMessage({
            ...formatJsonStr(conf),
        });
    },
    QGOnShareAppMessage(conf, isPromise) {
        qg.onShareAppMessage(() => ({
            ...formatJsonStr(conf),
            promise: isPromise
                ? new Promise((resolve) => {
                    shareResolve = resolve;
                    moduleHelper.send('OnShareAppMessageCallback');
                })
                : null,
        }));
    },
    QGOnShareAppMessageResolve(conf) {
        if (shareResolve) {
            shareResolve(formatJsonStr(conf));
        }
    },
};
// qg.showShareMenu({
//     menus: ['shareAppMessage', 'shareTimeline'],
// });
