let logger;
export default {
    QGLogManagerDebug(str) {
        if (!logger) {
            logger = qg.getLogManager({ level: 0 });
        }
        logger.debug(str);
    },
    QGLogManagerInfo(str) {
        if (!logger) {
            logger = qg.getLogManager({ level: 0 });
        }
        logger.info(str);
    },
    QGLogManagerLog(str) {
        if (!logger) {
            logger = qg.getLogManager({ level: 0 });
        }
        logger.log(str);
    },
    QGLogManagerWarn(str) {
        if (!logger) {
            logger = qg.getLogManager({ level: 0 });
        }
        logger.warn(str);
    },
};
