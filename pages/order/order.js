// pages/order/order.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        OrderMessage:
            //没取消的
            {
            orderWaitMessage:'等待回收员确认上门时间',
            orderWaitColor:'#27ce8b',
            orderStatus:'待服务',
            oderDStatusColor:'#181818',
            orderHeight:'260',
            orderDisplay:'',
            orderMes:'零点已接单，正在快马加鞭赶来！',
            imgSrc:'http://tu1.gditc1.cn/i/2022/06/01/ff9aac4fabf874beefccfacb1d4172b-629717eccfce9.jpg'
            },
        // 取消后的
        OrderMessageCancel:{
            orderWaitMessage:'订单已取消，期待下次为您服务',
            orderWaitColor:'#b8b8b8',
            orderStatus:'已取消',
            oderDStatusColor:'#aeaeae',
            orderHeight:'80',
            orderDisplay:'display:none',
            orderMes:'',
            imgSrc:''
        },
        Order:[],
        telephone:"你自己的电话",
        orderTiems:0,
        isCan:false,
        array:['不想回收了','不方便回收','点错了下单','其他原因'],
    },
    // 取消订单
    cancelOrder:function(e){

        var cancelReason = this.data.array[e.detail.value];

        // 发送数据到消息页面
        const orderId = e.currentTarget.dataset['index']
        // console.log(orderId);

        // 获取取消时间代码
        var date = new Date();
        date.toLocaleString();
        var year = date.getFullYear();
        var month = date.getMonth()+1;

        if(month < 10){
            month = "0"+month;
        }


        var day = date.getDate();
        if(day < 10){
            day = "0"+day;
        }

        var hour = date.getHours();
        var min = date.getMinutes();

        if(min<10){
            min = "0"+min;
        }
        var second = date.getSeconds();
        if(second<10){
            second = "0"+second;
        }
        var cancelOrderTime = year+"-"+month+"-"+day+" "+hour+":"+min+":"+second;
        for(var i = 0;i < this.data.Order.length;i++){
            if(orderId === this.data.Order[i].orderId){
                // var tem = this.data.Order[i].isCancel;

                this.setData(this.data.Order[i].isCancel=true);
                // console.log(this.data.Order[i].isCancel);
                this.setData(this.data.Order[i].orderWaitMessage="订单已取消，期待下次为您服务");
                this.setData(this.data.Order[i].cancelOrderTime=cancelOrderTime);
                this.setData(this.data.Order[i].cancelReason=cancelReason)
                // takeOrderData 查询数据库
                wx.cloud.database().collection("takeOrderData").where({orderId: orderId}).get().then(res =>{
                    console.log("res.data:",res.data[0])
                    wx.cloud.database().collection("takeOrderData").doc(res.data[0]._id).update({
                        data:{
                            isCancel: true,
                            orderWaitMessage:"订单已取消，期待下次为您服务",
                            cancelOrderTime:cancelOrderTime,
                            cancelReason:cancelReason
                        }
                    })
                })
            }
        }
        const cancelOrderList = [];
        for(var i = 0;i<this.data.Order.length;i++){
            // console.log(this.data.Order[i].isCancel);
            if(this.data.Order[i].isCancel === true){
                cancelOrderList.push(this.data.Order[i].orderId);
            }
        }


        // console.log(this.data.Order[0].orderWaitMessage)

        this.setData({
            Order:this.data.Order
        });

    },
    

    // 打电话
    callPhone:function(){
        wx.makePhoneCall({
          phoneNumber: this.data.telephone,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        wx.showLoading({
          title: '加载中...',
        })
        setTimeout(function () {
            wx.hideLoading()
          }, 300)

        wx.cloud.init({
            env:'你自己的env'
        })

        let that = this
        wx.cloud.database().collection("takeOrderData").get({
            success:function(res){
                that.setData(that.data.Order.push(res.data))
                    that.setData({
                        Order: res.data
                    })
                    console.log(that.data.Order);
            }
        })
        console.log(that.data.Order);
        
    },
    switchDetail:function(e){
        console.log(e.currentTarget.dataset.id);
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/detail/detail?id='+id,
          })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (e) {

        wx.showLoading({
            title: '加载中...',
        })
        setTimeout(function () {
            wx.hideLoading()
        }, 200)

        wx.cloud.init({
            env:'你自己的env'
        })

        let that = this
        wx.cloud.database().collection("takeOrderData").get({
            success:function(res){
                that.setData(that.data.Order.push(res.data))
                    that.setData({
                        Order: res.data
                    })
                    console.log(that.data.Order);
            }
        })
        console.log(that.data.Order);


    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})