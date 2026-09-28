import moduleHelper from './module-helper';
import { launchEventType } from '../plugin-config';
import { setArrayBuffer, uid } from './utils';
import '../events';
export default {
    QGReportGameStart() {
        GameGlobal.manager.reportCustomLaunchInfo();
    },
    QGReportGameSceneError(sceneId, errorType, errStr, extInfo) {
        if (GameGlobal.manager && GameGlobal.manager.reportGameSceneError) {
            GameGlobal.manager.reportGameSceneError(sceneId, errorType, errStr, extInfo);
        }
    },
    QGWriteLog(str) {
        if (GameGlobal.manager && GameGlobal.manager.writeLog) {
            GameGlobal.manager.writeLog(str);
        }
    },
    QGWriteWarn(str) {
        if (GameGlobal.manager && GameGlobal.manager.writeWarn) {
            GameGlobal.manager.writeWarn(str);
        }
    },
    QGHideLoadingPage() {
        if (GameGlobal.manager && GameGlobal.manager.hideLoadingPage) {
            GameGlobal.manager.hideLoadingPage();
        }
    },
    QGReportUserBehaviorBranchAnalytics(branchId, branchDim, eventType) {
        qg.reportUserBehaviorBranchAnalytics({ branchId, branchDim, eventType });
    },
    QGPreloadConcurrent(count) {
        if (GameGlobal.manager && GameGlobal.manager.setConcurrent) {
            GameGlobal.manager.setConcurrent(count);
        }
    },
    QGIsCloudTest() {
        if (typeof GameGlobal.isTest !== 'undefined' && GameGlobal.isTest) {
            return true;
        }
        return false;
    },
    QGUncaughtException(needAbort) {
        function currentStackTrace() {
            const err = new Error('QGUncaughtException');
            return err;
        }
        const err = currentStackTrace();
        let fullTrace = err.stack?.toString();
        if (fullTrace) {
            const posOfThisFunc = fullTrace.indexOf('QGUncaughtException');
            if (posOfThisFunc !== -1) {
                fullTrace = fullTrace.substr(posOfThisFunc);
            }
            const posOfRaf = fullTrace.lastIndexOf('browserIterationFunc');
            if (posOfRaf !== -1) {
                fullTrace = fullTrace.substr(0, posOfRaf);
            }
        }
        const realTimelog = qg.getRealtimeLogManager();
        realTimelog.error(fullTrace);
        const logmanager = qg.getLogManager({ level: 0 });
        logmanager.warn(fullTrace);
        if (needAbort === true) {
            GameGlobal.onCrash(err);
            throw err;
        }
        else {
            setTimeout(() => {
                throw err;
            }, 0);
        }
    },
    QGCleanAllFileCache() {
        if (GameGlobal.manager && GameGlobal.manager.cleanCache) {
            const key = uid();
            GameGlobal.manager.cleanAllCache().then((res) => {
                moduleHelper.send('CleanAllFileCacheCallback', JSON.stringify({
                    callbackId: key,
                    result: res,
                }));
            });
            return key;
        }
        return '';
    },
    QGCleanFileCache(fileSize) {
        if (GameGlobal.manager && GameGlobal.manager.cleanCache) {
            const key = uid();
            GameGlobal.manager.cleanCache(fileSize).then((res) => {
                moduleHelper.send('CleanFileCacheCallback', JSON.stringify({
                    callbackId: key,
                    result: res,
                }));
            });
            return key;
        }
        return '';
    },
    QGRemoveFile(path) {
        if (GameGlobal.manager && GameGlobal.manager.removeFile && path) {
            const key = uid();
            GameGlobal.manager.removeFile(path).then((res) => {
                moduleHelper.send('RemoveFileCallback', JSON.stringify({
                    callbackId: key,
                    result: res,
                }));
            });
            return key;
        }
        return '';
    },
    QGGetCachePath(url) {
        if (GameGlobal.manager && GameGlobal.manager.getCachePath) {
            return GameGlobal.manager.getCachePath(url);
        }
    },
    QGGetPluginCachePath() {
        if (GameGlobal.manager && GameGlobal.manager.PLUGIN_CACHE_PATH) {
            return GameGlobal.manager.PLUGIN_CACHE_PATH;
        }
    },
    QGOnLaunchProgress() {
        if (GameGlobal.manager && GameGlobal.manager.onLaunchProgress) {
            const key = uid();
            // 异步执行，保证C#已经记录这个回调ID
            setTimeout(() => {
                GameGlobal.manager.onLaunchProgress((e) => {
                    moduleHelper.send('OnLaunchProgressCallback', JSON.stringify({
                        callbackId: key,
                        res: JSON.stringify(Object.assign({}, e.data, {
                            type: e.type,
                        })),
                    }));
                    
                    if (e.type === launchEventType.prepareGame) {
                        moduleHelper.send('RemoveLaunchProgressCallback', JSON.stringify({
                            callbackId: key,
                        }));
                    }
                });
            }, 0);
            return key;
        }
        return '';
    },
    QGSetDataCDN(path) {
        if (GameGlobal.manager && GameGlobal.manager.setDataCDN) {
            GameGlobal.manager.setDataCDN(path);
        }
    },
    QGGetDataCDN() {
        if (GameGlobal.manager && GameGlobal.manager.getDataCDN) {
            return GameGlobal.manager.getDataCDN();
        }
        return '';
    },
    QGSetPreloadList(paths) {
        if (GameGlobal.manager && GameGlobal.manager.setPreloadList) {
            const list = (paths || '').split(',').filter(str => !!str && !!str.trim());
            GameGlobal.manager.setPreloadList(list);
        }
    },
    QGSetArrayBuffer(buffer, offset, callbackId) {
        setArrayBuffer(buffer, offset, callbackId);
    },
    QGLaunchOperaBridge(args) {
        const res = GameGlobal.events.emit('launchOperaMsgBridgeFromWasm', args);
        if (Array.isArray(res) && res.length > 0) {
            return res[0];
        }
        return null;
    },
    QGLaunchOperaBridgeToC(callback, args) {
        moduleHelper.send('LaunchOperaBridgeToC', JSON.stringify({
            callback,
            args,
        }));
    },
};
