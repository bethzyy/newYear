// pages/index/index.js
Page({
  data: {
    isAnimating: false,
    animationItems: [],
    timer: null
  },

  // 马字成语列表
  horseIdioms: [
    '马到成功', '一马当先', '龙马精神', '马年大吉',
    '万马奔腾', '马不停蹄', '千里马', '快马加鞭',
    '马到功成', '金戈铁马', '车水马龙', '马首是瞻',
    '马不停蹄', '招财进宝', '恭喜发财', '大吉大利',
    '五福临门', '年年有余', '财源广进', '心想事成'
  ],

  // 图片资源路径(使用SVG格式,微信小程序支持)
  auspiciousImages: [
    '/images/lantern.svg',
    '/images/coin.svg',
    '/images/ingot.svg',
    '/images/firecracker.svg',
    '/images/peach.svg',
    '/images/fish.svg'
  ],

  // 颜色列表
  colors: [
    '#FFD700', '#FFA500', '#FF6347', '#FF4500',
    '#DC143C', '#B22222', '#FF1493', '#FF69B4'
  ],

  // 切换动画状态
  toggleAnimation() {
    if (this.data.isAnimating) {
      this.stopAnimation();
    } else {
      this.startAnimation();
    }
  },

  // 开始动画
  startAnimation() {
    this.setData({
      isAnimating: true
    });

    // 每隔300ms生成一个新的动画元素
    this.data.timer = setInterval(() => {
      this.createAnimationItem();
    }, 300);
  },

  // 停止动画
  stopAnimation() {
    this.setData({
      isAnimating: false,
      animationItems: []
    });

    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.data.timer = null;
    }
  },

  // 创建动画元素
  createAnimationItem() {
    const systemInfo = wx.getSystemInfoSync();
    const screenWidth = systemInfo.windowWidth;
    const screenHeight = systemInfo.windowHeight;

    // 随机选择类型(图片或文字)
    const type = Math.random() > 0.4 ? 'text' : 'image';
    let content = '';
    let fontSize = 0;

    if (type === 'text') {
      // 随机选择成语
      const randomIndex = Math.floor(Math.random() * this.data.horseIdioms.length);
      content = this.data.horseIdioms[randomIndex];
      fontSize = Math.floor(Math.random() * 20) + 32; // 32-52rpx
    } else {
      // 随机选择图片
      const randomIndex = Math.floor(Math.random() * this.data.auspiciousImages.length);
      content = this.data.auspiciousImages[randomIndex];
    }

    // 随机位置(从底部随机位置出现)
    const x = Math.random() * (screenWidth - 100);
    const y = screenHeight - 150;

    // 随机动画时长
    const duration = Math.random() * 2 + 2; // 2-4秒

    // 随机颜色(仅用于文字)
    const colorIndex = Math.floor(Math.random() * this.data.colors.length);
    const color = this.data.colors[colorIndex];

    // 生成唯一ID
    const id = Date.now() + Math.random();

    // 添加到动画列表
    const newItem = {
      id,
      type,
      content,
      x,
      y,
      duration,
      color,
      fontSize
    };

    const animationItems = this.data.animationItems;
    animationItems.push(newItem);

    this.setData({
      animationItems
    });

    // 动画结束后移除元素
    setTimeout(() => {
      const items = this.data.animationItems;
      const index = items.findIndex(item => item.id === id);
      if (index > -1) {
        items.splice(index, 1);
        this.setData({
          animationItems: items
        });
      }
    }, duration * 1000);
  },

  // 页面卸载时清除定时器
  onUnload() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  }
})
