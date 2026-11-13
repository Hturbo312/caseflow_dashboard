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
  C11: [{ caption: "Coronación建筑节能改造项目前外立面", type: "更新前实景", imageUrl: "https://www.premiosdearquitectura.es/es/media/obras/images/big/7028-smartencity-20200228110445.png", sourceUrl: "https://www.premiosdearquitectura.es/es/premios/40-premios-avs-2020/obras-presentadas/979-smartencity", credit: "AVS 建筑奖参评项目资料", status: "直接对应" }]
};

export function mediaForCase(caseId: string): CaseMedia[] {
  return CASE_MEDIA[caseId] ?? [];
}
