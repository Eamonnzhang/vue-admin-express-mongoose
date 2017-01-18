const mongoose = require('mongoose');
const User = mongoose.model('User');
const { wrap: async } = require('co');
const msg = require('../../utils/message')

exports.create = async(function* (req,res){
    let user;
    if(req.body.id){
        user = yield User.load(req.body.id);
        user = Object.assign(user,req.body);
    }else{
        user = new User(req.body);
    }
    try {
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
