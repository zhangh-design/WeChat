// pages/movies/movies.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3";
    this.getMovieListData(inTheatersUrl);
  },
  getMovieListData: function (url) {
    var that = this;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/top250?start=0&count=3',
      method: 'GET',
      header: {
        'Content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res)
        that.processDoubanData(res.data)
      },
      fail: function () {
        console.info('failed')
      },
      complete: function () {
        console.info('complete')
      }
    })
  },
  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    console.info(movies)
    this.setData({
      movies: movies
    })
  }
})