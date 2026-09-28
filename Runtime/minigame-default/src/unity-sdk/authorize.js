import moduleHelper from './module-helper';
import { formatJsonStr } from './utils';
let resolveFn = null;
export default {
    QG_OnNeedPrivacyAuthorization() {
        const callback = (resolve) => {
            resolveFn = resolve;
            moduleHelper.send('_OnNeedPrivacyAuthorizationCallback', '{}');
        };
        
        qg.onNeedPrivacyAuthorization(callback);
    },
    QG_PrivacyAuthorizeResolve(conf) {
        const config = formatJsonStr(conf);
        
        config.event = config.eventString;
        if (resolveFn) {
            resolveFn(config);
            if (config.event === 'agree' || config.event === 'disagree') {
                resolveFn = null;
            }
        }
    },
};
