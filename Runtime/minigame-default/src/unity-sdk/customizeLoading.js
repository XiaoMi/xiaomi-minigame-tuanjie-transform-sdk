const customizeLoadingMap = new Map

const listener = function(res){
}
export default{
    QGCreateCustomizeLoading(id, optionJson){
        let option = JSON.parse(optionJson);
        
        let loading = qg.createCustomizeLoading(option);
        // console.log("QGCreateCustomizeLoading "+id)
        // console.log("QGCreateCustomizeLoading "+loading)
        customizeLoadingMap.set(id,loading);
    },
    QGCustomizeLoadingUpdate(id, optionJson, updateCallback, callbackId){
        // console.log("QGCustomizeLoading_Update");
        let loading = customizeLoadingMap.get(id);


        if(loading){
            let option = JSON.parse(optionJson);
            loading.update({
                ...option,
                success:function(res){
                    console.log("suc "+res);
                    {{{ makeDynCall('viiii', 'updateCallback') }}} (id,callbackId,1,0);
                },
                fail:function(res){
                    console.log("fail "+res);
                    {{{ makeDynCall('viiii', 'updateCallback') }}} (id,callbackId,-1,0);
                },
                complete:function(res){
                    {{{ makeDynCall('viiii', 'updateCallback') }}} (id,callbackId,0,0);
                }
            });
        }else{
            console.log(`CustomizeLoading(id=${id}) does not exist`);
        }
    },
    QGCustomizeLoadingGetProgress(option){
        // console.log("QGCustomizeLoading_Update");
        let loading = customizeLoadingMap.get(option.id);
        if(loading){
            loading.getProgress({
                success:function(res){
                    var resJSON = JSON.stringify(res);
                    option.success(resJSON);
                },
                fail:function(res){
                    var resJSON = JSON.stringify(res);
                    option.fail(resJSON);
                },
                complete:function(res){
                    option.complete();
                }
            });
        }else{
            console.log(`CustomizeLoading(id=${id}) does not exist`);
        }
    },
    QGCustomizeLoading_Remove(id){
        // console.log("QGCustomizeLoading_Remove");
        let loading = customizeLoadingMap.get(id);
        if(loading){
            loading.remove();
            customizeLoadingMap.delete(id);
        }else{
            console.log(`CustomizeLoading(id=${id}) does not exist`);
        }
    },
    QGCustomizeLoading_ResetLoading(id){
        // console.log("QGCustomizeLoading_Reset");
        let loading = customizeLoadingMap.get(id);
        if(loading){
            loading.resetLoading();
        }else{
            console.log(`CustomizeLoading(id=${id}) does not exist`);
        }
    },
}