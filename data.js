const TRAVEL_DATA = {
  meta: {
    title: "青岛 3 天 3 夜",
    subtitle: "自驾旅行地图",
    center: [36.08, 120.45],
    zoom: 11
  },
  paymentLabels: {
    card: "信用卡",
    alipay: "支付宝",
    transit: "交通卡",
    cash: "现金"
  },
  typeLabels: {
    food: "🍜 美食",
    drink: "☕ 咖啡",
    attraction: "🎡 景点",
    hotel: "🛏 住宿",
    transport: "🚗 交通",
    viewpoint: "🌅 观景",
    beach: "🏖 海滩",
    park: "🌳 公园",
    street: "🚶 街区",
    shopping: "🛍 购物"
  },
  days: [
    {
      id: "day1",
      date: "9月3日 · 周四",
      title: "抵达青岛 · 深夜食堂",
      subtitle: "青岛北站取车 → 青岛栈桥海景美居酒店 → 美食夜校",
      accent: "#FF9500",
      items: [
        {
          id: "day1-hotel",
          time: "21:30–22:10",
          title: "青岛栈桥海景美居酒店",
          type: "hotel",
          lat: 36.05379,
          lng: 120.30576,
          address: "青岛市市南区巫峡路23号",
          note: "办理入住；市区道路泊位 20:00–次日 7:00 免费。",
          payments: ["card", "alipay"],
          booking: {
            label: "酒店预订",
            mode: "note",
            note: "建议提前在携程 / 飞猪等平台确认房态，并备注自驾停车需求。"
          }
        },
        {
          id: "day1-food",
          time: "23:00–00:30",
          title: "美食夜校",
          type: "food",
          lat: 36.07090,
          lng: 120.42500,
          address: "市南区香港中路126号“公园里”园区",
          note: "汇集26家青岛本土餐饮品牌，营业至凌晨2点；园区约300个停车位。",
          payments: ["alipay", "card", "cash"],
          dianping: false
        }
      ]
    },
    {
      id: "day2",
      date: "9月4日 · 周五",
      title: "老城 City Walk → 崂山仰口 → 民宿日落",
      subtitle: "早市、栈桥、老城漫游，下午进崂山仰口，晚上海景私汤",
      accent: "#FF3B30",
      items: [
        {
          id: "day2-market",
          time: "07:30–08:30",
          title: "台西纬四路早市",
          type: "food",
          lat: 36.07060,
          lng: 120.31470,
          address: "市南区台西纬四路 / 八大峡早市",
          note: "甜沫、馅饼，体验本地清晨；6:30–8:30 最热闹。",
          payments: ["cash", "alipay"],
          dianpingKeyword: "青岛 台西纬四路 早市"
        },
        {
          id: "day2-xilingxia",
          time: "08:30–09:00",
          title: "西陵峡三路转角 · 李慰农公园",
          type: "street",
          lat: 36.06030,
          lng: 120.30790,
          address: "市南区西陵峡三路 → 西陵峡一路 → 李慰农公园",
          note: "“青岛版小镰仓”转角拍照，沿海漫步。",
          payments: []
        },
        {
          id: "day2-zhanqiao",
          time: "09:00–09:40",
          title: "栈桥",
          type: "attraction",
          lat: 36.06200,
          lng: 120.31600,
          address: "市南区太平路14号",
          note: "青岛地标，24小时免费开放。",
          payments: ["cash", "alipay"]
        },
        {
          id: "day2-yinyu",
          time: "09:40–10:40",
          title: "银鱼巷",
          type: "street",
          lat: 36.06500,
          lng: 120.31380,
          address: "市南区中山路商圈宁阳路3号",
          note: "百年小巷变身潮流街区，全长约200–300米。",
          payments: []
        },
        {
          id: "day2-church",
          time: "10:40–11:30",
          title: "圣弥厄尔大教堂",
          type: "attraction",
          lat: 36.06800,
          lng: 120.31560,
          address: "市南区浙江路15号",
          note: "哥特式建筑，入内参观约10元（周五开放）。",
          payments: ["cash", "alipay"]
        },
        {
          id: "day2-lunch",
          time: "12:00–13:00",
          title: "船歌鱼水饺（瞿塘峡路店）",
          type: "food",
          lat: 36.06030,
          lng: 120.30980,
          address: "市南区瞿塘峡路39号甲",
          note: "品牌首店；招牌鲅鱼水饺、墨鱼水饺，营业10:00–21:00。",
          payments: ["alipay", "card", "cash"],
          dianpingKeyword: "船歌鱼水饺 瞿塘峡路店"
        },
        {
          id: "day2-yangkou",
          time: "14:00–17:00",
          title: "仰口游览区",
          type: "attraction",
          lat: 36.24000,
          lng: 120.67000,
          address: "崂山区仰口检查站进入",
          note: "推荐索道上山；索道约16:30–17:00停运，建议15:00前上山。",
          payments: ["alipay", "cash"],
          booking: {
            label: "官方预约",
            mode: "note",
            note: "请提前在“崂山风景区”公众号购票预约，并联系民宿报备车牌号。"
          }
        },
        {
          id: "day2-hotel",
          time: "17:30–18:00",
          title: "印澜三宅 · 海景温泉民宿",
          type: "hotel",
          lat: 36.21610,
          lng: 120.68320,
          address: "崂山区雕龙嘴村462号",
          note: "民宿、餐厅、咖啡、酒馆于一体，有免费私人停车场。",
          payments: ["card", "alipay"],
          booking: {
            label: "民宿预订",
            mode: "note",
            note: "部分房型带观海私汤与柴火壁炉，建议提前联系确认房型。"
          }
        },
        {
          id: "day2-beach",
          time: "18:00–19:00",
          title: "雕龙嘴海滩",
          type: "beach",
          lat: 36.21500,
          lng: 120.68700,
          address: "民宿步行约5分钟",
          note: "海上日落约18:20；之后回民宿晚餐，推荐蛤蜊烧鸡。",
          payments: []
        }
      ]
    },
    {
      id: "day3",
      date: "9月5日 · 周六",
      title: "崂山太清 → 小鱼山 → 小青岛日落",
      subtitle: "太清宫、市区老城后半段 City Walk、五四广场灯光秀",
      accent: "#FFCC00",
      items: [
        {
          id: "day3-sunrise",
          time: "06:00–07:00",
          title: "雕龙嘴海上日出（可选）",
          type: "viewpoint",
          lat: 36.21610,
          lng: 120.68320,
          address: "雕龙嘴村正对东方",
          note: "日出约05:31，天气合适再起床。",
          payments: []
        },
        {
          id: "day3-taiqing",
          time: "09:00–12:00",
          title: "太清风景区",
          type: "attraction",
          lat: 36.13930,
          lng: 120.67180,
          address: "崂山区太清宫",
          note: "太清宫门票约27元，需单独购买；参观老子像与道教古建筑群。",
          payments: ["cash", "alipay"],
          booking: {
            label: "官方预约",
            mode: "note",
            note: "建议提前购买南线联票（130元，3日有效），在“崂山风景区”公众号办理。"
          }
        },
        {
          id: "day3-hotel",
          time: "13:00–14:00",
          title: "海逸国际酒店公寓",
          type: "hotel",
          lat: 36.06150,
          lng: 120.38250,
          address: "市南区东海西路29号海逸天成B座",
          note: "五四广场旁，免费地下停车场。",
          payments: ["card", "alipay"],
          booking: {
            label: "酒店预订",
            mode: "note",
            note: "建议提前确认房型与免费停车政策。"
          }
        },
        {
          id: "day3-parking",
          time: "15:00–15:30",
          title: "大学路停车场",
          type: "transport",
          lat: 36.06100,
          lng: 120.32900,
          address: "大学路 / 龙口路出入口",
          note: "网红墙对面，248个车位；20分钟内免费。",
          payments: ["cash", "alipay", "transit"]
        },
        {
          id: "day3-xinhaoshan",
          time: "15:30–16:00",
          title: "信号山公园",
          type: "park",
          lat: 36.06630,
          lng: 120.33100,
          address: "市南区龙山路",
          note: "公园免费，旋转观景楼10元/人，16:00停止预约。",
          payments: ["cash", "alipay"]
        },
        {
          id: "day3-longjiang",
          time: "16:00–16:30",
          title: "宫崎骏漫画街（龙江路）",
          type: "street",
          lat: 36.06550,
          lng: 120.32800,
          address: "市南区龙江路与黄县路交汇",
          note: "宫崎骏动画墙绘，适合拍照。",
          payments: []
        },
        {
          id: "day3-redwall",
          time: "16:30–16:50",
          title: "大学路网红墙",
          type: "attraction",
          lat: 36.06100,
          lng: 120.32900,
          address: "大学路与鱼山路交汇",
          note: "经典红墙打卡。",
          payments: []
        },
        {
          id: "day3-xiaoyushan",
          time: "16:50–17:30",
          title: "小鱼山公园",
          type: "park",
          lat: 36.05890,
          lng: 120.33610,
          address: "市南区鱼山路和福山路交会处",
          note: "免费；山顶“览潮阁”俯瞰汇泉湾。",
          payments: []
        },
        {
          id: "day3-bath",
          time: "17:30–18:00",
          title: "第一海水浴场",
          type: "beach",
          lat: 36.05670,
          lng: 120.33610,
          address: "市南区南海路",
          note: "沿海步行，沙滩开阔。",
          payments: []
        },
        {
          id: "day3-luxun",
          time: "17:30–18:00",
          title: "鲁迅公园",
          type: "park",
          lat: 36.05470,
          lng: 120.32730,
          address: "市南区莱阳路",
          note: "海边红礁石，沿海步行。",
          payments: []
        },
        {
          id: "day3-qinyu",
          time: "18:00–19:00",
          title: "琴屿路",
          type: "street",
          lat: 36.05480,
          lng: 120.32390,
          address: "市南区琴屿路",
          note: "S弯拍照；禁止机动车进入。",
          payments: []
        },
        {
          id: "day3-xiaoqingdao",
          time: "18:00–19:00",
          title: "小青岛",
          type: "viewpoint",
          lat: 36.05330,
          lng: 120.32370,
          address: "市南区琴屿路26号",
          note: "日落约18:17，之后可看“琴屿飘灯”。",
          payments: ["cash", "alipay"]
        },
        {
          id: "day3-wusi",
          time: "19:30–21:00",
          title: "五四广场灯光秀",
          type: "attraction",
          lat: 36.06150,
          lng: 120.38530,
          address: "市南区东海西路",
          note: "4月16日–9月15日开启时间19:30–22:00。",
          payments: []
        }
      ]
    },
    {
      id: "day4",
      date: "9月6日 · 周日",
      title: "咖啡厅 + 返程",
      subtitle: "海景咖啡打卡 → 午餐 / 自由活动 → 青岛北站还车",
      accent: "#34C759",
      items: [
        {
          id: "day4-vanilla",
          time: "10:00–12:00",
          title: "Vanillacafe香草咖啡",
          type: "drink",
          lat: 36.05450,
          lng: 120.39500,
          address: "市南区东海中路银海大世界",
          note: "老牌网红海景咖啡，好停车。",
          payments: ["alipay", "card", "cash"],
          dianpingKeyword: "Vanillacafe香草咖啡 银海大世界店"
        },
        {
          id: "day4-ivan",
          time: "10:00–12:00",
          title: "Ivan Coffee（太平路店）",
          type: "drink",
          lat: 36.06000,
          lng: 120.31650,
          address: "市南区太平路海边一线",
          note: "出门就是海，位置以实际定位为准。",
          payments: ["alipay", "card", "cash"],
          dianpingKeyword: "Ivan Coffee 青岛 太平路"
        },
        {
          id: "day4-mixc",
          time: "12:00–14:00",
          title: "万象城午餐",
          type: "shopping",
          lat: 36.06700,
          lng: 120.37260,
          address: "市南区山东路6号",
          note: "午餐 + 自由活动，可解决餐饮或补拍。",
          payments: ["card", "alipay"]
        },
        {
          id: "day4-badaguan",
          time: "12:00–14:00",
          title: "八大关",
          type: "attraction",
          lat: 36.05670,
          lng: 120.34450,
          address: "市南区八大关风景区",
          note: "时间允许可补拍；红瓦绿树、欧陆风情。",
          payments: []
        },
        {
          id: "day4-station",
          time: "14:00–15:00",
          title: "青岛北站还车",
          type: "transport",
          lat: 36.16930,
          lng: 120.36930,
          address: "李沧区青岛北站",
          note: "预留充足时间，傍晚高铁返程。",
          payments: ["transit", "cash"]
        }
      ]
    }
  ]
};

if (typeof window !== "undefined") {
  window.TRAVEL_DATA = TRAVEL_DATA;
}

export { TRAVEL_DATA };
