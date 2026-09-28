export default{

    QGGetLocation(loc){
        qg.getLocation({
            ...loc.locOption,
            success:loc.success,
            fail:loc.fail,
            complete:loc.complete
        })
    },
}