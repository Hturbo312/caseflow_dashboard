# C12 Eastserve 关系表（G6 冻结版 v1.1）

> 状态：研究者已于 2026-11-13 确认并冻结 73 条关系。
> 生成时间：2026-11-13
> 本版在 G5 的 61 条关系上新增 12 条、修改 11 条、删除 0 条。

共 73 条关系：implemented 50、planned 11、reported_or_opinion 11、unconfirmed 1、disputed 0。

## G6 变更

| 类型 | 编号 | 说明 |
|---|---|---|
| 新增 | R062–R065 | 任务关系：数字包容、NDC 再生、公共服务、可持续企业 |
| 新增 | R066–R067 | 网络容量、技术支持/维修能力 |
| 新增 | R068–R069 | Beacons/NDC 对 Eastserve 的资助 |
| 新增 | R070–R071 | 网络覆盖 17 所学校、8 个在线中心 |
| 新增 | R072–R073 | Cisco 供应设备、IntelCities 使用门户 |
| 修改 | R013/R015/R016 | 补充免费机顶盒、£30–100/£200 自付额限定 |
| 修改 | R025/R031/R040/R051 | 补充 20 名冠军、2,500/1,500 培训口径、15 名居民、1,500 付费用户口径 |
| 修改 | R045/R049/R050/R061 | 补充“非法律继任”“对称关系”“NDC 结束≠服务结束”“法人连续性未确认”说明 |
| 删除 | — | 无 |


## C12-P01

| 关系 ID | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 | 事实 |
|---|---|---|---|---|---|---|---|
| R001 | Eastserve 项目/伙伴关系（actor） | established_under | New East Manchester Ltd / NDC 伙伴关系（actor） | implemented | 2000; East Manchester; NDC/Beacons framework | M10-E01 | F001 |
| R002 | Eastserve 项目/伙伴关系（actor） | funded_by | DfES / Wired Up Communities（actor） | implemented | 2000-2003; DfES WUC | M10-E01 | F001 |
| R003 | New East Manchester Ltd / NDC 伙伴关系（actor） | submitted_bid_to | DfES / Wired Up Communities（actor） | implemented | 2000-11 | M03-E02 | F002 |
| R004 | Eastserve1 试点（actor） | targets | 450 pilot households（target） | planned | 2000-2001; 450 homes | M03-E02 | F003 |
| R005 | Eastserve1 试点（actor） | deploys | rooftop antenna / access point / fibre backbone（technology） | planned | 2000-2001; 10 access points | M03-E02 | F003 |
| R006 | Eastserve 项目/伙伴关系（actor） | launches | eastserve.com 门户（technology） | implemented | 2001-03-13 | M01-E01 | F004 |
| R007 | Ian McCartney（actor） | launches | eastserve.com 门户（technology） | implemented | 2001-03-13 | M01-E01 | F004 |
| R008 | ClicksandLinks Ltd（actor） | leads_private_partnership_for | Eastserve 项目/伙伴关系（actor） | implemented | 2001; ClicksandLinks Ltd | M01-E02 | — |
| R009 | eastserve.com 门户（technology） | provides | local content and services（capability） | implemented | 2001; housing/employment/environment/police | M01-E04 | F005 |

## C12-P02

| 关系 ID | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 | 事实 |
|---|---|---|---|---|---|---|---|
| R010 | EastServe2 / WuC 项目（actor） | targets | 4,500 target households（target） | planned | 2001-2003; 4,500+ homes | M02-E01 | F008 |
| R011 | EastServe2 / WuC 项目（actor） | plans | new PC（technology） | planned | 2001-2003; 2,500 PCs | M02-E02 | F009 |
| R012 | EastServe2 / WuC 项目（actor） | provides | ICT training（capability） | planned | 2001-2003; 4,500 trained | M02-E02 | F009 |
| R013 | EastServe2 / WuC 项目（actor） | offers | set-top box（technology） | planned | 2001-2003; free set-top box option | M02-E03 | F010 |
| R014 | EastServe2 / WuC 项目（actor） | offers | network computer（technology） | planned | 2001-2003; network computer option | M02-E03 | F010 |
| R015 | EastServe2 / WuC 项目（actor） | offers | recycled PC（technology） | planned | 2001-2003; recycled PC option; GBP 30-100 contribution | M02-E03 | F010 |
| R016 | EastServe2 / WuC 项目（actor） | offers | new PC（technology） | planned | 2001-2003; new PC option; GBP 200 contribution | M02-E03 | F010 |
| R017 | EastServe2 / WuC 项目（actor） | establishes | UK Online / online centres（actor） | planned | 2001; 4 learning centres | M02-E04 | F011 |
| R018 | Manchester City Council（actor） | accountable_for | EastServe2 / WuC 项目（actor） | implemented | 2001; via NDC partnership | M02-E06 | F013 |
| R019 | EastServe2 / WuC 项目（actor） | distributes | new PC（technology） | implemented | 2001-2002; new PCs | M03-E08, M03-E09 | F015, F017 |
| R020 | EastServe2 / WuC 项目（actor） | distributes | recycled PC（technology） | implemented | 2001-2002; recycled PCs | M03-E08 | F015 |
| R021 | Local credit union（actor） | provides_loans_for | device subsidy / loan（capability） | implemented | 2001-2002; low-cost loans | M03-E08, M14-E03 | F010 |
| R022 | EastServe2 / WuC 项目（actor） | contracts_with | BT（actor） | implemented | 2002; ISP replacement | M03-E09 | F016 |
| R023 | EastServe2 / WuC 项目（actor） | installs | 无线宽带网络（Wi-Fi）（technology） | implemented | 2002 summer | M03-E10 | F018 |
| R024 | EastServe2 / WuC 项目（actor） | provides | ICT training（capability） | implemented | 2001-2003; 3-hour course | M02-E05, M03-E12 | F012, F021 |
| R025 | MANCAT（actor） | trains | Community champions（actor） | implemented | 2002-2003; 20 champions trained (expected 40) | M03-E12 | F021 |

## C12-P03

| 关系 ID | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 | 事实 |
|---|---|---|---|---|---|---|---|
| R026 | 无线宽带网络（Wi-Fi）（technology） | provides | home internet access（capability） | implemented | 2002-2003; home broadband access | M03-E11 | F019, F020 |
| R027 | 无线宽带网络（Wi-Fi）（technology） | provides | wireless coverage（capability） | implemented | 2002-2006; wireless coverage | M03-E10, M09-E01 | F018, F027 |
| R028 | EastServe2 / WuC 项目（actor） | prices | 无线宽带网络（Wi-Fi）（technology） | implemented | 2002-2003; GBP 15/16/6 per month | M03-E11 | F019 |
| R029 | EastServe2 / WuC 项目（actor） | records | ~500 broadband Sept 2002（outcome） | implemented | 2002-09; ~500 residents | M03-E11 | F020 |
| R030 | eastserve.com 门户（technology） | provides | online fault reporting system（technology） | implemented | 2002-02; housing and street lighting reporting | M03-E13 | F022 |
| R031 | EastServe2 / WuC 项目（actor） | trains | residents' digital skills（target） | implemented | 2002-2003; ~2,500 attendees (body) / >1,500 (summary) | M03-E12 | F021 |
| R032 | DfES / Wired Up Communities（actor） | ends_funding_for | EastServe2 / WuC 项目（actor） | implemented | 2003-03; WUC programme end | M06-E01 | F024 |

## C12-P04

| 关系 ID | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 | 事实 |
|---|---|---|---|---|---|---|---|
| R033 | Eastserve 项目/伙伴关系（actor） | covers | Beswick / Clayton / Openshaw（target） | reported_or_opinion | 2005; 9,000 households | M09-E01 | F027 |
| R034 | Eastserve 项目/伙伴关系（actor） | distributes | new PC（technology） | reported_or_opinion | 2006; 3,500 PCs | M10-E04 | F028 |
| R035 | Eastserve 项目/伙伴关系（actor） | provides | home internet access（capability） | reported_or_opinion | 2006; 1,500 broadband households | M10-E04 | F028 |
| R036 | Eastserve 项目/伙伴关系（actor） | establishes | UK Online / online centres（actor） | implemented | 2004-2006; 9 learning centres | M14-E03 | F030 |
| R037 | Eastserve 项目/伙伴关系（actor） | records | 3,500 trained (2006)（outcome） | reported_or_opinion | 2006; 3,500+ attendees | M18-E05 | F031 |
| R038 | eastserve.com 门户（technology） | records | 650 crime reports in 9 months（outcome） | reported_or_opinion | 2006; 650+ reports in 9 months | M18-E07 | F032 |
| R039 | ITEM（actor） | employs | East Manchester residents（actor） | implemented | 2002-2006; local residents in installation work | M10-E07 | — |
| R040 | Residents' Panel（actor） | advises | Eastserve 项目/伙伴关系（actor） | implemented | 2001-2006; 15 residents; content recommendations | M03-E07, M10-E07 | — |
| R041 | Community champions（actor） | supports | East Manchester residents（actor） | implemented | 2002-2006; first-line ICT support | M03-E07, M03-E12 | F021 |
| R042 | Eastserve 项目/伙伴关系（actor） | states_reason | commercial broadband competition（context） | reported_or_opinion | 2006; 'technology has caught up with us' | M18-E06 | F033 |
| R043 | NWDA（actor） | funds | Eastserve 项目/伙伴关系（actor） | implemented | 2006; third phase | M10-E08 | F034 |

## C12-P05

| 关系 ID | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 | 事实 |
|---|---|---|---|---|---|---|---|
| R044 | MCIN（actor） | manages | eastserve.com 门户（technology） | implemented | 2008-10; website management | M17-E01 | F035 |
| R045 | Symera Eastserve Ltd（actor） | operates | Eastserve 项目/伙伴关系（actor） | implemented | 2009; Symera partnership | M11-E01 | F036 |
| R046 | Symera Eastserve Ltd（actor） | targets | Beswick / Clayton / Openshaw（target） | implemented | 2009; East Manchester | M11-E01, M11-E02 | F036, F037 |
| R047 | Symera Eastserve Ltd（actor） | provides | PAYG hotspot system（technology） | implemented | 2010-07; selected hotspots in operation; full coverage planned by end-2010 | M13-E01 | F038 |
| R048 | Symera Eastserve Ltd（actor） | enters_liquidation | Symera / CityServe liquidation（outcome） | implemented | 2010-11-19; creditors voluntary liquidation | M19-E01 | F040 |
| R049 | CityServe (999) Ltd（actor） | shares_insolvency_practitioner_with | Symera Eastserve Ltd（actor） | implemented | 2010-2013; Ian Michael Rose | M19-E01, M23-E01 | F040, F041 |
| R050 | New East Manchester Ltd / NDC 伙伴关系（actor） | concludes | NDC / SRB funding（context） | implemented | 2010-03; NDC programme | M16-E01 | F039 |
| R051 | Symera Eastserve Ltd（actor） | records | 1,500 paying users (c.2009)（outcome） | reported_or_opinion | c.2009; 1,500 paying users; not comparable to 2006 regular users | M11-E02 | F037 |

## C12-P06

| 关系 ID | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 | 事实 |
|---|---|---|---|---|---|---|---|
| R052 | CityServe (999) Ltd（actor） | enters_liquidation | Symera / CityServe liquidation（outcome） | implemented | 2011-07-28 | M23-E01 | F041 |
| R053 | CityServe (999) Ltd（actor） | dissolves | Symera / CityServe liquidation（outcome） | implemented | 2013-08-30 | M22-E01, M23-E01 | F041 |
| R054 | ITS Technology Group（actor） | acquires | CityServe 业务（2014）（actor） | implemented | 2014-07; 70%+ shareholding | M21-E01 | F042 |
| R055 | ITS Technology Group（actor） | upgrades | 36Mbps fixed wireless（technology） | implemented | 2014-08; 36Mbps | M20-E01 | F043 |
| R056 | 36Mbps fixed wireless（technology） | provides | 36Mbps speed（capability） | implemented | 2014-08; 36Mbps | M20-E01 | F043 |
| R057 | 36Mbps fixed wireless（technology） | covers | 48,000 network households（target） | implemented | 2014-08; 25km2/48,000 homes/3,000 postcodes | M20-E01 | F043 |

## C12-P07

| 关系 ID | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 | 事实 |
|---|---|---|---|---|---|---|---|
| R058 | CityServe 业务（2014）（actor） | operates | eastserve.com 门户（technology） | implemented | 2016-04; eastserve.com under Cityserve brand | M15-E01 | F044 |
| R059 | CityServe 业务（2014）（actor） | provides | PAYG hotspot system（technology） | implemented | 2016-04; hotspot tariffs | M15-E02 | F044 |
| R060 | Symera Eastserve Ltd（actor） | dissolves | Symera / CityServe liquidation（outcome） | implemented | 2017-02-28 | M12-E01 | F045 |

## C12-P06

| 关系 ID | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 | 事实 |
|---|---|---|---|---|---|---|---|
| R061 | CityServe (999) Ltd（actor） | legal_continuity_with | CityServe 业务（2014）（actor） | unconfirmed | 2010-2014; same CityServe name and East Manchester area; 2014 source gives no company number | M22-E01, M21-E01 | F041, F042 |

## C12-P01

| 关系 ID | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 | 事实 |
|---|---|---|---|---|---|---|---|
| R062 | Eastserve 项目/伙伴关系（actor） | addresses_task | digital inclusion / bridge digital divide（task） | implemented | 2000-2010; digital inclusion | M10-E01, M18-E01 | F001, F033 |
| R063 | Eastserve 项目/伙伴关系（actor） | addresses_task | support NDC regeneration（task） | implemented | 2000-2010; NDC regeneration | M03-E02, M16-E01 | F002, F039 |
| R064 | Eastserve 项目/伙伴关系（actor） | addresses_task | improve public service delivery / e-government（task） | implemented | 2001-2006; public service/e-government | M01-E04, M03-E13 | F005, F022 |

## C12-P05

| 关系 ID | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 | 事实 |
|---|---|---|---|---|---|---|---|
| R065 | Eastserve 项目/伙伴关系（actor） | addresses_task | build sustainable enterprise（task） | planned | 2006-2007; sustainable enterprise | M10-E08 | F034 |

## C12-P03

| 关系 ID | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 | 事实 |
|---|---|---|---|---|---|---|---|
| R066 | 无线宽带网络（Wi-Fi）（technology） | has_capability | network capacity（capability） | reported_or_opinion | 2003; ~10,000 users capacity | M03-E16 | — |

## C12-P02

| 关系 ID | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 | 事实 |
|---|---|---|---|---|---|---|---|
| R067 | Eastserve 项目/伙伴关系（actor） | provides | technical support / repair（capability） | implemented | 2001-2006; helpline, installation, repair | M02-E05, M14-E03 | — |

## C12-P01

| 关系 ID | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 | 事实 |
|---|---|---|---|---|---|---|---|
| R068 | Beacons for a Brighter Future（actor） | funds | Eastserve 项目/伙伴关系（actor） | implemented | 2000-2003; Beacons/NDC-SRB | M10-E01 | F001 |
| R069 | New East Manchester Ltd / NDC 伙伴关系（actor） | funds | Eastserve 项目/伙伴关系（actor） | implemented | 2000-2010; NDC/SRB | M10-E01 | F001 |

## C12-P04

| 关系 ID | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 | 事实 |
|---|---|---|---|---|---|---|---|
| R070 | 无线宽带网络（Wi-Fi）（technology） | covers | 17 schools（actor） | reported_or_opinion | 2004-2005; 17 schools | M07-E01, M09-E01 | F025, F027 |
| R071 | 无线宽带网络（Wi-Fi）（technology） | covers | UK Online / online centres（actor） | reported_or_opinion | 2004; 8 online centres | M07-E01 | F025 |
| R072 | Cisco Systems（actor） | supplies | rooftop antenna / access point / fibre backbone（technology） | reported_or_opinion | 2005; Cisco radio equipment | M08-E02 | — |
| R073 | IntelCities（actor） | uses | eastserve.com 门户（technology） | implemented | 2005; public engagement/technology testing | M09-E02 | — |

## 谓词清单

`accountable_for`、`acquires`、`addresses_task`、`advises`、`concludes`、`contracts_with`、`covers`、`deploys`、`dissolves`、`distributes`、`employs`、`ends_funding_for`、`enters_liquidation`、`established_under`、`establishes`、`funded_by`、`funds`、`has_capability`、`installs`、`launches`、`leads_private_partnership_for`、`legal_continuity_with`、`manages`、`offers`、`operates`、`plans`、`prices`、`provides`、`provides_loans_for`、`records`、`shares_insolvency_practitioner_with`、`states_reason`、`submitted_bid_to`、`supplies`、`supports`、`targets`、`trains`、`upgrades`、`uses`

## G6 审校保留的近似重复

- R006/R007：保留，理由见 `review/G6-audit.md`。
- R017/R036：保留，理由见 `review/G6-audit.md`。
- R024/R031：保留，理由见 `review/G6-audit.md`。
- R033/R057：保留，理由见 `review/G6-audit.md`。
- R035/R051：保留，理由见 `review/G6-audit.md`。
- R045/R058：保留，理由见 `review/G6-audit.md`。
- R049/R061：保留，理由见 `review/G6-audit.md`。