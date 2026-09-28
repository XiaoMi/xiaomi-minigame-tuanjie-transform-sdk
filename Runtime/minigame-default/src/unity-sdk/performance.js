const performanceMap = new Map

const listener = function(res){
}
export default{
    QGGetPerformance(perfId){
        let perf = qg.getPerformance();
        performanceMap.set(perfId,perf);
    },
    QGPerformance_Now(perfId){
        let perf = performanceMap.get(perfId);
        if(perf){
            return perf.now();
        }else{
            console.log(`Performance(id=${sbId}) does not exist`);
            return -1;
        }
    }
}