// 檢查 data/skills.json 與 data/changelog.json 的格式。更新目錄後、提交前執行：node scripts/validate.mjs
import { readFileSync } from "node:fs";

const read = p => JSON.parse(readFileSync(new URL(`../${p}`, import.meta.url), "utf8"));
const errors = [];
const STATUSES = ["啟用", "暫停", "待確認", "已移除"];
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const REQUIRED = ["id", "zh", "en", "category", "functions", "scenarios", "purpose", "when", "effect", "audience", "agents", "status", "updated"];

let data, log;
try { data = read("data/skills.json"); } catch (e) { console.error("skills.json 不是合法 JSON：" + e.message); process.exit(1); }
try { log = read("data/changelog.json"); } catch (e) { console.error("changelog.json 不是合法 JSON：" + e.message); process.exit(1); }

if (!DATE.test(data.updated || "")) errors.push("skills.json 的 updated 必須是 YYYY-MM-DD");
const agentKeys = Object.keys(data.agents || {});
const ids = new Set();

for (const s of data.skills || []) {
  const where = `技能 ${s.id || s.zh || "(無 id)"}`;
  for (const k of REQUIRED) if (s[k] === undefined || s[k] === "" ) errors.push(`${where} 缺少 ${k}`);
  if (ids.has(s.id)) errors.push(`${where} 的 id 重複`);
  ids.add(s.id);
  if (s.id && !/^[a-z0-9][a-z0-9-]*$/.test(s.id)) errors.push(`${where} 的 id 只能用小寫英數與連字號`);
  if (!data.categories.includes(s.category)) errors.push(`${where} 的分類「${s.category}」不在 categories 清單`);
  if (!STATUSES.includes(s.status)) errors.push(`${where} 的狀態「${s.status}」不合法（${STATUSES.join("、")}）`);
  if (!DATE.test(s.updated || "")) errors.push(`${where} 的 updated 必須是 YYYY-MM-DD`);
  for (const k of ["functions", "scenarios"]) if (!Array.isArray(s[k]) || !s[k].length) errors.push(`${where} 的 ${k} 至少要一項`);
  if (!Array.isArray(s.agents) || !s.agents.length) errors.push(`${where} 至少要有一個 agent 版本`);
  for (const a of s.agents || []) {
    if (!agentKeys.includes(a.agent)) errors.push(`${where} 的 agent「${a.agent}」不在 agents 清單`);
    if (!a.name) errors.push(`${where} 有 agent 版本缺少 name`);
    if (!STATUSES.includes(a.status)) errors.push(`${where} 的 ${a.agent} 版本狀態「${a.status}」不合法`);
  }
}
for (const s of data.skills || []) for (const r of s.related || []) if (!ids.has(r)) errors.push(`技能 ${s.id} 的相關技能「${r}」不存在`);
for (const e of log.entries || []) {
  if (!DATE.test(e.date || "")) errors.push(`更新紀錄日期錯誤：${JSON.stringify(e)}`);
  if (!e.agent || !e.action || !e.summary) errors.push(`更新紀錄缺少 agent／action／summary：${JSON.stringify(e)}`);
  for (const id of e.skills || []) if (!ids.has(id)) errors.push(`更新紀錄提到不存在的技能 ${id}（移除的技能請保留並標「已移除」）`);
}

if (errors.length) { console.error("檢查未通過：\n- " + errors.join("\n- ")); process.exit(1); }
console.log(`檢查通過：${ids.size} 個技能、${(log.entries || []).length} 筆更新紀錄。`);
