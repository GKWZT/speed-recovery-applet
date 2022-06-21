// pages/message/message.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cancelOrder:[],
        cancelOrderList:[]
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
        if(!wx.cloud){

        }else{
            wx.cloud.init({
                env:'你自己的环境env'
            })
        }

        const that = this
    
        wx.cloud.database().collection("takeOrderData").where({isCancel: true}).get({
            success:function(res){
                // console.log(res.data)
                

                that.setData({
                    cancelOrderList:res.data
                })
                
            }
            
        })
        that.setData({
            cancelOrderList:that.data.cancelOrderList
        })
        console.log(that.data.cancelOrderList);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
        wx.showLoading({
            title: '加载中...',
        })
        setTimeout(function () {
            wx.hideLoading()
        }, 200)
        if(!wx.cloud){

        }else{
            wx.cloud.init({
                env:'你自己的env'
            })
        }

        const that = this
        
        wx.cloud.database().collection("takeOrderData").where({isCancel: true}).get({
            success:function(res){
                that.setData({
                    cancelOrderList:res.data
                })
                console.log(that.data.cancelOrderList)
            }
            
        })
        that.setData({
            cancelOrderList:that.data.cancelOrderList
        })


    }
})