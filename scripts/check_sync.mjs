// 比對共用庫的技能資料夾與目錄，找出「GitHub 有、目錄沒登錄」的技能。
// 用法：node scripts/check_sync.mjs [codex-worklogs 路徑]
//   路徑預設：環境變數 CODEX_WORKLOGS，否則 ../codex-worklogs（與本 repo 同層的 clone）。
// 結束碼：0＝全部登錄；1＝有缺漏（列出資料夾名稱與路徑）。
// 只收「技能」：tools/、backups/、node_modules/ 底下的內容不算；沒有 SKILL.md 的資料夾也不算。
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL("..", import.meta.url));
const root = resolve(process.argv[2] || process.env.CODEX_WORKLOGS || join(here, "..", "codex-worklogs"));
if (!existsSync(join(root, "skills"))) {
  console.error(`找不到共用庫：${root}\n請先 clone codex-worklogs，或用參數／CODEX_WORKLOGS 指定路徑。`);
  process.exit(2);
}

const data = JSON.parse(readFileSync(join(here, "data", "skills.json"), "utf8"));
const norm = s => s.normalize("NFC").trim().toLowerCase();
const base = s => norm(s.replace(/[（(].*$/, ""));

const registered = new Set();
for (const s of data.skills) {
  registered.add(norm(s.id));
  for (const a of s.agents) registered.add(base(a.name));
}

const found = []; // { name, where }
const scan = (dir, label, isAgentVersion = false, agent = "") => {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory() && existsSync(join(p, "SKILL.md"))) found.push({ name, where: `${label}/${name}`, isAgentVersion, agent });
  }
};
scan(join(root, "skills"), "skills");
const agentsDir = join(root, "agents");
if (existsSync(agentsDir)) for (const a of readdirSync(agentsDir)) scan(join(agentsDir, a, "skills"), `agents/${a}/skills`, true, a);

// 各 agent 專用版資料夾（agents/<識別名>/skills/）的命名常和目錄不完全一致（例如舊名加後綴）。
// 規則：該 agent 在目錄已有登錄的技能，且資料夾名稱與其 id／name 的前 3 段（以 - 分隔）相同，就視為該技能的版本。
// 共用庫 skills/ 底下一律嚴格比對，不套用此規則。
const tokens = s => norm(s).split("-");
const sameHead = (a, b) => { const x = tokens(a), y = tokens(b); let n = 0; while (n < x.length && n < y.length && x[n] === y[n]) n++; return n >= 3; };
const namesOfAgent = {};
for (const s of data.skills) for (const a of s.agents) (namesOfAgent[a.agent] ??= []).push(s.id, base(a.name));
const isRegistered = f => registered.has(norm(f.name)) ||
  (f.isAgentVersion && (namesOfAgent[f.agent] || []).some(n => sameHead(f.name, n)));
const missing = found.filter(f => !isRegistered(f));
const sharedNames = new Set(found.filter(f => !f.isAgentVersion).map(f => norm(f.name)));
const orphan = [];
for (const s of data.skills) for (const a of s.agents) {
  if (a.agent === "shared" && a.status !== "已移除" && !sharedNames.has(base(a.name))) orphan.push(`${s.id}（${a.name}）`);
}

console.log(`共用庫技能資料夾 ${found.length} 個；目錄技能 ${data.skills.length} 個。`);
if (orphan.length) console.log(`提醒：目錄登錄為共用版、但共用庫找不到資料夾（可能改名或已移除，請確認）：\n- ${orphan.join("\n- ")}`);
if (missing.length) {
  console.error(`\n檢查未通過：以下技能在共用庫有、目錄沒登錄，請依 UPDATE_RULES.md 補登：\n- ${missing.map(m => m.where).join("\n- ")}`);
  process.exit(1);
}
console.log("檢查通過：共用庫的技能都已登錄在目錄。");
