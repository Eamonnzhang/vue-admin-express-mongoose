const mongoose = require('mongoose');
const User = mongoose.model('User');
const { wrap: async } = require('co');
const msg = require('../../utils/message')

exports.load = async(function* (req,res,next,id){
    try {
        req.user = yield User.load(id)
        if (!req.user) return next(new Error('Use not found'));
    } catch (error) {
        return next(err);
    }
    next()
})

exports.create = async(function* (req,res){
    let  user = new User(req.body);
    try {
        yield user.updateAndSave();
        res.send(msg.genSuccessMsg('保存成功'))
    } catch (error) {
        console.log(error);
        res.send(msg.genFailedMsg('保存失败'))
    }
})
exports.update = async(function*(req,res){
    try {
        let user = req.user;
        user = Object.assign(user,req.body);
        yield user.updateAndSave();
        res.send(msg.genSuccessMsg('保存成功'))
    } catch (error) {
        console.log(error);
        res.send(msg.genFailedMsg('保存失败'))
    }
})
exports.list = async(function* (req,res){
    try{
        var query = {
            page : parseInt(req.query.page)-1,
            limit : parseInt(req.query.limit)
        }
        var list = yield User.list(query);
        var count = yield User.count();
        res.send(msg.genSuccessMsg('读取用户列表成功',list,{count:count}))
    } catch (error){
        console.log(error);
        res.send(msg.genFailedMsg('保存失败'))
    }
})
exports.delete = async(function* (req,res){
    try {
        let user = req.user;
        yield user.remove()
        res.send(msg.genSuccessMsg('删除成功',user))
    } catch (error) {
        console.log(error);
        res.send(msg.genFailedMsg('删除失败'))
    }
})
