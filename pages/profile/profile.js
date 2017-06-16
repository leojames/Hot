var app = getApp()
var sourceType = [ ['camera'], ['album'], ['camera', 'album'] ]
var sizeType = [ ['compressed'], ['original'], ['compressed', 'original'] ]

Page({


  data: {
    motto: 'Hello World',
    userInfo: {},
    userdata: {},
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],
    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],
    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],   
     CountryArray: ['中国', '美国', '巴西', '日本'],
    IndustryArray: ['互联网', '金融', '建筑', '设计'],
    JobArray: ['工程师', '产品经理', 'CEO'],
    countryIndex: 0,
    jobIndex: 0,
    industryIndex: 0,
    date: '1990-00-01',
    time: '12:01'
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {

      //更新数据
      that.setData({
        userInfo: userInfo
      })
      console.log(userInfo)
    })
  }
  ,
  getProfile: function () {
    var that = this
    wx.request({
      url: 'https://abce.com:8443/user/profile/1',
      data: {},
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        //更新数据
        that.setData({
          userdata: res.data
        })
      }
    })
  },

  countryChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      countryIndex: e.detail.value
    })
  },
  industryChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      industryIndex: e.detail.value
    })
  },
  jobChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      jobIndex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this
    wx.request({
      url: 'https://abce.com:8443/user/add',
      data: {
        user_json: e.detail.value
      },

      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        //更新数据
        that.setData({
          userdata: res.data
        })
      }
    })
  },
  formReset: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }

  ,

  
  sourceTypeChange: function (e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange: function (e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange: function (e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  uploadFile: function (e) {
 
    var tempFilePaths = this.data.imageList
    console.log(tempFilePaths)
        wx.uploadFile({
          url: 'https://abce.com:8443/pic/add',
          filePath: tempFilePaths[0],
          header: {
     'content-type': 'multipart/form-data'
          　　　　},
          name: 'file',
          formData: { 'user': 'test' },
          success: function (res) {
            var data = res.data
            console.log(data)
          },fail:function(res){
            console.log(res.data)
          }
        
        })
  
  }


})


