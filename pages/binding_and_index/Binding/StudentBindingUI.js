// pages/binding & index/Binding/StudentBindingUI.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telephone: '',
    name: "",
    school:{},
  },

  onInputPhone: function (e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  onInputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  onChooseSchool: function (e) {
    wx.navigateTo({
      url: './ChooseSchool/ChooseSchool?userType=student',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onBinding: function () {
    if (this.data.telephone === '' || this.data.name === '' || this.data.school === '') {
      wx.showModal({
        title: '请完整填写！',
        showCancel: false
      })
      return
    }

      var IPPort = app.globalData.IPPort
      var self = this

      // 发送请求进行绑定
      wx.login({
        success:function(res) {
          wx.request({
            url: IPPort + '/me',
            data: {
              "phone": self.data.telephone,
              "name": self.data.name,
              "school": self.data.school,
              "type": "student",
              "jsCode":res.code
            },
            method: 'PUT',
            success: function (resp) {
              switch (resp.statusCode) {
                case 200:
                  console.log(resp);

                  wx.setStorageSync("id", resp.data.id)
                  wx.setStorageSync("type", "student")
                  wx.setStorageSync("name", resp.data.name)
                  wx.setStorageSync("jwt", resp.data.jwt)

                  wx.reLaunch({
                    url: '/pages/binding_and_index/Teacher_MainUI/Teacher_MainUI',
                  })
                  break;
                case 406:
                  wx.showModal({
                    title: '请求openid出错',
                    content: '请再次提交',
                    showCancel: false
                  })
                  break
                case 401:
                  wx.showModal({
                    title: '绑定信息出错',
                    content: '请确认你已经注册了该账号。或者确认姓名与学校填写的与注册的一致。',
                    showCancel: false
                  })
                  break
                default:
                  wx.showModal({
                    title: '未知的错误',
                    content: '出现了未知的错误',
                    showCancel: false
                  })
              }
            }
          })
        }
      })

    }


})