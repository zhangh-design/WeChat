// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    currentPostId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    var postData = postsData.postList[postId];
    this.setData(postData)
    this.setData({
      currentPostId: postId
    })
    /* var postsCollected = {
      1: true,
      2: true,
      3: false
    } */
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      if (postCollected) {
        this.setData({
          collected: postCollected
        });
      }
    } else {
      var postsCollected = {}
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
      console.info(wx.getStorageSync('posts_collected'));
    }
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
   * 收藏
   */
  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected; // 收藏变成未收藏的，未收藏变成收藏的
    postsCollected[this.data.currentPostId] = postCollected;
    // 更新文章是否收藏的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    });
  },

  /**
   * 分享
   */
  onShareTap: function (event) {}
})