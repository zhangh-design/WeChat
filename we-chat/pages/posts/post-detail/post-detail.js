// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    currentPostId: null,
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var postId = options.id;
    var postData = postsData.postList[postId]; // 当前文章
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
    }

    // 监听音乐播放
    wx.onBackgroundAudioPlay(function(){
      that.setData({isPlayingMusic: true});
    });
    // 监听音乐暂停
    wx.onBackgroundAudioPause(function(){
      that.setData({isPlayingMusic: false});
    });
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
    this.getPostsCollectedSync();
    // this.getPostsCollectedAsy();
  },

  /**
   * 分享
   */
  onShareTap: function (event) {
    var itemList = ['分享给微信好友', '分享到朋友圈', '分享到QQ', '分享到微博']
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success(res) {
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: '用户 ' + itemList[res.tapIndex],
          content: '现在无法实现分享功能'
        });
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 播放音乐
   */
  onMusicTap: function () {
    var postData = postsData.postList[this.data.currentPostId]; // 当前文章
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      // this.data.isPlayingMusic = false; 这样赋值界面上无法自动更新
      this.setData({isPlayingMusic: false});
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      });
      // this.data.isPlayingMusic = true;
      this.setData({isPlayingMusic: true});
    }
  },

  // 异步
  getPostsCollectedAsy: function () {
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function (res) {
        console.info(res.data, that.data.currentPostId);
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        postCollected = !postCollected; // 收藏变成未收藏的，未收藏变成收藏的
        postsCollected[that.data.currentPostId] = postCollected;

        that.showToast(postsCollected, postCollected);
      }
    })
  },

  // 同步
  getPostsCollectedSync: function () {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected; // 收藏变成未收藏的，未收藏变成收藏的
    postsCollected[this.data.currentPostId] = postCollected;

    this.showToast(postsCollected, postCollected);
    // this.showModal(postsCollected, postCollected);
  },



  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: postCollected ? '收藏该文章？' : '取消收藏该文章？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#405f80',
      success(res) {
        if (res.confirm) {
          // 更新文章是否收藏的缓存值
          wx.setStorageSync('posts_collected', postsCollected);
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  showToast: function (postsCollected, postCollected) {
    // 更新文章是否收藏的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    });
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      icon: 'success',
      duration: 1500
    })
  }
})