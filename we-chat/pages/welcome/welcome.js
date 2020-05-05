Page({
  onTap: function () {
    /* wx.navigateTo({
      url: '../posts/posts',
    }) */
    wx.redirectTo({
      url: '../posts/posts',
      success: function(){
        console.log('welcome redirectTo success')
      }
    })
    console.log('onTap')
  },
  /**
   * 生命周期函数--监听页面隐藏
   * navigateTo 触发
   */
  onHide: function () {
    console.log('welcome page is onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   * redirectTo 触发
   */
  onUnload: function () {
    console.log('welcome page is onUnload');
  },
})