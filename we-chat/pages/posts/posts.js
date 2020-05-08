var postsData = require('../../data/posts-data.js');

// pages/posts/posts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts_key: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      posts_key: postsData.postList
    });
    console.log('onLoad');
  },
  /**
   * @desc 点击跳转详情
   * @param {*} event 
   */
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    // console.log('onPostTap', postId);
    wx.navigateTo({
      url: './post-detail/post-detail?id='+postId,
    })
  }
})