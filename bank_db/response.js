const helper=require('./helper')
async function responses(req, res, next) {
    res.success = async function success(msg, value) {
        const responseValue = {
            status: "SUCCESS",
            message: msg ? msg : "",
            data: value ? value : ""
        }
        helper.logger.info(responseValue.message);
        return res.json(responseValue);

    };
    res.failure = async function failure(data, code, value) {
        const responseValue = {
            status: "FAILURE",
            message: data ? data : "",
            data: value ? value : ""
        }
        helper.logger.error(responseValue.message);
        return res.json(responseValue);
    }
    return next();
}

module.exports = {
    response: responses
}