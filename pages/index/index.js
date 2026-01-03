// pages/index/index.js
Page({
  data: {
    isAnimating: false,
    animationItems: [],
    timer: null
  },

  // 马字成语列表
  horseIdioms: [
    // 四字成语
    '马到成功', '龙马精神', '一马当先', '万马奔腾',
    '快马加鞭', '跃马扬鞭', '龙神马壮', '鲜衣怒马',
    '宝马香车', '驷马高车', '策马奔腾', '骏马迎春',
    '祥马报喜', '金马送福',
    // 长句祝福
    '新年策马，万事顺意',
    '龙马启新岁，平安伴整年',
    '一马当先开锦绣，三阳开泰贺新春',
    '万马奔腾新气象，阖家欢乐福满堂',
    '骏马踏春来，财源滚滚至',
    '祥马迎福，岁岁安康',
    '策马赴新程，前程皆似锦',
    '金马纳祥瑞，新年行大运',
    // 流行祝福
    '马上有财',
    '马上有闲',
    '马上躺赢一整年'
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
