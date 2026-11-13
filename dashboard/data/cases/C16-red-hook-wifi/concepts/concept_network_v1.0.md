# C16 Red Hook WiFi 概念网络增量（L2-G3 确认版 v1.0）

> 状态：研究者已于 2026-11-13 确认 18 节点 / 18 边增量网络；保留 C16 原生概念，不覆盖既有节点。
> 生成时间：2026-11-13

## 1. 汇总

| 节点类型 | 数量 |
|---|---|
| 案例 | 1 |
| 原生概念 | 9 |
| 既有共享概念 | 4 |
| 新候选概念 | 4 |
| 边 | 18 |

## 2. 节点

| ID | 类型 | 名称 | 状态 |
|---|---|---|---|
| C16 | case | Red Hook WiFi | frozen_case_pack |
| NC-C16-01 | native_concept | 社区组织锚点 | confirmed_native |
| NC-C16-02 | native_concept | 本地数字管家 | confirmed_native |
| NC-C16-03 | native_concept | 断网本地通信 | confirmed_native |
| NC-C16-04 | native_concept | 社区 mesh 网络 | confirmed_native |
| NC-C16-05 | native_concept | 灾时通信据点 | confirmed_native |
| NC-C16-06 | native_concept | 商户宿主网络 | confirmed_native |
| NC-C16-07 | native_concept | 一次性资助后的维护断层 | confirmed_native |
| NC-C16-08 | native_concept | 户外覆盖替代室内接入 | confirmed_native |
| NC-C16-09 | native_concept | 环境传感复用 | confirmed_native |
| SC-C01-114 | shared_concept | 地方组织与运营主体 | existing_candidate |
| SC-C01-134 | shared_concept | 通信与公共数字基础设施 | existing_candidate |
| SC-C01-142 | shared_concept | 数据监测与环境诊断能力 | existing_candidate |
| SC-C01-175 | shared_concept | 实施风险与负面结果 | existing_candidate |
| SC-C16-201 | candidate_concept | 本地数字维护者 | candidate_single_case |
| SC-C16-202 | candidate_concept | 断网本地通信 | candidate_single_case |
| SC-C16-203 | candidate_concept | 灾时通信据点 | candidate_single_case |
| SC-C16-204 | candidate_concept | 商户宿主网络 | candidate_single_case |

## 3. 边

| 源 | 关系 | 目标 | 映射类型 |
|---|---|---|---|
| C16 | contains_native_concept | NC-C16-01 | — |
| C16 | contains_native_concept | NC-C16-02 | — |
| C16 | contains_native_concept | NC-C16-03 | — |
| C16 | contains_native_concept | NC-C16-04 | — |
| C16 | contains_native_concept | NC-C16-05 | — |
| C16 | contains_native_concept | NC-C16-06 | — |
| C16 | contains_native_concept | NC-C16-07 | — |
| C16 | contains_native_concept | NC-C16-08 | — |
| C16 | contains_native_concept | NC-C16-09 | — |
| NC-C16-01 | maps_to_shared | SC-C01-114 | native_hyponym |
| NC-C16-02 | supports_candidate | SC-C16-201 | no_map |
| NC-C16-03 | supports_candidate | SC-C16-202 | no_map |
| NC-C16-04 | maps_to_shared | SC-C01-134 | native_hyponym |
| NC-C16-05 | supports_candidate | SC-C16-203 | no_map |
| NC-C16-06 | supports_candidate | SC-C16-204 | no_map |
| NC-C16-07 | maps_to_shared | SC-C01-175 | native_hyponym |
| NC-C16-08 | maps_to_shared | SC-C01-175 | partial_or_approximate |
| NC-C16-09 | maps_to_shared | SC-C01-142 | partial_or_approximate |

## 4. 说明

- 所有 `maps_to_shared` 边只承载已确认的映射类型，不把共享概念的全部属性继承给原生概念。
- `supports_candidate` 边对应的候选均为单案例，未确认正式共享概念。
- 既有共享概念节点保留原状态；本增量不修改 C01–C12 的任何节点或映射。
