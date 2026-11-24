# Agent 技能總覽目錄

我所有 agent（共用庫 Codex／OpenCode、Claude 雲端與本機、Gemini、Codex 本機）可以使用的技能總覽。

- 網站：https://andice0107.github.io/agent-skill-catalog/
- 可以搜尋，也能依分類、功能、使用情境、對象、agent、狀態篩選；另有「我想要…」快速查找、Agent 對照表、中英名稱對照與更新紀錄。
- **自己編輯**：技能可改名稱、分類、功能、情境與敘述，也能新增、刪除；「管理分類」可改名、排序、增刪分類並設定關鍵字；「一鍵自動分類」依技能屬性比對關鍵字重新歸類（先預覽、可取消勾選）；「我的存檔」可存多份、匯出入檔案、還原官方版。修改預設只存在你的瀏覽器；在「我的存檔」設定 GitHub 金鑰（Fine-grained token，只給本 repo 的 Contents 讀寫）後，會自動同步到 `data/my-version.json`，各台電腦看到同一份。不會動到官方的 `skills.json`。
- 點技能可看用途、使用時機、產出、對象、觸發詞和各 agent 的版本，並可複製連結分享。

## 檔案

| 檔案 | 內容 |
|---|---|
| `data/skills.json` | 技能資料（網站內容都從這裡來） |
| `data/changelog.json` | 更新紀錄 |
| `data/skills-full.md` | 各技能 `SKILL.md` 全文合併（供無法登入私有庫的 AI 讀取；個人信箱與帳號路徑已遮蔽） |
| `index.html` | 網站本體 |
| `scripts/validate.mjs` | 格式檢查：`node scripts/validate.mjs` |
| `scripts/check_sync.mjs` | 漏登檢查：比對共用庫（codex-worklogs）的技能資料夾與本目錄，有缺就報錯：`node scripts/check_sync.mjs [共用庫路徑]` |
| `UPDATE_RULES.md` | **所有 agent 更新本目錄的原則** |
| `AGENT_GUIDE.md` | 給所有 agent 的說明：目錄是什麼、怎麼讀資料、何時更新 |

## 本機預覽

網站用 `fetch` 讀取資料，直接雙擊 `index.html` 會讀不到。請在 repo 資料夾執行：

```bash
python -m http.server 8000
```

然後開 http://localhost:8000 。
