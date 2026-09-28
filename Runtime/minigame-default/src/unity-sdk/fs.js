import response from './response';
import moduleHelper from './module-helper';
import { cacheArrayBuffer, formatJsonStr, formatResponse } from './utils';
import { fileInfoHandler, fileInfoType, responseWrapper } from './file-info';
function runMethod(method, option, callbackId, isString = false) {
    try {
        const fs = qg.getFileSystemManager();
        let config;
        if (typeof option === 'string') {
            config = formatJsonStr(option);
        }
        else {
            config = option;
        }
        if (method === 'readZipEntry' && !config.encoding) {
            config.encoding = 'utf-8';
            console.error('fs.readZipEntry不支持读取ArrayBuffer，已改为utf-8');
        }
        
        fs[method]({
            ...config,
            success(res) {
                let returnRes = '';
                console.log("runMethod success "+method);
                if (method === 'read') {
                    cacheArrayBuffer(callbackId, res.arrayBuffer);
                    returnRes = JSON.stringify({
                        bytesRead: res.bytesRead,
                        arrayBufferLength: res.arrayBuffer?.byteLength ?? 0,
                    });
                }
                else if (method === 'readCompressedFile') {
                    cacheArrayBuffer(callbackId, res.data);
                    returnRes = JSON.stringify({
                        arrayBufferLength: res.data?.byteLength ?? 0,
                    });
                }
                else if (method === 'readFile') {
                    if (config.encoding) {
                        returnRes = JSON.stringify({
                            stringData: res.data || '',
                        });
                    }
                    else {
                        cacheArrayBuffer(callbackId, res.data);
                        returnRes = JSON.stringify({
                            arrayBufferLength: res.data?.byteLength ?? 0,
                        });
                    }
                }
                else {
                    returnRes = JSON.stringify(res);
                }
                // console.log(`fs.${method} success:`, res);
                moduleHelper.send('FileSystemManagerCallback', JSON.stringify({
                    callbackId, type: 'success', res: returnRes, method: isString ? `${method}_string` : method,
                }));
            },
            fail(res) {
                console.log("runMethod fail "+method);
                moduleHelper.send('FileSystemManagerCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res), method: isString ? `${method}_string` : method,
                }));
            },
            complete(res) {
                moduleHelper.send('FileSystemManagerCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res), method: isString ? `${method}_string` : method,
                }));
            },
        });
    }
    catch (e) {
        moduleHelper.send('FileSystemManagerCallback', JSON.stringify({
            callbackId, type: 'complete', res: 'fail', method: isString ? `${method}_string` : method,
        }));
    }
}
export default {
    QGGetUserDataPath() {
        return qg.env.USER_DATA_PATH;
    },
    QGWriteFileSync(filePath, data, encoding) {
        try {
            const fs = qg.getFileSystemManager();
            
            fs.writeFileSync(filePath, data, encoding);
            fileInfoHandler.addFileInfo(filePath, data);
        }
        catch (e) {
            console.error(e);
            if (e.message) {
                return e.message;
            }
            return 'fail';
        }
        return 'ok';
    },
    QGAccessFileSync(filePath) {
        try {
            const fs = qg.getFileSystemManager();
            fs.accessSync(filePath);
            return 'access:ok';
        }
        catch (e) {
            
            if (e.message) {
                return e.message;
            }
            return 'fail';
        }
    },
    QGAccessFile(path, s, f, c) {
        const fs = qg.getFileSystemManager();
        fs.access({
            path,
            ...response.handleText(s, f, c),
        });
    },
    QGCopyFileSync(src, dst) {
        try {
            const fs = qg.getFileSystemManager();
            fs.copyFileSync(src, dst);
            return 'copyFile:ok';
        }
        catch (e) {
            console.error(e);
            if (e.message) {
                return e.message;
            }
            return 'fail';
        }
    },
    QGCopyFile(srcPath, destPath, s, f, c) {
        const fs = qg.getFileSystemManager();
        fs.copyFile({
            srcPath,
            destPath,
            ...response.handleText(s, f, c),
        });
    },
    QGUnlinkSync(filePath) {
        try {
            const fs = qg.getFileSystemManager();
            fs.unlinkSync(filePath);
            fileInfoHandler.removeFileInfo(filePath);
            return 'unlink:ok';
        }
        catch (e) {
            console.error(e);
            if (e.message) {
                return e.message;
            }
            return 'fail';
        }
    },
    QGUnlink(filePath, s, f, c) {
        const fs = qg.getFileSystemManager();
        fs.unlink({
            filePath,
            ...responseWrapper(response.handleText(s, f, c), { filePath, type: fileInfoType.remove }),
        });
    },
    QGWriteFile(filePath, data, encoding, s, f, c) {
        const fs = qg.getFileSystemManager();
        fs.writeFile({
            filePath,
            data: data.buffer,
            encoding,
            ...responseWrapper(response.handleTextLongBack(s, f, c), { filePath, data: data.buffer, type: fileInfoType.add }),
        });
    },
    QGWriteStringFile(filePath, data, encoding, s, f, c) {
        const fs = qg.getFileSystemManager();
        fs.writeFile({
            filePath,
            data,
            encoding,
            ...responseWrapper(response.handleTextLongBack(s, f, c), { filePath, data, type: fileInfoType.add }),
        });
    },
    QGAppendFile(filePath, data, encoding, s, f, c) {
        const fs = qg.getFileSystemManager();
        fs.appendFile({
            filePath,
            data: data.buffer,
            encoding,
            ...response.handleTextLongBack(s, f, c),
        });
    },
    QGAppendStringFile(filePath, data, encoding, s, f, c) {
        const fs = qg.getFileSystemManager();
        fs.appendFile({
            filePath,
            data,
            encoding,
            ...response.handleTextLongBack(s, f, c),
        });
    },
    QGWriteBinFileSync(filePath, data, encoding) {
        const fs = qg.getFileSystemManager();
        try {
            fs.writeFileSync(filePath, data.buffer, encoding);
            fileInfoHandler.addFileInfo(filePath, data.buffer);
        }
        catch (e) {
            console.error(e);
            if (e.message) {
                return e.message;
            }
            return 'fail';
        }
        return 'ok';
    },
    QGReadFile(option, callbackId) {
        runMethod('readFile', option, callbackId);
    },
    QGReadFileSync(option) {
        const fs = qg.getFileSystemManager();
        const config = formatJsonStr(option);
        try {
            const { filePath } = config;
            const res = fs.readFileSync(config.filePath, config.encoding, config.position, config.length);
            if (!config.encoding && typeof res !== 'string') {
                cacheArrayBuffer(filePath, res);
                return `${res.byteLength}`;
            }
            return res;
        }
        catch (e) {
            console.error(e);
            if (e.message) {
                return e.message;
            }
            return 'fail';
        }
    },
    QGMkdir(dirPath, recursive, s, f, c) {
        const fs = qg.getFileSystemManager();
        fs.mkdir({
            dirPath,
            recursive: Boolean(recursive),
            ...response.handleText(s, f, c),
        });
    },
    QGMkdirSync(dirPath, recursive) {
        try {
            const fs = qg.getFileSystemManager();
            fs.mkdirSync(dirPath, Boolean(recursive));
            return 'mkdir:ok';
        }
        catch (e) {
            console.error(e);
            if (e.message) {
                return e.message;
            }
            return 'fail';
        }
    },
    QGRmdir(dirPath, recursive, s, f, c) {
        const fs = qg.getFileSystemManager();
        fs.rmdir({
            dirPath,
            recursive: Boolean(recursive),
            ...response.handleText(s, f, c),
        });
    },
    QGRmdirSync(dirPath, recursive) {
        try {
            const fs = qg.getFileSystemManager();
            fs.rmdirSync(dirPath, Boolean(recursive));
            return 'rmdirSync:ok';
        }
        catch (e) {
            console.error(e);
            if (e.message) {
                return e.message;
            }
            return 'fail';
        }
    },
    QGStat(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getFileSystemManager().stat({
            ...config,
            success(res) {
                if (!Array.isArray(res.stats)) {
                    
                    res.one_stat = res.stats;
                    
                    res.stats = null;
                }
                moduleHelper.send('StatCallback', JSON.stringify({
                    callbackId,
                    type: 'success',
                    res: JSON.stringify(res),
                }));
            },
            fail(res) {
                moduleHelper.send('StatCallback', JSON.stringify({
                    callbackId,
                    type: 'fail',
                    res: JSON.stringify(res),
                }));
            },
            complete(res) {
                
                if (!Array.isArray(res.stats)) {
                    
                    res.one_stat = res.stats;
                    
                    res.stats = null;
                }
                moduleHelper.send('StatCallback', JSON.stringify({
                    callbackId,
                    type: 'complete',
                    res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_FileSystemManagerClose(option, callbackId) {
        runMethod('close', option, callbackId);
    },
    QG_FileSystemManagerFstat(option, callbackId) {
        runMethod('fstat', option, callbackId);
    },
    QG_FileSystemManagerFtruncate(option, callbackId) {
        runMethod('ftruncate', option, callbackId);
    },
    QG_FileSystemManagerGetFileInfo(option, callbackId) {
        runMethod('getFileInfo', option, callbackId);
    },
    QG_FileSystemManagerGetSavedFileList(option, callbackId) {
        runMethod('getSavedFileList', option, callbackId);
    },
    QG_FileSystemManagerOpen(option, callbackId) {
        runMethod('open', option, callbackId);
    },
    QG_FileSystemManagerRead(option, data, callbackId) {
        const config = formatJsonStr(option);
        config.arrayBuffer = data.buffer;
        runMethod('read', config, callbackId);
    },
    QG_FileSystemManagerReadCompressedFile(option, callbackId) {
        runMethod('readCompressedFile', option, callbackId);
    },
    QG_FileSystemManagerReadZipEntry(option, callbackId) {
        runMethod('readZipEntry', option, callbackId);
    },
    QG_FileSystemManagerReadZipEntryString(option, callbackId) {
        runMethod('readZipEntry', option, callbackId, true);
    },
    QG_FileSystemManagerReaddir(option, callbackId) {
        console.log("QG_FileSystemManagerReaddir");
        runMethod('readdir', option, callbackId);
    },
    QG_FileSystemManagerRemoveSavedFile(option, callbackId) {
        runMethod('removeSavedFile', option, callbackId);
    },
    QG_FileSystemManagerRename(option, callbackId) {
        runMethod('rename', option, callbackId);
    },
    QG_FileSystemManagerSaveFile(option, callbackId) {
        runMethod('saveFile', option, callbackId);
    },
    QG_FileSystemManagerTruncate(option, callbackId) {
        runMethod('truncate', option, callbackId);
    },
    QG_FileSystemManagerUnzip(option, callbackId) {
        runMethod('unzip', option, callbackId);
    },
    QG_FileSystemManagerWrite(option, data, callbackId) {
        const config = formatJsonStr(option);
        config.data = data.buffer;
        runMethod('write', config, callbackId);
    },
    QG_FileSystemManagerWriteString(option, callbackId) {
        runMethod('write', option, callbackId, true);
    },
    QG_FileSystemManagerReaddirSync(dirPath) {
        const fs = qg.getFileSystemManager();
        try {
            
            return JSON.stringify(fs.readdirSync(dirPath) || []);
        }
        catch (e) {
            console.error(e);
            return '[]';
        }
    },
    QG_FileSystemManagerReadCompressedFileSync(option, callbackId) {
        const fs = qg.getFileSystemManager();
        const res = fs.readCompressedFileSync(formatJsonStr(option));
        cacheArrayBuffer(callbackId, res);
        return res.byteLength;
    },
    QG_FileSystemManagerAppendFileStringSync(filePath, data, encoding) {
        const fs = qg.getFileSystemManager();
        fs.appendFileSync(filePath, data, encoding);
    },
    QG_FileSystemManagerAppendFileSync(filePath, data, encoding) {
        const fs = qg.getFileSystemManager();
        fs.appendFileSync(filePath, data.buffer, encoding);
    },
    QG_FileSystemManagerRenameSync(oldPath, newPath) {
        const fs = qg.getFileSystemManager();
        fs.renameSync(oldPath, newPath);
        return 'ok';
    },
    QG_FileSystemManagerReadSync(option, callbackId) {
        const fs = qg.getFileSystemManager();
        const res = fs.readSync(formatJsonStr(option));
        cacheArrayBuffer(callbackId, res.arrayBuffer);
        return JSON.stringify({
            bytesRead: res.bytesRead,
            arrayBufferLength: res.arrayBuffer?.byteLength ?? 0,
        });
    },
    QG_FileSystemManagerFstatSync(option) {
        const fs = qg.getFileSystemManager();
        const res = fs.fstatSync(formatJsonStr(option));
        formatResponse('Stats', res);
        return JSON.stringify(res);
    },
    QG_FileSystemManagerStatSync(path, recursive) {
        const fs = qg.getFileSystemManager();
        const res = fs.statSync(path, recursive);
        let resArray;
        if (Array.isArray(res)) {
            resArray = res;
        }
        else {
            resArray = [res];
        }
        return JSON.stringify(resArray);
    },
    QG_FileSystemManagerWriteSync(option, data) {
        const fs = qg.getFileSystemManager();
        const optionConfig = formatJsonStr(option);
        optionConfig.data = data.buffer;
        const res = fs.writeSync(optionConfig);
        return JSON.stringify({
            mode: res.bytesWritten,
        });
    },
    QG_FileSystemManagerWriteStringSync(option) {
        const fs = qg.getFileSystemManager();
        const res = fs.writeSync(formatJsonStr(option));
        return JSON.stringify({
            mode: res.bytesWritten,
        });
    },
    QG_FileSystemManagerOpenSync(option) {
        const fs = qg.getFileSystemManager();
        return fs.openSync(formatJsonStr(option));
    },
    QG_FileSystemManagerSaveFileSync(tempFilePath, filePath) {
        const fs = qg.getFileSystemManager();
        return fs.saveFileSync(tempFilePath, filePath);
    },
    QG_FileSystemManagerCloseSync(option) {
        const fs = qg.getFileSystemManager();
        fs.closeSync(formatJsonStr(option));
        return 'ok';
    },
    QG_FileSystemManagerFtruncateSync(option) {
        const fs = qg.getFileSystemManager();
        fs.ftruncateSync(formatJsonStr(option));
        return 'ok';
    },
    QG_FileSystemManagerTruncateSync(option) {
        const fs = qg.getFileSystemManager();
        fs.truncateSync(formatJsonStr(option));
        return 'ok';
    },
};
