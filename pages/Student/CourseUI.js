// pages/Student/CourseUI.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentID:1,
    classID:1,            
    courseID:1,
    courseName: 'OOAD',           //这四个靠前面传过来
    seminarList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /*
  onLoad: function (options) {
    this.setData({
      courseName: JSON.parse(options.courseList)
    })*/
  onLoad: function (options) {
    var temp = JSON.parse(options.str)
    console.log(temp)

   this.setData({
     studentID: temp.studentID,
     classID: temp.classID,
     courseID: temp.courseID,
     courseName: temp.courseName,           //这四个靠前面传过来
  })
    var self = this;
    var jwt = wx.getStorageSync('jwt')
    wx.request({
      url: app.globalData.IPPort + '/course/' + this.data.courseID +'/seminar?embedGrade=true',
      method: 'get',
      header: {
        Authorization: 'Bearer ' + jwt
      },
      success: function (res) {
        console.log(res.data)
        self.setData({
          seminarList: res.data
        })
        for (var i = 0; i < self.data.seminarList.length; i++) {
          self.data.seminarList[i].number = self.data.seminarList.length-i
        }
      },
      fail: function () {
        wx.showToast({
          title: '页面加载失败',
          icon: 'fail',
          duration: 1000,
          mask: true
        })
      }
    })  
  },

  
//跳到讨论课主页，传入讨论课id
  enterSeminar:function(event)
  {
    var sname
    for (var i = 0; i < this.data.seminarList.length; i++) 
      if (event.currentTarget.id == this.data.seminarList[i].id)
        sname = this.data.seminarList[i].name
    console.log("snumber:" + sname)
    console.log("snumber:" + sname)
    var data = {
      'studentID': this.data.studentID, 'classID':this.data.classID,   
      'courseID': this.data.courseID, 'courseName': this.data.courseName, 'seminarID': event.currentTarget.id, 'seminarName': sname}
    wx.navigateTo({
      url: 'Seminar/Seminar?str=' + JSON.stringify(data),
    })
  },


  detail:function()
  {
    wx.navigateTo({
      url: 'Seminar/CourseInfo?str=' + JSON.stringify(this.data.courseID),
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
  onShow: function () {
  
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