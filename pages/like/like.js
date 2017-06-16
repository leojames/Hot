
var num =1;
var numOld=1;
var maxNum=6;


  Page({    
   data: { mes: 'Hello MINA!',id: 0 
   ,array: [{ message: 'foo', }, { message: 'bar' }],numPic :num,
   numPicOld:num  
   } ,


  onReady: function () {
    this.animation = wx.createAnimation()
    this.animation1 = wx.createAnimation()
  },
  rotate: function () {
    this.animation.rotate(45).step()
    console.log('fuc invoke !')
    this.setData({ animation: this.animation.export() })
  },
    skew: function () {
    this.animation.skew(Math.random() * 90, Math.random() * 90).step()
    this.setData({ animation: this.animation.export() })
  },
  translate: function () {
    this.animation.translate(500, 200).rotate(45).step()
    this.setData({ animation: this.animation.export() })
  },
   reset: function () {
    this.animation.rotate(0, 0).scale(1).translate(0, 0).skew(0, 0).step({ duration: 0 })
    this.setData({ animation: this.animation.export() ,animation1:this.animation1.export() })
  },

  like : function(){
    wx.showToast({ title: '么么哒 ！',mask :false, duration: 300 })
      this.animation.translate(500, 200).rotate(45).step( {duration: 1000})
      this.animation1.rotate(0, 0) .scale(1).translate(0, 0).skew(0, 0).step({ duration: 0 })
      num++
      if(num>maxNum)
       num=1;
       numOld=num-1;
       if(numOld<=0)
           numOld=1;
       this.setData({
      numPic: num,
      numPicOld:numOld
    })
      
     this.reset()
            
   
  }
  ,dislike : function(){
     
      this.animation.translate(-500, 200).rotate(-45).step({duration: 1000})
            num++
      if(num>maxNum)
       num=1;
       numOld=num-1;
       if(numOld<=0)
           numOld=1;
       this.setData({
      numPic: num,
      numPicOld:numOld
    })
   // this.setData({ animation: this.animation.export() })
    
    this.reset()
  },
  profile : function(){
    wx.navigateTo({
      url: '/pages/profile/profile',
      
    })
  }
  ,
    chat : function(){
    wx.navigateTo({
      url: '/pages/chat/chat',

    })
  },
  setDisabled: function(e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  setPlain: function(e) {
    this.setData({
      plain: !this.data.plain
    })
  },
  setLoading: function(e) {
    this.setData({
      loading: !this.data.loading
    })
  }




})




