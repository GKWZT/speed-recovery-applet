// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order:[],
        orderDetail:[]
    },
    test:function(){
        console.log(this.data.order);
        console.log(this.data.order.recycleClass);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        // 获取order页面传过来的订单id
        var orderId = options.id;
        // console.log(options.id);

        // 初始化云开发
        if(!wx.cloud){

        }else{
            wx.cloud.init({
                env:'你自己的env'
            });
        }

        let that = this
        wx.cloud.database().collection("takeOrderData").where({orderId: orderId}).get({
            success:function(res){
                that.setData({
                    order:res.data[0]
                }) 
            }
        })
        that.setData({
            order:that.data.order
        })
    }
})