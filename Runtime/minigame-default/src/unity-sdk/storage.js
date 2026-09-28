const PreLoadKeys = '$PreLoadKeys'; 
const storage = {
    _cacheData: {},
    _handleList: [],
    isRunning: false,
    isCallDeletedAll: false,
    getData(key, defaultValue) {
        let v = this._cacheData[key];
        if (v === null) {
            return defaultValue;
        }
        if (typeof v !== 'undefined') {
            return v;
        }
        if (this.isCallDeletedAll) {
            return defaultValue;
        }
        try {
            v = qg.getStorageSync(key);
            this._cacheData[key] = v !== '' ? v : null;
            return v === '' ? defaultValue : v;
        }
        catch (e) {
            // console.error(e);
            return defaultValue;
        }
    },
    setData(key, value) {
        this._cacheData[key] = value;
        this._handleList.push({
            type: 'setData',
            key,
            value,
        });
        this._doRun();
    },
    deleteKey(key) {
        this._cacheData[key] = null;
        this._handleList.push({
            type: 'deleteKey',
            key,
        });
        this._doRun();
    },
    deleteAll() {
        Object.keys(this._cacheData).forEach((key) => {
            this._cacheData[key] = null;
        });
        this.isCallDeletedAll = true;
        this._handleList.push({
            type: 'deleteAll',
        });
        this._doRun();
    },
    _doRun() {
        if (this.isRunning || this._handleList.length === 0) {
            return false;
        }
        this.isRunning = true;
        const task = this._handleList.shift();
        if (!task) {
            this.isRunning = false;
            this._doRun();
            return;
        }
        if (task.type === 'setData') {
            qg.setStorage({
                key: task.key || 'defaultKey',
                data: task.value,
                fail({ errMsg }) {
                    console.error(errMsg);
                },
                complete: () => {
                    this.isRunning = false;
                    this._doRun();
                },
            });
        }
        else if (task.type === 'deleteKey') {
            qg.removeStorage({
                key: task.key || 'defaultKey',
                fail({ errMsg }) {
                    console.error(errMsg);
                },
                complete: () => {
                    this.isRunning = false;
                    this._doRun();
                },
            });
        }
        else if (task.type === 'deleteAll') {
            qg.clearStorage({
                fail({ errMsg }) {
                    console.error(errMsg);
                },
                complete: () => {
                    this.isRunning = false;
                    this._doRun();
                },
            });
        }
        else {
            this.isRunning = false;
            this._doRun();
        }
    },
    init() {
        if (Array.isArray(PreLoadKeys) && PreLoadKeys.length > 0) {
            const key = PreLoadKeys.shift();
            qg.getStorage({
                key,
                success(res) {
                    storage._cacheData[key] = res.data;
                    storage.init();
                },
                fail() {
                    storage._cacheData[key] = null;
                    storage.init();
                },
            });
        }
    },
};
setTimeout(() => {
    storage.init();
}, 0);
export default {
    QGStorageGetIntSync(key, defaultValue) {
        return +(storage.getData(key, defaultValue) || '');
    },
    QGStorageSetIntSync(key, value) {
        storage.setData(key, value);
    },
    QGStorageGetFloatSync(key, defaultValue) {
        return +(storage.getData(key, defaultValue) || '');
    },
    QGStorageSetFloatSync(key, value) {
        storage.setData(key, value);
    },
    QGStorageGetStringSync(key, defaultValue) {
        return storage.getData(key, defaultValue) || '';
    },
    QGStorageSetStringSync(key, value) {
        storage.setData(key, value);
    },
    QGStorageDeleteAllSync() {
        storage.deleteAll();
    },
    QGStorageDeleteKeySync(key) {
        storage.deleteKey(key);
    },
    QGStorageHasKeySync(key) {
        return storage.getData(key, '') !== '';
    },
};
