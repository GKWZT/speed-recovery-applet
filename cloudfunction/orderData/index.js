const cloud = require('wx-server-sdk')
cloud.init({
    env: 'lds-1g62fppd434581c9',
})
exports.main = async (event, context) => {
    try {
        const { OPENID } = cloud.getWXContext();
        console.log("OPENID:",OPENID);
        const result = await cloud.openapi.subscribeMessage.send({
            "touser": OPENID,
            "lang": 'zh_CN',
            "page": '/pages/recycle/recycle',
            "template_id": '你自己的tempId',
            "miniprogram_state": 'developer',
            "data":{
                "thing19": {
                    "value":event.data1,
                },
                "phone_number18": {
                    "value":event.data2,
                },
                "character_string22": {
                    "value":event.data3,
                },
                "thing38": {
                    "value":event.data4,
                },
                "thing27": {
                    "value":event.data5,
                },
            },
        })
        return result
    } catch (err) {
        // 返回504002错误
        return err
    }
}