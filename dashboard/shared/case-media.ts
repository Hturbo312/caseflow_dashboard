import type { CaseMedia } from "./types";

// Curated from the supplied CaseFlow image ledger. These are source URLs, not
// generated artwork; null imageUrl means the source page/PDF must be opened.
export const CASE_MEDIA: Record<string, CaseMedia[]> = {
  C01: [{ caption: "Arabianranta居住区建筑及公共艺术", type: "项目实景", imageUrl: "https://images.ctfassets.net/z7ety0aygnfq/42z0yzNxoNHFoOMe4Bhm6w/901f279fab22458bc4745d890691f719/Metadata_Julkisivu_Talo1_kesa2012-_2_.jpg?w=1200", sourceUrl: "https://www.sato.fi/fi/vuokra-asunnot/helsinki/arabianranta", credit: "SATO（住宅运营机构）", status: "直接对应" }],
  C02: [{ caption: "Havukoski住宅区建筑现状", type: "项目实景", imageUrl: "https://www.vantaa.fi/sites/default/files/styles/og_image/public/image/havukoski_MG_3177_0.jpg?h=dbfb23f9&itok=PY0xj7-j", sourceUrl: "https://www.vantaa.fi/fi/ajankohtaista/uutinen/tule-mukaan-kehittamistyopajaan-2-310-visioimaan-havukosken-tulevaisuutta", credit: "万塔市政府 Vantaa", status: "直接对应" }],
  C03: [{ caption: "Slaithwaite村庄与Globe Mills航拍", type: "项目场景", imageUrl: "https://www.kbmortgageservices.co.uk/wp-content/uploads/2018/10/slawit-2-1.jpg", sourceUrl: "https://www.kbmortgageservices.co.uk/blog/5-reasons-you-should-think-about-moving-to-slaithwaite/", credit: "KB Mortgage Services", status: "直接对应" }],
  C04: [{ caption: "田林十二村居民区实景", type: "项目实景", imageUrl: "/case-media/C04.jpg", sourceUrl: "https://www.jfdaily.com/wx/detail.do?id=118432", credit: "上观新闻 / 舒抒 摄", status: "已下载，来源已定位" }],
  C05: [{ caption: "复元坊智能垃圾分类设施", type: "技术应用实景", imageUrl: "https://p0.itc.cn/q_70/images03/20210907/f49fe4631a494cbcba8a18f82188f289.jpeg", sourceUrl: "https://www.jingan.gov.cn/rmtzx/003008/003008002/20210907/3b4b8c84-305a-4ce4-89c8-f71617d0a51a.html", credit: "上海静安区政府（原报道）；原图网络转载", status: "直接对应" }],
  C06: [{ caption: "Frogbox环境传感器部署实物", type: "技术设备实景", imageUrl: "https://apps.watershed.co.uk/shared/imagecache/appimages/1931/default/16-9/1200/16/08/deployment-1.jpg", sourceUrl: "https://www.watershed.co.uk/whatson/7608/how-can-sensor-tech-and-data-be-used", credit: "Watershed Bristol", status: "直接对应" }],
  C07: [{ caption: "Carpenters Estate居民规划咨询活动", type: "公众参与实景", imageUrl: "https://www.populoliving.co.uk/media/5q0b3f5d/0008.jpg?height=445&mode=max&width=556", sourceUrl: "https://www.populoliving.co.uk/the-carpenters/the-masterplan/students-guide-to-carpenters/", credit: "Populo Living（项目实施机构）", status: "直接对应" }],
  C08: [{ caption: "北村生活实验室智能垃圾箱", type: "技术设备实景", imageUrl: "https://ojsfile.ohmynews.com/STD_IMG_FILE/2017/0301/IE002118194_STD.jpg", sourceUrl: "https://www.ohmynews.com/NWS_Web/View/img_pg.aspx?CNTN_CD=IE002118194", credit: "OhmyNews", status: "直接对应" }],
  C09: [{ caption: "刘燕介绍“及时雨”数字社区平台", type: "技术应用实景", imageUrl: "/case-media/C09.jpg", sourceUrl: "https://politics.people.com.cn/n1/2024/1223/c1001-40388030.html", credit: "人民网转载央广网 / 王锡斐 摄", status: "已下载，来源已定位" }],
  C10: [{ caption: "SmartEnCity改造住宅和建筑壁画", type: "更新后实景", imageUrl: "https://s.err.ee/photo/crop/2020/10/06/825466h5b19.jpg", sourceUrl: "https://news.err.ee/1143684/gallery-15-of-tartu-s-smartencity-smartovka-murals-have-been-completed", credit: "ERR 爱沙尼亚公共广播", status: "直接对应" }],
  C11: [{ caption: "Coronación建筑节能改造项目前外立面", type: "更新前实景", imageUrl: "https://www.premiosdearquitectura.es/es/media/obras/images/big/7028-smartencity-20200228110445.png", sourceUrl: "https://www.premiosdearquitectura.es/es/premios/40-premios-avs-2020/obras-presentadas/979-smartencity", credit: "AVS 建筑奖参评项目资料", status: "直接对应" }],
  C12: [{ caption: "Eastserve 办公室（418 Ashton Old Road）外的剪彩活动", type: "项目实景", imageUrl: "/case-media/C12.jpg", sourceUrl: "https://www.manchestereveningnews.co.uk/news/local-news/staying-in-touch-just-got-easier-914080", credit: "Manchester Evening News", status: "已下载，来源已定位" }],
  C13: [{ caption: "Motor City Mapping 外业数据 mission control（TechTown）", type: "技术应用实景", imageUrl: "/case-media/C13.jpg", sourceUrl: "https://s3.amazonaws.com/detroit-blight-taskforce/CHAPTER+03.pdf", credit: "Detroit Blight Removal Task Force Plan (2014), Chapter 3", status: "已下载，来源已定位" }],
  C14: [
    { caption: "劲松北社区更新后的住宅与公共空间（远景）", type: "项目实景", imageUrl: "/case-media/C14.jpg", sourceUrl: "https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/zxzt/wsghs/2021dyj/d4j/202102/t20210210_2281725.html", credit: "北京市规划和自然资源委员会", status: "已下载，来源已定位" },
    { caption: "劲松西街南端入口大门改造前后对比", type: "更新前后对比", imageUrl: "/case-media/C14-2.jpg", sourceUrl: "https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/zxzt/wsghs/2021dyj/d4j/202102/t20210210_2281725.html", credit: "北京市规划和自然资源委员会", status: "已下载，来源已定位" },
    { caption: "劲松北社区爬楼机助行服务", type: "适老化服务实景", imageUrl: "/case-media/C14-3.jpg", sourceUrl: "https://3g.163.com/dy/article/FSALPATD0530STFO.html", credit: "BRTV第一房产（网易号）", status: "已下载，来源已定位" },
    { caption: "美好会客厅内的社区活动（手机班/兴趣班）", type: "社区服务实景", imageUrl: "/case-media/C14-4.jpg", sourceUrl: "https://m.thepaper.cn/baijiahao_10162326", credit: "澎湃新闻·澎湃号·政务（北京朝阳）", status: "已下载，来源已定位" }
  ],
  C15: [
    { caption: "春江小区住宅外观", type: "项目实景", imageUrl: "/case-media/C15-1.jpg", sourceUrl: "https://www.toutiao.com/article/6927843817118761485/", credit: "上海黄浦 / 五里桥街道（今日头条转载）", status: "已下载，来源已定位；转载副本" },
    { caption: "春江小巷改造后", type: "更新后实景", imageUrl: "/case-media/C15-2.jpg", sourceUrl: "https://www.toutiao.com/article/6927843817118761485/", credit: "上海黄浦 / 五里桥街道（今日头条转载）", status: "已下载，来源已定位；转载副本" },
    { caption: "春江小巷改造设计草图", type: "参与式设计", imageUrl: "/case-media/C15-3.jpg", sourceUrl: "https://www.toutiao.com/article/6927843817118761485/", credit: "上海黄浦 / 五里桥街道（今日头条转载）", status: "已下载，来源已定位；转载副本" },
    { caption: "春江小区居民议事会（三会征询）", type: "公众参与实景", imageUrl: "/case-media/C15-4.jpg", sourceUrl: "https://www.toutiao.com/article/6996224622689518116/", credit: "上观新闻 / 五里桥街道", status: "已下载，来源已定位；转载副本" },
    { caption: "春江小亭与居民活动", type: "更新后实景", imageUrl: "/case-media/C15-5.jpg", sourceUrl: "https://www.toutiao.com/article/7273323597988004409/", credit: "上海黄浦 / 上观新闻 / 高磊", status: "已下载，来源已定位；转载副本" },
    { caption: "春江小亭节庆装扮", type: "社区活动实景", imageUrl: "/case-media/C15-6.jpg", sourceUrl: "https://www.toutiao.com/article/7273323597988004409/", credit: "上海黄浦 / 上观新闻 / 高磊", status: "已下载，来源已定位；转载副本" },
    { caption: "智慧春江小程序界面", type: "技术应用界面", imageUrl: "/case-media/C15-7.jpg", sourceUrl: "https://www.toutiao.com/article/7281881851416150569/", credit: "上海黄浦 / 上观新闻", status: "已下载，来源已定位；转载副本" },
    { caption: "移动建筑垃圾箱", type: "社区服务设施", imageUrl: "/case-media/C15-8.jpg", sourceUrl: "https://www.toutiao.com/article/7281881851416150569/", credit: "上海黄浦 / 上观新闻", status: "已下载，来源已定位；转载副本" },
    { caption: "春江小区入口与公共空间", type: "项目实景", imageUrl: "/case-media/C15-9.jpg", sourceUrl: "https://www.toutiao.com/article/7339755653772132918/", credit: "上海黄浦 / 上观新闻 / 高磊", status: "已下载，来源已定位；转载副本" },
    { caption: "春江小巷照片墙", type: "更新后实景", imageUrl: "/case-media/C15-10.jpg", sourceUrl: "https://www.toutiao.com/article/7339755653772132918/", credit: "上海黄浦 / 上观新闻 / 高磊", status: "已下载，来源已定位；转载副本" },
    { caption: "春江数治网大屏", type: "技术应用实景", imageUrl: "/case-media/C15-11.jpg", sourceUrl: "https://www.toutiao.com/article/7339755653772132918/", credit: "上海黄浦 / 上观新闻 / 高磊", status: "已下载，来源已定位；转载副本" },
    { caption: "春江小区非机动车充电棚", type: "技术设施实景", imageUrl: "/case-media/C15-12.jpg", sourceUrl: "https://www.toutiao.com/article/7339755653772132918/", credit: "上海黄浦 / 上观新闻 / 高磊", status: "已下载，来源已定位；转载副本" }
  ],
  C16: [
    { caption: "Red Hook WiFi 首个 mesh 节点（RHI 屋顶）", type: "技术设备实景", imageUrl: "/case-media/C16-1.jpg", sourceUrl: "https://commons.wikimedia.org/wiki/File:Directional_on_roof_of_RHI_2.jpg", credit: "Alyx Baldwin / Wikimedia Commons, CC BY-SA 4.0", status: "已下载，来源与许可已核验" },
    { caption: "在 Coffey Park 北侧公寓屋顶铺设 PoE 网线", type: "技术安装实景", imageUrl: "/case-media/C16-2.jpg", sourceUrl: "https://commons.wikimedia.org/wiki/File:Harbortech_3.jpg", credit: "Alyx Baldwin / Wikimedia Commons, CC BY-SA 4.0", status: "已下载，来源与许可已核验" },
    { caption: "Sandy 后维修 Coffey Park 指向汽修店的节点", type: "灾后维修实景", imageUrl: "/case-media/C16-3.jpg", sourceUrl: "https://commons.wikimedia.org/wiki/File:Point_to_point_node_back_to_auto_body_shop_from_coffey_park.jpg", credit: "Alyx Baldwin / Wikimedia Commons, CC BY-SA 4.0", status: "已下载，来源与许可已核验" },
    { caption: "Red Hook WiFi 覆盖地图（2019-06）", type: "覆盖范围地图", imageUrl: "/case-media/C16-4.jpg", sourceUrl: "https://redhookwifi.org/coverage/", credit: "Red Hook Initiative", status: "已下载，来源已定位" },
    { caption: "Red Hook Digital Stewards 团队", type: "社区维护者实景", imageUrl: "/case-media/C16-5.jpg", sourceUrl: "https://redhookwifi.org/", credit: "Red Hook Initiative", status: "已下载，来源已定位；官方缩略图" }
  ],
  C17: [
    { caption: "社区居民展示制图完成的印刷地图", type: "项目实景", imageUrl: "/case-media/C17.jpg", sourceUrl: "https://documents1.worldbank.org/curated/en/200421524092301920/pdf/Ramani-Huria-Atlas-March-2016.pdf", credit: "Ramani Huria Atlas (World Bank, 2016), p.5", status: "已从项目图集提取，来源已定位" },
    { caption: "达累斯萨拉姆制图覆盖范围与无人机影像对比", type: "制图成果", imageUrl: "/case-media/C17-2.jpg", sourceUrl: "https://documents1.worldbank.org/curated/en/200421524092301920/pdf/Ramani-Huria-Atlas-March-2016.pdf", credit: "Ramani Huria Atlas (World Bank, 2016), p.18", status: "已从项目图集提取，来源已定位" },
    { caption: "安装 Trimble 设备的街景采集 bajaj", type: "技术设备实景", imageUrl: "/case-media/C17-3.jpg", sourceUrl: "https://documents1.worldbank.org/curated/en/200421524092301920/pdf/Ramani-Huria-Atlas-March-2016.pdf", credit: "Ramani Huria Atlas (World Bank, 2016), p.20", status: "已从项目图集提取，来源已定位" },
    { caption: "Ubungo ward 洪水风险地图（建筑淹没与排水）", type: "制图成果", imageUrl: "/case-media/C17-4.jpg", sourceUrl: "https://documents1.worldbank.org/curated/en/200421524092301920/pdf/Ramani-Huria-Atlas-March-2016.pdf", credit: "Ramani Huria Atlas (World Bank, 2016), p.102", status: "已从项目图集提取，来源已定位" },
    { caption: "非正规住区中被压缩和堵塞的排水沟", type: "现状问题", imageUrl: "/case-media/C17-5.jpg", sourceUrl: "https://documents1.worldbank.org/curated/en/200421524092301920/pdf/Ramani-Huria-Atlas-March-2016.pdf", credit: "Ramani Huria Atlas (World Bank, 2016), p.3", status: "已从项目图集提取，来源已定位" }
  ],
  C18: [
    { caption: "“方元问问”四层联动技术架构", type: "技术架构图", imageUrl: "/case-media/C18-1.jpg", sourceUrl: "https://www.shplanning.com.cn/archive/download/id/1467.html", credit: "张文佳等，《上海城市规划》2025年第3期，图1", status: "已从论文提取，来源已定位" },
    { caption: "地理邻近性增强的多模态RAG框架", type: "技术框架图", imageUrl: "/case-media/C18-2.jpg", sourceUrl: "https://www.shplanning.com.cn/archive/download/id/1467.html", credit: "张文佳等，《上海城市规划》2025年第3期，图2", status: "已从论文提取，来源已定位" },
    { caption: "“方元问问”APP三类社区应用场景示例", type: "APP界面及技术示意图", imageUrl: "/case-media/C18-3.jpg", sourceUrl: "https://www.shplanning.com.cn/archive/download/id/1467.html", credit: "张文佳等，《上海城市规划》2025年第3期，图3；作者自绘", status: "已从论文提取，来源已定位；非手机实拍" }
  ],
  C19: [
    { caption: "Public Open House 2.0 现场（Mickey’s Building）", type: "公众参与实景", imageUrl: "/case-media/C19-1.jpg", sourceUrl: "https://circleeastdistrict.org/wp-content/uploads/2023/12/ConnectEC_report6_120523_spread.pdf", credit: "Cuyahoga Land Bank / Connect East Cleveland 项目团队，Final Report 2023, p.54", status: "已从报告提取，来源已定位" },
    { caption: "参与者用 3D 打印社区模型标记投资位置", type: "参与工具实景", imageUrl: "/case-media/C19-2.jpg", sourceUrl: "https://circleeastdistrict.org/wp-content/uploads/2023/12/ConnectEC_report6_120523_spread.pdf", credit: "Cuyahoga Land Bank / Connect East Cleveland 项目团队，Final Report 2023, p.62", status: "已从报告提取，来源已定位" },
    { caption: "Greenway 概念渲染：Woodlawn–Penrose 线性绿道", type: "方案渲染", imageUrl: "/case-media/C19-3.jpg", sourceUrl: "https://circleeastdistrict.org/wp-content/uploads/2023/12/ConnectEC_report6_120523_spread.pdf", credit: "Seventh Hill / Connect East Cleveland，Final Report 2023, p.80", status: "已从报告提取，来源已定位；概念渲染" },
    { caption: "Pocket Park 概念渲染：草坪与路径分区", type: "方案渲染", imageUrl: "/case-media/C19-4.jpg", sourceUrl: "https://circleeastdistrict.org/wp-content/uploads/2023/12/ConnectEC_report6_120523_spread.pdf", credit: "Seventh Hill / Connect East Cleveland，Final Report 2023, p.90", status: "已从报告提取，来源已定位；概念渲染" },
    { caption: "Mickey’s Building 改造概念渲染", type: "建筑改造渲染", imageUrl: "/case-media/C19-5.jpg", sourceUrl: "https://circleeastdistrict.org/wp-content/uploads/2023/12/ConnectEC_report6_120523_spread.pdf", credit: "RDL Architects / Connect East Cleveland，Final Report 2023, p.4", status: "已从报告提取，来源已定位；概念渲染" }
  ],
  C20: [
    { caption: "普里什蒂纳儿童共创工作坊现场", type: "项目实景", imageUrl: "/case-media/C20-1.jpg", sourceUrl: "https://undpkosovo.exposure.co/embarking-on-urban-adventure", credit: "UNDP Kosovo, Embarking on Urban Adventure, 2023-09-14（封面）", status: "已下载，来源已定位" },
    { caption: "儿童与青少年在工作坊中观看展示", type: "公众参与实景", imageUrl: "/case-media/C20-2.jpg", sourceUrl: "https://undpkosovo.exposure.co/embarking-on-urban-adventure", credit: "UNDP Kosovo, Embarking on Urban Adventure, 2023-09-14", status: "已下载，来源已定位" },
    { caption: "儿童在大幅地图上标记空间位置", type: "参与工具实景", imageUrl: "/case-media/C20-3.jpg", sourceUrl: "https://undpkosovo.exposure.co/embarking-on-urban-adventure", credit: "UNDP Kosovo, Embarking on Urban Adventure, 2023-09-14", status: "已下载，来源已定位" },
    { caption: "儿童在“ART / SOCIALIZING”主题板前讨论", type: "公众参与实景", imageUrl: "/case-media/C20-4.jpg", sourceUrl: "https://undpkosovo.exposure.co/embarking-on-urban-adventure", credit: "UNDP Kosovo, Embarking on Urban Adventure, 2023-09-14", status: "已下载，来源已定位" },
    { caption: "儿童整理景观图片卡与紫色词卡", type: "参与工具实景", imageUrl: "/case-media/C20-5.jpg", sourceUrl: "https://undpkosovo.exposure.co/embarking-on-urban-adventure", credit: "UNDP Kosovo, Embarking on Urban Adventure, 2023-09-14", status: "已下载，来源已定位" },
    { caption: "Design 1 概念渲染：圆形座椅与模块化座凳", type: "方案渲染", imageUrl: "/case-media/C20-6.jpg", sourceUrl: "https://undpkosovo.exposure.co/embarking-on-urban-adventure", credit: "UNDP Kosovo, Embarking on Urban Adventure, 2023-09-14；概念渲染", status: "已下载，来源已定位；非建成实景" },
    { caption: "Design 2 概念渲染：粉色游乐结构与秋千", type: "方案渲染", imageUrl: "/case-media/C20-7.jpg", sourceUrl: "https://undpkosovo.exposure.co/embarking-on-urban-adventure", credit: "UNDP Kosovo, Embarking on Urban Adventure, 2023-09-14；概念渲染", status: "已下载，来源已定位；非建成实景" }
  ]
};

export function mediaForCase(caseId: string): CaseMedia[] {
  return CASE_MEDIA[caseId] ?? [];
}
