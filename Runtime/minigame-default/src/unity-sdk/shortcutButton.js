const shortcutBtnMap = new Map

const listener = function(res){
}
export default{
    QGCreateShortcutButton(sbId, conf){
        var option = JSON.parse(conf);
        let sb = qg.createShortcutButton(option);
        sb.listenerMap = new Map;
        shortcutBtnMap.set(sbId,sb);
    },
    QGShortcutButton_Show(sbId){
        console.log("QGShortcutButton_Show");
        let sb = shortcutBtnMap.get(sbId);
        if(sb){
            sb.show();
        }else{
            console.log(`Shortbutton(id=${sbId}) does not exist`);
        }
    },
    QGShortcutButton_Hide(sbId){
        let sb = shortcutBtnMap.get(sbId);
        if(sb){
            sb.hide();
        }else{
            console.log(`Shortbutton(id=${sbId}) does not exist`);
        }
    },
    QGShortcutButton_OnTap(sbId,listenerId,ontapListener){
        console.log("QGShortcutButton_OnTap");
        let sb = shortcutBtnMap.get(sbId);        
        if(sb){
            sb.listenerMap.set(listenerId,ontapListener)
            sb.onTap(ontapListener)
        }
    },
    QGShortcutButton_OffTap(sbId,listenerId){
        console.log("QGShortcutButton_OffTap");
        let sb = shortcutBtnMap.get(sbId);
        
        if(sb){
            let listener = sb.listenerMap.get(listenerId);
            sb.offTap(listener);
        }
    },
    QGShortcutButton_OnError(sbId,listenerId,onErrorListener){
        console.log("QGShortcutButton_OnError");
        let sb = shortcutBtnMap.get(sbId);
        sb.listenerMap.set(listenerId,ontapListener)
        if(sb){
            sb.onTap(ontapListener)
        }
    },
    QGShortcutButton_OffError(sbId,listenerId){
        console.log("QGShortcutButton_OffError");
        let sb = shortcutBtnMap.get(sbId);        
        if(sb){
            let listener = sb.listenerMap.get(listenerId);
            sb.offTap(listener);
        }
    },
    QGShortcutButton_Destroy(sbId){
        let sb = shortcutBtnMap.get(sbId);
        if(sb){
            sb.destroy();
        }else{
            console.log(`Shortbutton(id=${sbId}) does not exist`);
        }
        shortcutBtnMap.delete(sbId);
    },
}