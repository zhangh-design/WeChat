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
      url: './post-detail/post-detail?id=' + postId,
    })
  },

  /**
   * @desc 点击头部轮播跳转
   */
  onSwiperTap: function (event) {
    // target 指的是当前点击的组件，currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget 指的是Swiper组件
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: './post-detail/post-detail?id=' + postId,
    })
  }
})