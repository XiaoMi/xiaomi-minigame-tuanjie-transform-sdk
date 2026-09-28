
import moduleHelper from './module-helper';
import { uid, formatResponse, formatJsonStr, onEventCallback, offEventCallback, getListObject, stringifyRes } from './utils';
let OnAccelerometerChangeList;
let OnAudioInterruptionBeginList;
let OnAudioInterruptionEndList;
let OnBLEConnectionStateChangeList;
let OnBLEMTUChangeList;
let OnBLEPeripheralConnectionStateChangedList;
let OnBeaconServiceChangeList;
let OnBeaconUpdateList;
let OnBluetoothAdapterStateChangeList;
let OnBluetoothDeviceFoundList;
let OnCompassChangeList;
let OnDeviceMotionChangeList;
let OnDeviceOrientationChangeList;
let OnErrorList;
let OnHideList;
let OnInteractiveStorageModifiedList;
let OnKeyDownList;
let OnKeyUpList;
let OnKeyboardCompleteList;
let OnKeyboardConfirmList;
let OnKeyboardHeightChangeList;
let OnKeyboardInputList;
let OnMemoryWarningList;
let OnMouseDownList;
let OnMouseMoveList;
let OnMouseUpList;
let OnNetworkStatusChangeList;
let OnNetworkWeakChangeList;
let OnScreenRecordingStateChangedList;
let OnShowList;
let OnUnhandledRejectionList;
let OnUserCaptureScreenList;
let OnVoIPChatInterruptedList;
let OnVoIPChatMembersChangedList;
let OnVoIPChatSpeakersChangedList;
let OnVoIPChatStateChangedList;
let OnWheelList;
let OnWindowResizeList;
let qgOnAddToFavoritesResolveConf;
let qgOnCopyUrlResolveConf;
let qgOnHandoffResolveConf;
let qgOnShareTimelineResolveConf;
let qgOnGameLiveStateChangeResolveConf;
const DownloadTaskList = {};
const FeedbackButtonList = {};
const LogManagerList = {};
const RealtimeLogManagerList = {};
const UpdateManagerList = {};
const VideoDecoderList = {};
const qgDownloadTaskHeadersReceivedList = {};
const qgDownloadTaskProgressUpdateList = {};
const qgFeedbackButtonTapList = {};
const qgVideoDecoderList = {};
const getDownloadTaskObject = getListObject(DownloadTaskList, 'DownloadTask');
const getFeedbackButtonObject = getListObject(FeedbackButtonList, 'FeedbackButton');
const getLogManagerObject = getListObject(LogManagerList, 'LogManager');
const getRealtimeLogManagerObject = getListObject(RealtimeLogManagerList, 'RealtimeLogManager');
const getUpdateManagerObject = getListObject(UpdateManagerList, 'UpdateManager');
const getVideoDecoderObject = getListObject(VideoDecoderList, 'VideoDecoder');
export default {
    QG_AddCard(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.addCard({
            ...config,
            success(res) {
                formatResponse('AddCardSuccessCallbackResult', res);
                moduleHelper.send('AddCardCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('AddCardCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('AddCardCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_AuthPrivateMessage(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.authPrivateMessage({
            ...config,
            success(res) {
                formatResponse('AuthPrivateMessageSuccessCallbackResult', res);
                moduleHelper.send('AuthPrivateMessageCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('AuthPrivateMessageCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('AuthPrivateMessageCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_Authorize(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.authorize({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('AuthorizeCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('AuthorizeCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('AuthorizeCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_CheckIsAddedToMyMiniProgram(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.checkIsAddedToMyMiniProgram({
            ...config,
            success(res) {
                formatResponse('CheckIsAddedToMyMiniProgramSuccessCallbackResult', res);
                moduleHelper.send('CheckIsAddedToMyMiniProgramCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('CheckIsAddedToMyMiniProgramCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('CheckIsAddedToMyMiniProgramCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_CheckSession(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.checkSession({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('CheckSessionCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('CheckSessionCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('CheckSessionCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_ChooseImage(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.chooseImage({
            ...config,
            success(res) {
                formatResponse('ChooseImageSuccessCallbackResult', res);
                moduleHelper.send('ChooseImageCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ChooseImageCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ChooseImageCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_ChooseMedia(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.chooseMedia({
            ...config,
            success(res) {
                formatResponse('ChooseMediaSuccessCallbackResult', res);
                moduleHelper.send('ChooseMediaCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ChooseMediaCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ChooseMediaCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_ChooseMessageFile(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.chooseMessageFile({
            ...config,
            success(res) {
                formatResponse('ChooseMessageFileSuccessCallbackResult', res);
                moduleHelper.send('ChooseMessageFileCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ChooseMessageFileCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ChooseMessageFileCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_CloseBLEConnection(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.closeBLEConnection({
            ...config,
            success(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('CloseBLEConnectionCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('CloseBLEConnectionCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('CloseBLEConnectionCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_CloseBluetoothAdapter(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.closeBluetoothAdapter({
            ...config,
            success(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('CloseBluetoothAdapterCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('CloseBluetoothAdapterCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('CloseBluetoothAdapterCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_CompressImage(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.compressImage({
            ...config,
            success(res) {
                formatResponse('CompressImageSuccessCallbackResult', res);
                moduleHelper.send('CompressImageCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('CompressImageCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('CompressImageCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_CreateBLEConnection(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.createBLEConnection({
            ...config,
            success(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('CreateBLEConnectionCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('CreateBLEConnectionCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('CreateBLEConnectionCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_CreateBLEPeripheralServer(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.createBLEPeripheralServer({
            ...config,
            success(res) {
                formatResponse('CreateBLEPeripheralServerSuccessCallbackResult', res);
                moduleHelper.send('CreateBLEPeripheralServerCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('CreateBLEPeripheralServerCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('CreateBLEPeripheralServerCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_ExitMiniProgram(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.exitMiniProgram({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ExitMiniProgramCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ExitMiniProgramCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ExitMiniProgramCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_ExitVoIPChat(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.exitVoIPChat({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ExitVoIPChatCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ExitVoIPChatCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ExitVoIPChatCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_FaceDetect(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.faceDetect({
            ...config,
            success(res) {
                formatResponse('FaceDetectSuccessCallbackResult', res);
                moduleHelper.send('FaceDetectCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('FaceDetectCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('FaceDetectCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetAvailableAudioSources(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getAvailableAudioSources({
            ...config,
            success(res) {
                formatResponse('GetAvailableAudioSourcesSuccessCallbackResult', res);
                moduleHelper.send('GetAvailableAudioSourcesCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetAvailableAudioSourcesCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetAvailableAudioSourcesCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetBLEDeviceCharacteristics(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getBLEDeviceCharacteristics({
            ...config,
            success(res) {
                formatResponse('GetBLEDeviceCharacteristicsSuccessCallbackResult', res);
                moduleHelper.send('GetBLEDeviceCharacteristicsCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('GetBLEDeviceCharacteristicsCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('GetBLEDeviceCharacteristicsCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetBLEDeviceRSSI(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getBLEDeviceRSSI({
            ...config,
            success(res) {
                formatResponse('GetBLEDeviceRSSISuccessCallbackResult', res);
                moduleHelper.send('GetBLEDeviceRSSICallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetBLEDeviceRSSICallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetBLEDeviceRSSICallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetBLEDeviceServices(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getBLEDeviceServices({
            ...config,
            success(res) {
                formatResponse('GetBLEDeviceServicesSuccessCallbackResult', res);
                moduleHelper.send('GetBLEDeviceServicesCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('GetBLEDeviceServicesCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('GetBLEDeviceServicesCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetBLEMTU(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getBLEMTU({
            ...config,
            success(res) {
                formatResponse('GetBLEMTUSuccessCallbackResult', res);
                moduleHelper.send('GetBLEMTUCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('GetBLEMTUCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('GetBLEMTUCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetBackgroundFetchData(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getBackgroundFetchData({
            ...config,
            success(res) {
                formatResponse('GetBackgroundFetchDataSuccessCallbackResult', res);
                moduleHelper.send('GetBackgroundFetchDataCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetBackgroundFetchDataCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetBackgroundFetchDataCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetBackgroundFetchToken(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getBackgroundFetchToken({
            ...config,
            success(res) {
                formatResponse('GetBackgroundFetchTokenSuccessCallbackResult', res);
                moduleHelper.send('GetBackgroundFetchTokenCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetBackgroundFetchTokenCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetBackgroundFetchTokenCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetBatteryInfo(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getBatteryInfo({
            ...config,
            success(res) {
                formatResponse('GetBatteryInfoSuccessCallbackResult', res);
                moduleHelper.send('GetBatteryInfoCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetBatteryInfoCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetBatteryInfoCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetBeacons(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getBeacons({
            ...config,
            success(res) {
                formatResponse('GetBeaconsSuccessCallbackResult', res);
                moduleHelper.send('GetBeaconsCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BeaconError', res);
                moduleHelper.send('GetBeaconsCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BeaconError', res);
                moduleHelper.send('GetBeaconsCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetBluetoothAdapterState(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getBluetoothAdapterState({
            ...config,
            success(res) {
                formatResponse('GetBluetoothAdapterStateSuccessCallbackResult', res);
                moduleHelper.send('GetBluetoothAdapterStateCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('GetBluetoothAdapterStateCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('GetBluetoothAdapterStateCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetBluetoothDevices(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getBluetoothDevices({
            ...config,
            success(res) {
                formatResponse('GetBluetoothDevicesSuccessCallbackResult', res);
                moduleHelper.send('GetBluetoothDevicesCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('GetBluetoothDevicesCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('GetBluetoothDevicesCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetChannelsLiveInfo(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getChannelsLiveInfo({
            ...config,
            success(res) {
                formatResponse('GetChannelsLiveInfoSuccessCallbackResult', res);
                moduleHelper.send('GetChannelsLiveInfoCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetChannelsLiveInfoCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetChannelsLiveInfoCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetChannelsLiveNoticeInfo(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getChannelsLiveNoticeInfo({
            ...config,
            success(res) {
                formatResponse('GetChannelsLiveNoticeInfoSuccessCallbackResult', res);
                moduleHelper.send('GetChannelsLiveNoticeInfoCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetChannelsLiveNoticeInfoCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetChannelsLiveNoticeInfoCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetClipboardData(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getClipboardData({
            ...config,
            success(res) {
                formatResponse('GetClipboardDataSuccessCallbackOption', res);
                moduleHelper.send('GetClipboardDataCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetClipboardDataCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetClipboardDataCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetConnectedBluetoothDevices(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getConnectedBluetoothDevices({
            ...config,
            success(res) {
                formatResponse('GetConnectedBluetoothDevicesSuccessCallbackResult', res);
                moduleHelper.send('GetConnectedBluetoothDevicesCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('GetConnectedBluetoothDevicesCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('GetConnectedBluetoothDevicesCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetExtConfig(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getExtConfig({
            ...config,
            success(res) {
                formatResponse('GetExtConfigSuccessCallbackResult', res);
                moduleHelper.send('GetExtConfigCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetExtConfigCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetExtConfigCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetFuzzyLocation(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getFuzzyLocation({
            ...config,
            success(res) {
                formatResponse('GetFuzzyLocationSuccessCallbackResult', res);
                moduleHelper.send('GetFuzzyLocationCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetFuzzyLocationCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetFuzzyLocationCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetGameClubData(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getGameClubData({
            ...config,
            success(res) {
                formatResponse('GetGameClubDataSuccessCallbackResult', res);
                moduleHelper.send('GetGameClubDataCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetGameClubDataCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetGameClubDataCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetGroupEnterInfo(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getGroupEnterInfo({
            ...config,
            success(res) {
                formatResponse('GetGroupEnterInfoSuccessCallbackResult', res);
                moduleHelper.send('GetGroupEnterInfoCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetGroupEnterInfoCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetGroupEnterInfoCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetInferenceEnvInfo(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getInferenceEnvInfo({
            ...config,
            success(res) {
                formatResponse('GetInferenceEnvInfoSuccessCallbackResult', res);
                moduleHelper.send('GetInferenceEnvInfoCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetInferenceEnvInfoCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetInferenceEnvInfoCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetLocalIPAddress(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getLocalIPAddress({
            ...config,
            success(res) {
                formatResponse('GetLocalIPAddressSuccessCallbackResult', res);
                moduleHelper.send('GetLocalIPAddressCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetLocalIPAddressCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetLocalIPAddressCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetNetworkType(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getNetworkType({
            ...config,
            success(res) {
                formatResponse('GetNetworkTypeSuccessCallbackResult', res);
                moduleHelper.send('GetNetworkTypeCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetNetworkTypeCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetNetworkTypeCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetPrivacySetting(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getPrivacySetting({
            ...config,
            success(res) {
                formatResponse('GetPrivacySettingSuccessCallbackResult', res);
                moduleHelper.send('GetPrivacySettingCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetPrivacySettingCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetPrivacySettingCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetScreenBrightness(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getScreenBrightness({
            ...config,
            success(res) {
                formatResponse('GetScreenBrightnessSuccessCallbackOption', res);
                moduleHelper.send('GetScreenBrightnessCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetScreenBrightnessCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetScreenBrightnessCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetScreenRecordingState(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getScreenRecordingState({
            ...config,
            success(res) {
                formatResponse('GetScreenRecordingStateSuccessCallbackResult', res);
                moduleHelper.send('GetScreenRecordingStateCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetScreenRecordingStateCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetScreenRecordingStateCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetSetting(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getSetting({
            ...config,
            success(res) {
                formatResponse('GetSettingSuccessCallbackResult', res);
                moduleHelper.send('GetSettingCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetSettingCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetSettingCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetShareInfo(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getShareInfo({
            ...config,
            success(res) {
                formatResponse('GetGroupEnterInfoSuccessCallbackResult', res);
                moduleHelper.send('GetShareInfoCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetShareInfoCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetShareInfoCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetStorageInfo(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getStorageInfo({
            ...config,
            success(res) {
                formatResponse('GetStorageInfoSuccessCallbackOption', res);
                moduleHelper.send('GetStorageInfoCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetStorageInfoCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetStorageInfoCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetSystemInfo(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getSystemInfo({
            ...config,
            success(res) {
                formatResponse('SystemInfo', res);
                moduleHelper.send('GetSystemInfoCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetSystemInfoCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetSystemInfoCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetSystemInfoAsync(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getSystemInfoAsync({
            ...config,
            success(res) {
                formatResponse('SystemInfo', res);
                moduleHelper.send('GetSystemInfoAsyncCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetSystemInfoAsyncCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetSystemInfoAsyncCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetUserCloudStorage(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getUserCloudStorage({
            ...config,
            success(res) {
                formatResponse('GetUserCloudStorageSuccessCallbackResult', res);
                moduleHelper.send('GetUserCloudStorageCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetUserCloudStorageCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetUserCloudStorageCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetUserCloudStorageKeys(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getUserCloudStorageKeys({
            ...config,
            success(res) {
                formatResponse('GetUserCloudStorageKeysSuccessCallbackResult', res);
                moduleHelper.send('GetUserCloudStorageKeysCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetUserCloudStorageKeysCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetUserCloudStorageKeysCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetUserInfo(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getUserInfo({
            ...config,
            success(res) {
                formatResponse('GetUserInfoSuccessCallbackResult', res);
                moduleHelper.send('GetUserInfoCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetUserInfoCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetUserInfoCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetUserInteractiveStorage(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getUserInteractiveStorage({
            ...config,
            success(res) {
                formatResponse('GetUserInteractiveStorageSuccessCallbackResult', res);
                moduleHelper.send('GetUserInteractiveStorageCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GetUserInteractiveStorageFailCallbackResult', res);
                moduleHelper.send('GetUserInteractiveStorageCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetUserInteractiveStorageCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetWeRunData(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getWeRunData({
            ...config,
            success(res) {
                formatResponse('GetWeRunDataSuccessCallbackResult', res);
                moduleHelper.send('GetWeRunDataCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetWeRunDataCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetWeRunDataCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_HideKeyboard(conf, callbackId) {
        const config = formatJsonStr(conf);
        delete config.success;
        delete config.fail;
        delete config.complete;
        qg.hideKeyboard({
            ...config,
            success(res) {
                // formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('HideKeyboardCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify({errMsg:res}),
                }));
            },
            fail(res) {
                // formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('HideKeyboardCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify({errMsg:res}),
                }));
            },
            complete(res) {
                // formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('HideKeyboardCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify({errMsg:res}),
                }));
            },
        });
    },
    QG_HideLoading(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.hideLoading({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('HideLoadingCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('HideLoadingCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('HideLoadingCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_HideShareMenu(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.hideShareMenu({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('HideShareMenuCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('HideShareMenuCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('HideShareMenuCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_HideToast(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.hideToast({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('HideToastCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('HideToastCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('HideToastCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_InitFaceDetect(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.initFaceDetect({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('InitFaceDetectCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('InitFaceDetectCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('InitFaceDetectCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_IsBluetoothDevicePaired(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.isBluetoothDevicePaired({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('IsBluetoothDevicePairedCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('IsBluetoothDevicePairedCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('IsBluetoothDevicePairedCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_JoinVoIPChat(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.joinVoIPChat({
            ...config,
            success(res) {
                formatResponse('JoinVoIPChatSuccessCallbackResult', res);
                moduleHelper.send('JoinVoIPChatCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('JoinVoIPChatError', res);
                moduleHelper.send('JoinVoIPChatCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('JoinVoIPChatError', res);
                moduleHelper.send('JoinVoIPChatCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_MakeBluetoothPair(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.makeBluetoothPair({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('MakeBluetoothPairCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('MakeBluetoothPairCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('MakeBluetoothPairCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_NavigateToMiniProgram(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.navigateToMiniProgram({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('NavigateToMiniProgramCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('NavigateToMiniProgramCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('NavigateToMiniProgramCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_NotifyBLECharacteristicValueChange(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.notifyBLECharacteristicValueChange({
            ...config,
            success(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('NotifyBLECharacteristicValueChangeCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('NotifyBLECharacteristicValueChangeCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('NotifyBLECharacteristicValueChangeCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_OpenAppAuthorizeSetting(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.openAppAuthorizeSetting({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenAppAuthorizeSettingCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenAppAuthorizeSettingCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenAppAuthorizeSettingCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_OpenBluetoothAdapter(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.openBluetoothAdapter({
            ...config,
            success(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('OpenBluetoothAdapterCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('OpenBluetoothAdapterCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('OpenBluetoothAdapterCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_OpenCard(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.openCard({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenCardCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenCardCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenCardCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_OpenChannelsActivity(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.openChannelsActivity({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenChannelsActivityCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenChannelsActivityCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenChannelsActivityCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_OpenChannelsEvent(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.openChannelsEvent({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenChannelsEventCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenChannelsEventCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenChannelsEventCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_OpenChannelsLive(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.openChannelsLive({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenChannelsLiveCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenChannelsLiveCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenChannelsLiveCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_OpenChannelsUserProfile(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.openChannelsUserProfile({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenChannelsUserProfileCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenChannelsUserProfileCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenChannelsUserProfileCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_OpenCustomerServiceChat(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.openCustomerServiceChat({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenCustomerServiceChatCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenCustomerServiceChatCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenCustomerServiceChatCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_OpenCustomerServiceConversation(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.openCustomerServiceConversation({
            ...config,
            success(res) {
                formatResponse('OpenCustomerServiceConversationSuccessCallbackResult', res);
                moduleHelper.send('OpenCustomerServiceConversationCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenCustomerServiceConversationCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenCustomerServiceConversationCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_OpenPrivacyContract(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.openPrivacyContract({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenPrivacyContractCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenPrivacyContractCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenPrivacyContractCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_OpenSetting(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.openSetting({
            ...config,
            success(res) {
                formatResponse('OpenSettingSuccessCallbackResult', res);
                moduleHelper.send('OpenSettingCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenSettingCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenSettingCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_OpenSystemBluetoothSetting(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.openSystemBluetoothSetting({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenSystemBluetoothSettingCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenSystemBluetoothSettingCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenSystemBluetoothSettingCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_PreviewImage(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.previewImage({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('PreviewImageCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('PreviewImageCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('PreviewImageCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_PreviewMedia(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.previewMedia({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('PreviewMediaCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('PreviewMediaCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('PreviewMediaCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_ReadBLECharacteristicValue(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.readBLECharacteristicValue({
            ...config,
            success(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('ReadBLECharacteristicValueCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('ReadBLECharacteristicValueCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('ReadBLECharacteristicValueCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_RemoveStorage(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.removeStorage({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RemoveStorageCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RemoveStorageCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RemoveStorageCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_RemoveUserCloudStorage(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.removeUserCloudStorage({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RemoveUserCloudStorageCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RemoveUserCloudStorageCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RemoveUserCloudStorageCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_ReportScene(conf, callbackId) {
        const config = formatJsonStr(conf);
        if (GameGlobal.manager && GameGlobal.manager.setGameStage) {
            GameGlobal.manager.setGameStage(config.sceneId);
        }
        qg.reportScene({
            ...config,
            success(res) {
                formatResponse('ReportSceneSuccessCallbackResult', res);
                moduleHelper.send('ReportSceneCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('ReportSceneFailCallbackErr', res);
                moduleHelper.send('ReportSceneCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('ReportSceneError', res);
                moduleHelper.send('ReportSceneCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_RequestMidasFriendPayment(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.requestMidasFriendPayment({
            ...config,
            success(res) {
                formatResponse('RequestMidasFriendPaymentSuccessCallbackResult', res);
                moduleHelper.send('RequestMidasFriendPaymentCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('MidasFriendPaymentError', res);
                moduleHelper.send('RequestMidasFriendPaymentCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('MidasFriendPaymentError', res);
                moduleHelper.send('RequestMidasFriendPaymentCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_RequestMidasPayment(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.requestMidasPayment({
            ...config,
            success(res) {
                formatResponse('RequestMidasPaymentSuccessCallbackResult', res);
                moduleHelper.send('RequestMidasPaymentCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('RequestMidasPaymentFailCallbackErr', res);
                moduleHelper.send('RequestMidasPaymentCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('MidasPaymentError', res);
                moduleHelper.send('RequestMidasPaymentCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_RequestSubscribeMessage(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.requestSubscribeMessage({
            ...config,
            success(res) {
                formatResponse('RequestSubscribeMessageSuccessCallbackResult', res);
                moduleHelper.send('RequestSubscribeMessageCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('RequestSubscribeMessageFailCallbackResult', res);
                moduleHelper.send('RequestSubscribeMessageCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RequestSubscribeMessageCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_RequestSubscribeSystemMessage(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.requestSubscribeSystemMessage({
            ...config,
            success(res) {
                formatResponse('RequestSubscribeSystemMessageSuccessCallbackResult', res);
                moduleHelper.send('RequestSubscribeSystemMessageCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('RequestSubscribeMessageFailCallbackResult', res);
                moduleHelper.send('RequestSubscribeSystemMessageCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RequestSubscribeSystemMessageCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_RequirePrivacyAuthorize(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.requirePrivacyAuthorize({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RequirePrivacyAuthorizeCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RequirePrivacyAuthorizeCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RequirePrivacyAuthorizeCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_RestartMiniProgram(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.restartMiniProgram({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RestartMiniProgramCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RestartMiniProgramCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RestartMiniProgramCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_SaveFileToDisk(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.saveFileToDisk({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SaveFileToDiskCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SaveFileToDiskCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SaveFileToDiskCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_SaveImageToPhotosAlbum(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.saveImageToPhotosAlbum({
            ...config,
            success(res) {
                moduleHelper.send('SaveImageToPhotosAlbumCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify({errMsg:res}),
                }));
            },
            fail(res) {
                moduleHelper.send('SaveImageToPhotosAlbumCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify({errMsg:res}),
                }));
            },
            complete(res) {
                moduleHelper.send('SaveImageToPhotosAlbumCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify({errMsg:res}),
                }));
            },
        });
    },
    QG_ScanCode(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.scanCode({
            ...config,
            success(res) {
                formatResponse('ScanCodeSuccessCallbackResult', res);
                moduleHelper.send('ScanCodeCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ScanCodeCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ScanCodeCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_SetBLEMTU(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.setBLEMTU({
            ...config,
            success(res) {
                formatResponse('SetBLEMTUSuccessCallbackResult', res);
                moduleHelper.send('SetBLEMTUCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('SetBLEMTUFailCallbackResult', res);
                moduleHelper.send('SetBLEMTUCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetBLEMTUCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_SetBackgroundFetchToken(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.setBackgroundFetchToken({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetBackgroundFetchTokenCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetBackgroundFetchTokenCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetBackgroundFetchTokenCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_SetClipboardData(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.setClipboardData({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetClipboardDataCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetClipboardDataCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetClipboardDataCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_SetDeviceOrientation(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.setDeviceOrientation({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetDeviceOrientationCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetDeviceOrientationCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetDeviceOrientationCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_SetEnableDebug(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.setEnableDebug({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetEnableDebugCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetEnableDebugCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetEnableDebugCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_SetInnerAudioOption(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.setInnerAudioOption({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetInnerAudioOptionCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetInnerAudioOptionCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetInnerAudioOptionCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_SetKeepScreenOn(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.setKeepScreenOn({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetKeepScreenOnCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetKeepScreenOnCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetKeepScreenOnCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_SetMenuStyle(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.setMenuStyle({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetMenuStyleCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetMenuStyleCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetMenuStyleCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_SetScreenBrightness(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.setScreenBrightness({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetScreenBrightnessCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetScreenBrightnessCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetScreenBrightnessCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_SetStatusBarStyle(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.setStatusBarStyle({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetStatusBarStyleCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetStatusBarStyleCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetStatusBarStyleCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_SetUserCloudStorage(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.setUserCloudStorage({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetUserCloudStorageCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetUserCloudStorageCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetUserCloudStorageCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_SetVisualEffectOnCapture(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.setVisualEffectOnCapture({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetVisualEffectOnCaptureCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetVisualEffectOnCaptureCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('SetVisualEffectOnCaptureCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_ShowActionSheet(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.showActionSheet({
            ...config,
            success(res) {
                formatResponse('ShowActionSheetSuccessCallbackResult', res);
                moduleHelper.send('ShowActionSheetCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowActionSheetCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowActionSheetCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_ShowKeyboard(conf, callbackId) {
        const config = formatJsonStr(conf);
        delete config.success;
        delete config.fail;
        delete config.complete;
        console.log(conf);
        qg.showKeyboard({
            ...config,
            success(res) {
                // console.log("success "+JSON.stringify(res));
                moduleHelper.send('ShowKeyboardCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify({errMsg:res}),
                }));
            },
            fail(res) {
                // console.log("fail "+JSON.stringify(res));
                moduleHelper.send('ShowKeyboardCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify({errMsg:res}),
                }));
            },
            complete(res) {
                // console.log("comp "+JSON.stringify(res));
                moduleHelper.send('ShowKeyboardCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify({errMsg:res}),
                }));
            },
        });
    },
    QG_ShowLoading(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.showLoading({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowLoadingCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowLoadingCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowLoadingCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_ShowModal(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.showModal({
            ...config,
            success(res) {
                formatResponse('ShowModalSuccessCallbackResult', res);
                moduleHelper.send('ShowModalCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowModalCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowModalCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_ShowShareImageMenu(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.showShareImageMenu({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowShareImageMenuCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowShareImageMenuCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowShareImageMenuCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_ShowShareMenu(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.showShareMenu({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowShareMenuCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowShareMenuCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowShareMenuCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_ShowToast(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.showToast({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowToastCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowToastCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('ShowToastCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_StartAccelerometer(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.startAccelerometer({
            ...config,
            success(res) {
                console.log("QG_StartAccelerometer suc "+res);
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StartAccelerometerCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                console.log("QG_StartAccelerometer fail "+res);
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StartAccelerometerCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                console.log("QG_StartAccelerometer com "+res);
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StartAccelerometerCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_StartBeaconDiscovery(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.startBeaconDiscovery({
            ...config,
            success(res) {
                formatResponse('BeaconError', res);
                moduleHelper.send('StartBeaconDiscoveryCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BeaconError', res);
                moduleHelper.send('StartBeaconDiscoveryCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BeaconError', res);
                moduleHelper.send('StartBeaconDiscoveryCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_StartBluetoothDevicesDiscovery(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.startBluetoothDevicesDiscovery({
            ...config,
            success(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('StartBluetoothDevicesDiscoveryCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('StartBluetoothDevicesDiscoveryCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('StartBluetoothDevicesDiscoveryCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_StartCompass(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.startCompass({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StartCompassCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StartCompassCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StartCompassCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_StartDeviceMotionListening(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.startDeviceMotionListening({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StartDeviceMotionListeningCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StartDeviceMotionListeningCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StartDeviceMotionListeningCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_StopAccelerometer(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.stopAccelerometer({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StopAccelerometerCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StopAccelerometerCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StopAccelerometerCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_StopBeaconDiscovery(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.stopBeaconDiscovery({
            ...config,
            success(res) {
                formatResponse('BeaconError', res);
                moduleHelper.send('StopBeaconDiscoveryCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BeaconError', res);
                moduleHelper.send('StopBeaconDiscoveryCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BeaconError', res);
                moduleHelper.send('StopBeaconDiscoveryCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_StopBluetoothDevicesDiscovery(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.stopBluetoothDevicesDiscovery({
            ...config,
            success(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('StopBluetoothDevicesDiscoveryCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('StopBluetoothDevicesDiscoveryCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('StopBluetoothDevicesDiscoveryCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_StopCompass(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.stopCompass({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StopCompassCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StopCompassCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StopCompassCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_StopDeviceMotionListening(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.stopDeviceMotionListening({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StopDeviceMotionListeningCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StopDeviceMotionListeningCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StopDeviceMotionListeningCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_StopFaceDetect(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.stopFaceDetect({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StopFaceDetectCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StopFaceDetectCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StopFaceDetectCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_UpdateKeyboard(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.updateKeyboard({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('UpdateKeyboardCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('UpdateKeyboardCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('UpdateKeyboardCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_UpdateShareMenu(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.updateShareMenu({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('UpdateShareMenuCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('UpdateShareMenuCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('UpdateShareMenuCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_UpdateVoIPChatMuteConfig(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.updateVoIPChatMuteConfig({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('UpdateVoIPChatMuteConfigCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('UpdateVoIPChatMuteConfigCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('UpdateVoIPChatMuteConfigCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_UpdateWeChatApp(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.updateWeChatApp({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('UpdateWeChatAppCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('UpdateWeChatAppCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('UpdateWeChatAppCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_VibrateLong(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.vibrateLong({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('VibrateLongCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('VibrateLongCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('VibrateLongCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_VibrateShort(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.vibrateShort({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('VibrateShortCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('VibrateShortFailCallbackResult', res);
                moduleHelper.send('VibrateShortCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('VibrateShortCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_WriteBLECharacteristicValue(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.writeBLECharacteristicValue({
            ...config,
            success(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('WriteBLECharacteristicValueCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('WriteBLECharacteristicValueCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('BluetoothError', res);
                moduleHelper.send('WriteBLECharacteristicValueCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_StartGameLive(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.startGameLive({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StartGameLiveCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StartGameLiveCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('StartGameLiveCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_CheckGameLiveEnabled(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.checkGameLiveEnabled({
            ...config,
            success(res) {
                formatResponse('CheckGameLiveEnabledSuccessCallbackOption', res);
                moduleHelper.send('CheckGameLiveEnabledCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('CheckGameLiveEnabledCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('CheckGameLiveEnabledCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetUserCurrentGameliveInfo(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getUserCurrentGameliveInfo({
            ...config,
            success(res) {
                formatResponse('GetUserCurrentGameliveInfoSuccessCallbackOption', res);
                moduleHelper.send('GetUserCurrentGameliveInfoCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetUserCurrentGameliveInfoCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetUserCurrentGameliveInfoCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetUserRecentGameLiveInfo(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getUserRecentGameLiveInfo({
            ...config,
            success(res) {
                formatResponse('GetUserGameLiveDetailsSuccessCallbackOption', res);
                moduleHelper.send('GetUserRecentGameLiveInfoCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetUserRecentGameLiveInfoCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetUserRecentGameLiveInfoCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_GetUserGameLiveDetails(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.getUserGameLiveDetails({
            ...config,
            success(res) {
                formatResponse('GetUserGameLiveDetailsSuccessCallbackOption', res);
                moduleHelper.send('GetUserGameLiveDetailsCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetUserGameLiveDetailsCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('GetUserGameLiveDetailsCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_OpenChannelsLiveCollection(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.openChannelsLiveCollection({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenChannelsLiveCollectionCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenChannelsLiveCollectionCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenChannelsLiveCollectionCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_OpenPage(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.openPage({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenPageCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenPageCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenPageCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_RequestMidasPaymentGameItem(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.requestMidasPaymentGameItem({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RequestMidasPaymentGameItemCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('MidasPaymentGameItemError', res);
                moduleHelper.send('RequestMidasPaymentGameItemCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('MidasPaymentGameItemError', res);
                moduleHelper.send('RequestMidasPaymentGameItemCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_RequestSubscribeLiveActivity(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.requestSubscribeLiveActivity({
            ...config,
            success(res) {
                formatResponse('RequestSubscribeLiveActivitySuccessCallbackResult', res);
                moduleHelper.send('RequestSubscribeLiveActivityCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RequestSubscribeLiveActivityCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('RequestSubscribeLiveActivityCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_OpenBusinessView(conf, callbackId) {
        const config = formatJsonStr(conf);
        qg.openBusinessView({
            ...config,
            success(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenBusinessViewCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenBusinessViewCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('OpenBusinessViewCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
    },
    QG_ExitPointerLock() {
        qg.exitPointerLock();
    },
    QG_OperateGameRecorderVideo(option) {
        qg.operateGameRecorderVideo(formatJsonStr(option));
    },
    QG_RemoveStorageSync(key) {
        qg.removeStorageSync(key);
    },
    QG_ReportEvent(eventId, data) {
        qg.reportEvent(eventId, formatJsonStr(data));
    },
    QG_ReportMonitor(name, value) {
        qg.reportMonitor(name, value);
    },
    QG_ReportPerformance(id, value, dimensions) {
        qg.reportPerformance(id, value, dimensions);
    },
    QG_ReportUserBehaviorBranchAnalytics(option) {
        qg.reportUserBehaviorBranchAnalytics(formatJsonStr(option));
    },
    QG_RequestPointerLock() {
        qg.requestPointerLock();
    },
    QG_ReserveChannelsLive(option) {
        qg.reserveChannelsLive(formatJsonStr(option));
    },
    QG_RevokeBufferURL(url) {
        qg.revokeBufferURL(url);
    },
    QG_SetPreferredFramesPerSecond(fps) {
        qg.setPreferredFramesPerSecond(fps);
    },
    QG_SetStorageSync(key, data) {
        qg.setStorageSync(key, formatJsonStr(data));
    },
    QG_ShareAppMessage(option) {
        qg.shareAppMessage(formatJsonStr(option));
    },
    QG_TriggerGC() {
        qg.triggerGC();
    },
    QG_OnAccelerometerChange() {
        if (!OnAccelerometerChangeList) {
            OnAccelerometerChangeList = [];
        }
        const callback = (res) => {
            formatResponse('OnAccelerometerChangeListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnAccelerometerChangeCallback', resStr);
        };
        OnAccelerometerChangeList.push(callback);
        qg.onAccelerometerChange(callback);
    },
    QG_OffAccelerometerChange() {
        (OnAccelerometerChangeList || []).forEach((v) => {
            qg.offAccelerometerChange(v);
        });
    },
    QG_OnAudioInterruptionBegin() {
        if (!OnAudioInterruptionBeginList) {
            OnAudioInterruptionBeginList = [];
        }
        const callback = (res) => {
            formatResponse('GeneralCallbackResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnAudioInterruptionBeginCallback', resStr);
        };
        OnAudioInterruptionBeginList.push(callback);
        qg.onAudioInterruptionBegin(callback);
    },
    QG_OffAudioInterruptionBegin() {
        (OnAudioInterruptionBeginList || []).forEach((v) => {
            qg.offAudioInterruptionBegin(v);
        });
    },
    QG_OnAudioInterruptionEnd() {
        if (!OnAudioInterruptionEndList) {
            OnAudioInterruptionEndList = [];
        }
        const callback = (res) => {
            formatResponse('GeneralCallbackResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnAudioInterruptionEndCallback', resStr);
        };
        OnAudioInterruptionEndList.push(callback);
        qg.onAudioInterruptionEnd(callback);
    },
    QG_OffAudioInterruptionEnd() {
        (OnAudioInterruptionEndList || []).forEach((v) => {
            qg.offAudioInterruptionEnd(v);
        });
    },
    QG_OnBLEConnectionStateChange() {
        if (!OnBLEConnectionStateChangeList) {
            OnBLEConnectionStateChangeList = [];
        }
        const callback = (res) => {
            formatResponse('OnBLEConnectionStateChangeListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnBLEConnectionStateChangeCallback', resStr);
        };
        OnBLEConnectionStateChangeList.push(callback);
        qg.onBLEConnectionStateChange(callback);
    },
    QG_OffBLEConnectionStateChange() {
        (OnBLEConnectionStateChangeList || []).forEach((v) => {
            qg.offBLEConnectionStateChange(v);
        });
    },
    QG_OnBLEMTUChange() {
        if (!OnBLEMTUChangeList) {
            OnBLEMTUChangeList = [];
        }
        const callback = (res) => {
            formatResponse('OnBLEMTUChangeListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnBLEMTUChangeCallback', resStr);
        };
        OnBLEMTUChangeList.push(callback);
        qg.onBLEMTUChange(callback);
    },
    QG_OffBLEMTUChange() {
        (OnBLEMTUChangeList || []).forEach((v) => {
            qg.offBLEMTUChange(v);
        });
    },
    QG_OnBLEPeripheralConnectionStateChanged() {
        if (!OnBLEPeripheralConnectionStateChangedList) {
            OnBLEPeripheralConnectionStateChangedList = [];
        }
        const callback = (res) => {
            formatResponse('OnBLEPeripheralConnectionStateChangedListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnBLEPeripheralConnectionStateChangedCallback', resStr);
        };
        OnBLEPeripheralConnectionStateChangedList.push(callback);
        qg.onBLEPeripheralConnectionStateChanged(callback);
    },
    QG_OffBLEPeripheralConnectionStateChanged() {
        (OnBLEPeripheralConnectionStateChangedList || []).forEach((v) => {
            qg.offBLEPeripheralConnectionStateChanged(v);
        });
    },
    QG_OnBackgroundFetchData() {
        const callback = (res) => {
            formatResponse('OnBackgroundFetchDataListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnBackgroundFetchDataCallback', resStr);
        };
        qg.onBackgroundFetchData(callback);
    },
    QG_OnBeaconServiceChange() {
        if (!OnBeaconServiceChangeList) {
            OnBeaconServiceChangeList = [];
        }
        const callback = (res) => {
            formatResponse('OnBeaconServiceChangeListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnBeaconServiceChangeCallback', resStr);
        };
        OnBeaconServiceChangeList.push(callback);
        qg.onBeaconServiceChange(callback);
    },
    QG_OffBeaconServiceChange() {
        (OnBeaconServiceChangeList || []).forEach((v) => {
            qg.offBeaconServiceChange(v);
        });
    },
    QG_OnBeaconUpdate() {
        if (!OnBeaconUpdateList) {
            OnBeaconUpdateList = [];
        }
        const callback = (res) => {
            formatResponse('OnBeaconUpdateListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnBeaconUpdateCallback', resStr);
        };
        OnBeaconUpdateList.push(callback);
        qg.onBeaconUpdate(callback);
    },
    QG_OffBeaconUpdate() {
        (OnBeaconUpdateList || []).forEach((v) => {
            qg.offBeaconUpdate(v);
        });
    },
    QG_OnBluetoothAdapterStateChange() {
        if (!OnBluetoothAdapterStateChangeList) {
            OnBluetoothAdapterStateChangeList = [];
        }
        const callback = (res) => {
            formatResponse('OnBluetoothAdapterStateChangeListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnBluetoothAdapterStateChangeCallback', resStr);
        };
        OnBluetoothAdapterStateChangeList.push(callback);
        qg.onBluetoothAdapterStateChange(callback);
    },
    QG_OffBluetoothAdapterStateChange() {
        (OnBluetoothAdapterStateChangeList || []).forEach((v) => {
            qg.offBluetoothAdapterStateChange(v);
        });
    },
    QG_OnBluetoothDeviceFound() {
        if (!OnBluetoothDeviceFoundList) {
            OnBluetoothDeviceFoundList = [];
        }
        const callback = (res) => {
            formatResponse('OnBluetoothDeviceFoundListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnBluetoothDeviceFoundCallback', resStr);
        };
        OnBluetoothDeviceFoundList.push(callback);
        qg.onBluetoothDeviceFound(callback);
    },
    QG_OffBluetoothDeviceFound() {
        (OnBluetoothDeviceFoundList || []).forEach((v) => {
            qg.offBluetoothDeviceFound(v);
        });
    },
    QG_OnCompassChange() {
        if (!OnCompassChangeList) {
            OnCompassChangeList = [];
        }
        const callback = (res) => {
            formatResponse('OnCompassChangeListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnCompassChangeCallback', resStr);
        };
        OnCompassChangeList.push(callback);
        qg.onCompassChange(callback);
    },
    QG_OffCompassChange() {
        (OnCompassChangeList || []).forEach((v) => {
            qg.offCompassChange(v);
        });
    },
    QG_OnDeviceMotionChange() {
        if (!OnDeviceMotionChangeList) {
            OnDeviceMotionChangeList = [];
        }
        const callback = (res) => {
            formatResponse('OnDeviceMotionChangeListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnDeviceMotionChangeCallback', resStr);
        };
        OnDeviceMotionChangeList.push(callback);
        qg.onDeviceMotionChange(callback);
    },
    QG_OffDeviceMotionChange() {
        (OnDeviceMotionChangeList || []).forEach((v) => {
            qg.offDeviceMotionChange(v);
        });
    },
    QG_OnDeviceOrientationChange() {
        if (!OnDeviceOrientationChangeList) {
            OnDeviceOrientationChangeList = [];
        }
        const callback = (res) => {
            formatResponse('OnDeviceOrientationChangeListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnDeviceOrientationChangeCallback', resStr);
        };
        OnDeviceOrientationChangeList.push(callback);
        qg.onDeviceOrientationChange(callback);
    },
    QG_OffDeviceOrientationChange() {
        (OnDeviceOrientationChangeList || []).forEach((v) => {
            qg.offDeviceOrientationChange(v);
        });
    },
    QG_OnError() {
        if (!OnErrorList) {
            OnErrorList = [];
        }
        const callback = (res) => {
            formatResponse('Error', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnErrorCallback', resStr);
        };
        OnErrorList.push(callback);
        qg.onError(callback);
    },
    QG_OffError() {
        (OnErrorList || []).forEach((v) => {
            qg.offError(v);
        });
    },
    QG_OnHide() {
        if (!OnHideList) {
            OnHideList = [];
        }
        const callback = (res) => {
            formatResponse('GeneralCallbackResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnHideCallback', resStr);
        };
        OnHideList.push(callback);
        qg.onHide(callback);
    },
    QG_OffHide() {
        (OnHideList || []).forEach((v) => {
            qg.offHide(v);
        });
    },
    QG_OnInteractiveStorageModified() {
        if (!OnInteractiveStorageModifiedList) {
            OnInteractiveStorageModifiedList = [];
        }
        const callback = (res) => {
            const resStr = res;
            moduleHelper.send('_OnInteractiveStorageModifiedCallback', resStr);
        };
        OnInteractiveStorageModifiedList.push(callback);
        qg.onInteractiveStorageModified(callback);
    },
    QG_OffInteractiveStorageModified() {
        (OnInteractiveStorageModifiedList || []).forEach((v) => {
            qg.offInteractiveStorageModified(v);
        });
    },
    QG_OnKeyDown() {
        if (!OnKeyDownList) {
            OnKeyDownList = [];
        }
        const callback = (res) => {
            formatResponse('OnKeyDownListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnKeyDownCallback', resStr);
        };
        OnKeyDownList.push(callback);
        qg.onKeyDown(callback);
    },
    QG_OffKeyDown() {
        (OnKeyDownList || []).forEach((v) => {
            qg.offKeyDown(v);
        });
    },
    QG_OnKeyUp() {
        if (!OnKeyUpList) {
            OnKeyUpList = [];
        }
        const callback = (res) => {
            formatResponse('OnKeyDownListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnKeyUpCallback', resStr);
        };
        OnKeyUpList.push(callback);
        qg.onKeyUp(callback);
    },
    QG_OffKeyUp() {
        (OnKeyUpList || []).forEach((v) => {
            qg.offKeyUp(v);
        });
    },
    QG_OnKeyboardComplete() {
        if (!OnKeyboardCompleteList) {
            OnKeyboardCompleteList = [];
        }
        const callback = (res) => {
            formatResponse('OnKeyboardInputListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnKeyboardCompleteCallback', resStr);
        };
        OnKeyboardCompleteList.push(callback);
        qg.onKeyboardComplete(callback);
    },
    QG_OffKeyboardComplete() {
        (OnKeyboardCompleteList || []).forEach((v) => {
            qg.offKeyboardComplete(v);
        });
    },
    QG_OnKeyboardConfirm() {
        if (!OnKeyboardConfirmList) {
            OnKeyboardConfirmList = [];
        }
        const callback = (res) => {
            formatResponse('OnKeyboardInputListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnKeyboardConfirmCallback', resStr);
        };
        OnKeyboardConfirmList.push(callback);
        qg.onKeyboardConfirm(callback);
    },
    QG_OffKeyboardConfirm() {
        (OnKeyboardConfirmList || []).forEach((v) => {
            qg.offKeyboardConfirm(v);
        });
    },
    QG_OnKeyboardHeightChange() {
        if (!OnKeyboardHeightChangeList) {
            OnKeyboardHeightChangeList = [];
        }
        const callback = (res) => {
            formatResponse('OnKeyboardHeightChangeListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnKeyboardHeightChangeCallback', resStr);
        };
        OnKeyboardHeightChangeList.push(callback);
        qg.onKeyboardHeightChange(callback);
    },
    QG_OffKeyboardHeightChange() {
        (OnKeyboardHeightChangeList || []).forEach((v) => {
            qg.offKeyboardHeightChange(v);
        });
    },
    QG_OnKeyboardInput() {
        if (!OnKeyboardInputList) {
            OnKeyboardInputList = [];
        }
        const callback = (res) => {
            console.log("keyb input "+JSON.stringify(res))
            formatResponse('OnKeyboardInputListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnKeyboardInputCallback', resStr);
        };
        OnKeyboardInputList.push(callback);
        qg.onKeyboardInput(callback);
    },
    QG_OffKeyboardInput() {
        (OnKeyboardInputList || []).forEach((v) => {
            qg.offKeyboardInput(v);
        });
    },
    QG_OnMemoryWarning() {
        if (!OnMemoryWarningList) {
            OnMemoryWarningList = [];
        }
        const callback = (res) => {
            formatResponse('OnMemoryWarningListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnMemoryWarningCallback', resStr);
        };
        OnMemoryWarningList.push(callback);
        qg.onMemoryWarning(callback);
    },
    QG_OffMemoryWarning() {
        (OnMemoryWarningList || []).forEach((v) => {
            qg.offMemoryWarning(v);
        });
    },
    QG_OnMessage() {
        const callback = (res) => {
            const resStr = res;
            moduleHelper.send('_OnMessageCallback', resStr);
        };
        qg.onMessage(callback);
    },
    QG_OnMouseDown() {
        if (!OnMouseDownList) {
            OnMouseDownList = [];
        }
        const callback = (res) => {
            formatResponse('OnMouseDownListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnMouseDownCallback', resStr);
        };
        OnMouseDownList.push(callback);
        qg.onMouseDown(callback);
    },
    QG_OffMouseDown() {
        (OnMouseDownList || []).forEach((v) => {
            qg.offMouseDown(v);
        });
    },
    QG_OnMouseMove() {
        if (!OnMouseMoveList) {
            OnMouseMoveList = [];
        }
        const callback = (res) => {
            formatResponse('OnMouseMoveListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnMouseMoveCallback', resStr);
        };
        OnMouseMoveList.push(callback);
        qg.onMouseMove(callback);
    },
    QG_OffMouseMove() {
        (OnMouseMoveList || []).forEach((v) => {
            qg.offMouseMove(v);
        });
    },
    QG_OnMouseUp() {
        if (!OnMouseUpList) {
            OnMouseUpList = [];
        }
        const callback = (res) => {
            formatResponse('OnMouseDownListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnMouseUpCallback', resStr);
        };
        OnMouseUpList.push(callback);
        qg.onMouseUp(callback);
    },
    QG_OffMouseUp() {
        (OnMouseUpList || []).forEach((v) => {
            qg.offMouseUp(v);
        });
    },
    QG_OnNetworkStatusChange() {
        if (!OnNetworkStatusChangeList) {
            OnNetworkStatusChangeList = [];
        }
        const callback = (res) => {
            formatResponse('OnNetworkStatusChangeListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnNetworkStatusChangeCallback', resStr);
        };
        OnNetworkStatusChangeList.push(callback);
        qg.onNetworkStatusChange(callback);
    },
    QG_OffNetworkStatusChange() {
        (OnNetworkStatusChangeList || []).forEach((v) => {
            qg.offNetworkStatusChange(v);
        });
    },
    QG_OnNetworkWeakChange() {
        if (!OnNetworkWeakChangeList) {
            OnNetworkWeakChangeList = [];
        }
        const callback = (res) => {
            formatResponse('OnNetworkWeakChangeListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnNetworkWeakChangeCallback', resStr);
        };
        OnNetworkWeakChangeList.push(callback);
        qg.onNetworkWeakChange(callback);
    },
    QG_OffNetworkWeakChange() {
        (OnNetworkWeakChangeList || []).forEach((v) => {
            qg.offNetworkWeakChange(v);
        });
    },
    QG_OnScreenRecordingStateChanged() {
        if (!OnScreenRecordingStateChangedList) {
            OnScreenRecordingStateChangedList = [];
        }
        const callback = (res) => {
            formatResponse('OnScreenRecordingStateChangedListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnScreenRecordingStateChangedCallback', resStr);
        };
        OnScreenRecordingStateChangedList.push(callback);
        qg.onScreenRecordingStateChanged(callback);
    },
    QG_OffScreenRecordingStateChanged() {
        (OnScreenRecordingStateChangedList || []).forEach((v) => {
            qg.offScreenRecordingStateChanged(v);
        });
    },
    QG_OnShareMessageToFriend() {
        const callback = (res) => {
            formatResponse('OnShareMessageToFriendListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnShareMessageToFriendCallback', resStr);
        };
        qg.onShareMessageToFriend(callback);
    },
    QG_OnShow() {
        if (!OnShowList) {
            OnShowList = [];
        }
        const callback = (res) => {
            formatResponse('OnShowListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnShowCallback', resStr);
        };
        OnShowList.push(callback);
        qg.onShow(callback);
    },
    QG_OffShow() {
        (OnShowList || []).forEach((v) => {
            qg.offShow(v);
        });
    },
    QG_OnUnhandledRejection() {
        if (!OnUnhandledRejectionList) {
            OnUnhandledRejectionList = [];
        }
        const callback = (res) => {
            formatResponse('OnUnhandledRejectionListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnUnhandledRejectionCallback', resStr);
        };
        OnUnhandledRejectionList.push(callback);
        qg.onUnhandledRejection(callback);
    },
    QG_OffUnhandledRejection() {
        (OnUnhandledRejectionList || []).forEach((v) => {
            qg.offUnhandledRejection(v);
        });
    },
    QG_OnUserCaptureScreen() {
        if (!OnUserCaptureScreenList) {
            OnUserCaptureScreenList = [];
        }
        const callback = (res) => {
            formatResponse('GeneralCallbackResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnUserCaptureScreenCallback', resStr);
        };
        OnUserCaptureScreenList.push(callback);
        qg.onUserCaptureScreen(callback);
    },
    QG_OffUserCaptureScreen() {
        (OnUserCaptureScreenList || []).forEach((v) => {
            qg.offUserCaptureScreen(v);
        });
    },
    QG_OnVoIPChatInterrupted() {
        if (!OnVoIPChatInterruptedList) {
            OnVoIPChatInterruptedList = [];
        }
        const callback = (res) => {
            formatResponse('OnVoIPChatInterruptedListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnVoIPChatInterruptedCallback', resStr);
        };
        OnVoIPChatInterruptedList.push(callback);
        qg.onVoIPChatInterrupted(callback);
    },
    QG_OffVoIPChatInterrupted() {
        (OnVoIPChatInterruptedList || []).forEach((v) => {
            qg.offVoIPChatInterrupted(v);
        });
    },
    QG_OnVoIPChatMembersChanged() {
        if (!OnVoIPChatMembersChangedList) {
            OnVoIPChatMembersChangedList = [];
        }
        const callback = (res) => {
            formatResponse('OnVoIPChatMembersChangedListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnVoIPChatMembersChangedCallback', resStr);
        };
        OnVoIPChatMembersChangedList.push(callback);
        qg.onVoIPChatMembersChanged(callback);
    },
    QG_OffVoIPChatMembersChanged() {
        (OnVoIPChatMembersChangedList || []).forEach((v) => {
            qg.offVoIPChatMembersChanged(v);
        });
    },
    QG_OnVoIPChatSpeakersChanged() {
        if (!OnVoIPChatSpeakersChangedList) {
            OnVoIPChatSpeakersChangedList = [];
        }
        const callback = (res) => {
            formatResponse('OnVoIPChatSpeakersChangedListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnVoIPChatSpeakersChangedCallback', resStr);
        };
        OnVoIPChatSpeakersChangedList.push(callback);
        qg.onVoIPChatSpeakersChanged(callback);
    },
    QG_OffVoIPChatSpeakersChanged() {
        (OnVoIPChatSpeakersChangedList || []).forEach((v) => {
            qg.offVoIPChatSpeakersChanged(v);
        });
    },
    QG_OnVoIPChatStateChanged() {
        if (!OnVoIPChatStateChangedList) {
            OnVoIPChatStateChangedList = [];
        }
        const callback = (res) => {
            formatResponse('OnVoIPChatStateChangedListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnVoIPChatStateChangedCallback', resStr);
        };
        OnVoIPChatStateChangedList.push(callback);
        qg.onVoIPChatStateChanged(callback);
    },
    QG_OffVoIPChatStateChanged() {
        (OnVoIPChatStateChangedList || []).forEach((v) => {
            qg.offVoIPChatStateChanged(v);
        });
    },
    QG_OnWheel() {
        if (!OnWheelList) {
            OnWheelList = [];
        }
        const callback = (res) => {
            formatResponse('OnWheelListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnWheelCallback', resStr);
        };
        OnWheelList.push(callback);
        qg.onWheel(callback);
    },
    QG_OffWheel() {
        (OnWheelList || []).forEach((v) => {
            qg.offWheel(v);
        });
    },
    QG_OnWindowResize() {
        if (!OnWindowResizeList) {
            OnWindowResizeList = [];
        }
        const callback = (res) => {
            formatResponse('OnWindowResizeListenerResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnWindowResizeCallback', resStr);
        };
        OnWindowResizeList.push(callback);
        qg.onWindowResize(callback);
    },
    QG_OffWindowResize() {
        (OnWindowResizeList || []).forEach((v) => {
            qg.offWindowResize(v);
        });
    },
    QG_OnAddToFavorites() {
        const callback = (res) => {
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnAddToFavoritesCallback', resStr);
            return qgOnAddToFavoritesResolveConf;
        };
        qg.onAddToFavorites(callback);
    },
    QG_OnAddToFavorites_Resolve(conf) {
        try {
            qgOnAddToFavoritesResolveConf = formatJsonStr(conf);
            return;
        }
        catch (e) {
        }
        qgOnAddToFavoritesResolveConf = {};
    },
    QG_OffAddToFavorites() {
        qg.offAddToFavorites();
    },
    QG_OnCopyUrl() {
        const callback = (res) => {
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnCopyUrlCallback', resStr);
            return qgOnCopyUrlResolveConf;
        };
        qg.onCopyUrl(callback);
    },
    QG_OnCopyUrl_Resolve(conf) {
        try {
            qgOnCopyUrlResolveConf = formatJsonStr(conf);
            return;
        }
        catch (e) {
        }
        qgOnCopyUrlResolveConf = {};
    },
    QG_OffCopyUrl() {
        qg.offCopyUrl();
    },
    QG_OnHandoff() {
        const callback = (res) => {
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnHandoffCallback', resStr);
            return qgOnHandoffResolveConf;
        };
        qg.onHandoff(callback);
    },
    QG_OnHandoff_Resolve(conf) {
        try {
            qgOnHandoffResolveConf = formatJsonStr(conf);
            return;
        }
        catch (e) {
        }
        qgOnHandoffResolveConf = {};
    },
    QG_OffHandoff() {
        qg.offHandoff();
    },
    QG_OnShareTimeline() {
        const callback = (res) => {
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnShareTimelineCallback', resStr);
            return qgOnShareTimelineResolveConf;
        };
        qg.onShareTimeline(callback);
    },
    QG_OnShareTimeline_Resolve(conf) {
        try {
            qgOnShareTimelineResolveConf = formatJsonStr(conf);
            return;
        }
        catch (e) {
        }
        qgOnShareTimelineResolveConf = {};
    },
    QG_OffShareTimeline() {
        qg.offShareTimeline();
    },
    QG_OnGameLiveStateChange() {
        const callback = (res) => {
            formatResponse('OnGameLiveStateChangeCallbackResult', res);
            const resStr = stringifyRes(res);
            moduleHelper.send('_OnGameLiveStateChangeCallback', resStr);
            return qgOnGameLiveStateChangeResolveConf;
        };
        qg.onGameLiveStateChange(callback);
    },
    QG_OnGameLiveStateChange_Resolve(conf) {
        try {
            qgOnGameLiveStateChangeResolveConf = formatJsonStr(conf);
            return;
        }
        catch (e) {
        }
        qgOnGameLiveStateChangeResolveConf = {};
    },
    QG_OffGameLiveStateChange() {
        qg.offGameLiveStateChange();
    },
    QG_SetHandoffQuery(query) {
        const res = qg.setHandoffQuery(formatJsonStr(query));
        return res;
    },
    QG_GetAccountInfoSync() {
        const res = qg.getAccountInfoSync();
        formatResponse('AccountInfo', res);
        return JSON.stringify(res);
    },
    QG_GetAppAuthorizeSetting() {
        const res = qg.getAppAuthorizeSetting();
        formatResponse('AppAuthorizeSetting', JSON.parse(JSON.stringify(res)));
        return JSON.stringify(res);
    },
    QG_GetAppBaseInfo() {
        const res = qg.getAppBaseInfo();
        formatResponse('AppBaseInfo', res);
        return JSON.stringify(res);
    },
    QG_GetBatteryInfoSync() {
        const res = qg.getBatteryInfoSync();
        formatResponse('GetBatteryInfoSyncResult', res);
        return JSON.stringify(res);
    },
    QG_GetDeviceInfo() {
        const res = qg.getDeviceInfo();
        formatResponse('DeviceInfo', res);
        return JSON.stringify(res);
    },
    QG_GetEnterOptionsSync() {
        const res = qg.getEnterOptionsSync();
        formatResponse('EnterOptionsGame', res);
        return JSON.stringify(res);
    },
    QG_GetExptInfoSync(keys) {
        const res = qg.getExptInfoSync(formatJsonStr(keys));
        formatResponse('IAnyObject', res);
        return JSON.stringify(res);
    },
    QG_GetExtConfigSync() {
        const res = qg.getExtConfigSync();
        formatResponse('IAnyObject', res);
        return JSON.stringify(res);
    },
    QG_GetLaunchOptionsSync() {
        const res = qg.getLaunchOptionsSync();
        formatResponse('LaunchOptionsGame', res);
        return JSON.stringify(res);
    },
    QG_GetMenuButtonBoundingClientRect() {
        const res = qg.getMenuButtonBoundingClientRect();
        formatResponse('ClientRect', res);
        return JSON.stringify(res);
    },
    QG_GetStorageInfoSync() {
        const res = qg.getStorageInfoSync();
        formatResponse('GetStorageInfoSyncOption', res);
        return JSON.stringify(res);
    },
    QG_GetSystemInfoSync() {
        const res = qg.getSystemInfoSync();
        formatResponse('SystemInfo', res);
        return JSON.stringify(res);
    },
    QG_GetSystemSetting() {
        const res = qg.getSystemSetting();
        formatResponse('SystemSetting', JSON.parse(JSON.stringify(res)));
        return JSON.stringify(res);
    },
    QG_GetWindowInfo() {
        const res = qg.getWindowInfo();
        formatResponse('WindowInfo', res);
        return JSON.stringify(res);
    },
    QG_CreateImageData() {
        const res = qg.createImageData();
        formatResponse('ImageData', res);
        return JSON.stringify(res);
    },
    QG_CreatePath2D() {
        const res = qg.createPath2D();
        formatResponse('Path2D', res);
        return JSON.stringify(res);
    },
    QG_IsPointerLocked() {
        const res = qg.isPointerLocked();
        return res;
    },
    QG_IsVKSupport(version) {
        const res = qg.isVKSupport(formatJsonStr(version));
        return res;
    },
    QG_SetCursor(path, x, y) {
        const res = qg.setCursor(formatJsonStr(path), x, y);
        return res;
    },
    QG_SetMessageToFriendQuery(option) {
        const res = qg.setMessageToFriendQuery(formatJsonStr(option));
        return res;
    },
    QG_GetTextLineHeight(option) {
        const res = qg.getTextLineHeight(formatJsonStr(option));
        return res;
    },
    QG_LoadFont(path) {
        const res = qg.loadFont(formatJsonStr(path));
        return res;
    },
    QG_GetGameLiveState() {
        const res = qg.getGameLiveState();
        formatResponse('GameLiveState', res);
        return JSON.stringify(res);
    },
    QG_DownloadFile(conf) {
        const config = formatJsonStr(conf);
        const callbackId = uid();
        const obj = qg.downloadFile({
            ...config,
            success(res) {
                console.log('download succ');
                console.log(res);
                formatResponse('DownloadFileSuccessCallbackResult', res);
                moduleHelper.send('DownloadFileCallback', JSON.stringify({
                    callbackId, type: 'success', res: JSON.stringify(res),
                }));
            },
            fail(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('DownloadFileCallback', JSON.stringify({
                    callbackId, type: 'fail', res: JSON.stringify(res),
                }));
            },
            complete(res) {
                formatResponse('GeneralCallbackResult', res);
                moduleHelper.send('DownloadFileCallback', JSON.stringify({
                    callbackId, type: 'complete', res: JSON.stringify(res),
                }));
            },
        });
        DownloadTaskList[callbackId] = obj;
        return callbackId;
    },
    QG_CreateFeedbackButton(option) {
        const obj = qg.createFeedbackButton(formatJsonStr(option));
        const key = uid();
        FeedbackButtonList[key] = obj;
        return key;
    },
    QG_GetLogManager(option) {
        const obj = qg.getLogManager(formatJsonStr(option));
        const key = uid();
        LogManagerList[key] = obj;
        return key;
    },
    QG_GetRealtimeLogManager() {
        const obj = qg.getRealtimeLogManager();
        const key = uid();
        RealtimeLogManagerList[key] = obj;
        return key;
    },
    QG_GetUpdateManager() {
        const obj = qg.getUpdateManager();
        const key = uid();
        UpdateManagerList[key] = obj;
        return key;
    },
    QG_CreateVideoDecoder() {
        const obj = qg.createVideoDecoder();
        const key = uid();
        VideoDecoderList[key] = obj;
        return key;
    },
    QG_DownloadTaskAbort(id) {
        const obj = getDownloadTaskObject(id);
        if (!obj) {
            return;
        }
        obj.abort();
    },
    QG_DownloadTaskOffHeadersReceived(id) {
        const obj = getDownloadTaskObject(id);
        if (!obj) {
            return;
        }
        offEventCallback(qgDownloadTaskHeadersReceivedList, (v) => {
            obj.offHeadersReceived(v);
        }, id);
    },
    QG_DownloadTaskOffProgressUpdate(id) {
        const obj = getDownloadTaskObject(id);
        if (!obj) {
            return;
        }
        offEventCallback(qgDownloadTaskProgressUpdateList, (v) => {
            obj.offProgressUpdate(v);
        }, id);
    },
    QG_DownloadTaskOnHeadersReceived(id) {
        const obj = getDownloadTaskObject(id);
        if (!obj) {
            return;
        }
        const callback = onEventCallback(qgDownloadTaskHeadersReceivedList, '_DownloadTaskOnHeadersReceivedCallback', id, id);
        obj.onHeadersReceived(callback);
    },
    QG_DownloadTaskOnProgressUpdate(id) {
        const obj = getDownloadTaskObject(id);
        if (!obj) {
            return;
        }
        const callback = onEventCallback(qgDownloadTaskProgressUpdateList, '_DownloadTaskOnProgressUpdateCallback', id, id);
        obj.onProgressUpdate(callback);
    },
    QGFeedbackButtonSetProperty(id, key, value) {
        const obj = getFeedbackButtonObject(id);
        if (!obj) {
            return;
        }
        if (/^\s*(\{.*\}|\[.*\])\s*$/.test(value)) {
            try {
                const jsonValue = JSON.parse(value);
                Object.assign(obj[key], jsonValue);
            }
            catch (e) {
                obj[key] = value;
            }
        }
        else {
            obj[key] = value;
        }
    },
    QG_FeedbackButtonDestroy(id) {
        const obj = getFeedbackButtonObject(id);
        if (!obj) {
            return;
        }
        obj.destroy();
    },
    QG_FeedbackButtonHide(id) {
        const obj = getFeedbackButtonObject(id);
        if (!obj) {
            return;
        }
        obj.hide();
    },
    QG_FeedbackButtonOffTap(id) {
        const obj = getFeedbackButtonObject(id);
        if (!obj) {
            return;
        }
        offEventCallback(qgFeedbackButtonTapList, (v) => {
            obj.offTap(v);
        }, id);
    },
    QG_FeedbackButtonOnTap(id) {
        const obj = getFeedbackButtonObject(id);
        if (!obj) {
            return;
        }
        const callback = onEventCallback(qgFeedbackButtonTapList, '_FeedbackButtonOnTapCallback', id, id);
        obj.onTap(callback);
    },
    QG_FeedbackButtonShow(id) {
        const obj = getFeedbackButtonObject(id);
        if (!obj) {
            return;
        }
        obj.show();
    },
    QG_LogManagerDebug(id, args) {
        const obj = getLogManagerObject(id);
        if (!obj) {
            return;
        }
        obj.debug(args);
    },
    QG_LogManagerInfo(id, args) {
        const obj = getLogManagerObject(id);
        if (!obj) {
            return;
        }
        obj.info(args);
    },
    QG_LogManagerLog(id, args) {
        const obj = getLogManagerObject(id);
        if (!obj) {
            return;
        }
        obj.log(args);
    },
    QG_LogManagerWarn(id, args) {
        const obj = getLogManagerObject(id);
        if (!obj) {
            return;
        }
        obj.warn(args);
    },
    QG_RealtimeLogManagerAddFilterMsg(id, msg) {
        const obj = getRealtimeLogManagerObject(id);
        if (!obj) {
            return;
        }
        obj.addFilterMsg(msg);
    },
    QG_RealtimeLogManagerError(id, args) {
        const obj = getRealtimeLogManagerObject(id);
        if (!obj) {
            return;
        }
        obj.error(args);
    },
    QG_RealtimeLogManagerInfo(id, args) {
        const obj = getRealtimeLogManagerObject(id);
        if (!obj) {
            return;
        }
        obj.info(args);
    },
    QG_RealtimeLogManagerSetFilterMsg(id, msg) {
        const obj = getRealtimeLogManagerObject(id);
        if (!obj) {
            return;
        }
        obj.setFilterMsg(msg);
    },
    QG_RealtimeLogManagerWarn(id, args) {
        const obj = getRealtimeLogManagerObject(id);
        if (!obj) {
            return;
        }
        obj.warn(args);
    },
    QG_UpdateManagerApplyUpdate(id) {
        const obj = getUpdateManagerObject(id);
        if (!obj) {
            return;
        }
        obj.applyUpdate();
    },
    QG_UpdateManagerOnCheckForUpdate(id) {
        const obj = getUpdateManagerObject(id);
        if (!obj) {
            return;
        }
        const callback = (res) => {
            formatResponse('OnCheckForUpdateListenerResult', res);
            const resStr = JSON.stringify({
                callbackId: id,
                res: JSON.stringify(res),
            });
            moduleHelper.send('_UpdateManagerOnCheckForUpdateCallback', resStr);
        };
        obj.onCheckForUpdate(callback);
    },
    QG_UpdateManagerOnUpdateFailed(id) {
        const obj = getUpdateManagerObject(id);
        if (!obj) {
            return;
        }
        const callback = (res) => {
            formatResponse('GeneralCallbackResult', res);
            const resStr = JSON.stringify({
                callbackId: id,
                res: JSON.stringify(res),
            });
            moduleHelper.send('_UpdateManagerOnUpdateFailedCallback', resStr);
        };
        obj.onUpdateFailed(callback);
    },
    QG_UpdateManagerOnUpdateReady(id) {
        const obj = getUpdateManagerObject(id);
        if (!obj) {
            return;
        }
        const callback = (res) => {
            formatResponse('GeneralCallbackResult', res);
            const resStr = JSON.stringify({
                callbackId: id,
                res: JSON.stringify(res),
            });
            moduleHelper.send('_UpdateManagerOnUpdateReadyCallback', resStr);
        };
        obj.onUpdateReady(callback);
    },
    QG_VideoDecoderGetFrameData(id) {
        const obj = getVideoDecoderObject(id);
        if (!obj) {
            return JSON.stringify(formatResponse('FrameDataOptions'));
        }
        return JSON.stringify(formatResponse('FrameDataOptions', obj.getFrameData(), id));
    },
    QG_VideoDecoderRemove(id) {
        const obj = getVideoDecoderObject(id);
        if (!obj) {
            return;
        }
        obj.remove();
    },
    QG_VideoDecoderSeek(id, position) {
        const obj = getVideoDecoderObject(id);
        if (!obj) {
            return;
        }
        obj.seek(position);
    },
    QG_VideoDecoderStart(id, option) {
        const obj = getVideoDecoderObject(id);
        if (!obj) {
            return;
        }
        obj.start(formatJsonStr(option));
    },
    QG_VideoDecoderStop(id) {
        const obj = getVideoDecoderObject(id);
        if (!obj) {
            return;
        }
        obj.stop();
    },
    QG_VideoDecoderOff(id, eventName) {
        const obj = getVideoDecoderObject(id);
        if (!obj) {
            return;
        }
        offEventCallback(qgVideoDecoderList, (v) => {
            obj.off(eventName, v);
        }, id);
    },
    QG_VideoDecoderOn(id, eventName) {
        const obj = getVideoDecoderObject(id);
        if (!obj) {
            return;
        }
        const callback = onEventCallback(qgVideoDecoderList, '_VideoDecoderOnCallback', id, id + eventName);
        obj.on(eventName, callback);
    },
};
