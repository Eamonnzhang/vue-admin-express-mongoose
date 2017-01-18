exports.genMsg = (success,msg,data=[],meta={}) => {
    var msg = {
        success : success,
        msg : msg,
        data : data,
        meta:meta
    }
    return msg;
}
exports.genSuccessMsg = (msg,data,meta) => {
    return this.genMsg(true,msg,data,meta)
}
exports.genFailedMsg = (msg,data,meta) => {
    return this.genMsg(false,msg,data,meta)
}
