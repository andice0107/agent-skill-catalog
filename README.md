# Agent 技能總覽目錄

我所有 agent（共用庫 Codex／OpenCode、Claude 雲端與本機、Gemini、Codex 本機）可以使用的技能總覽。

- 網站：https://andice0107.github.io/agent-skill-catalog/
- 可以搜尋，也能依分類、功能、使用情境、對象、agent、狀態篩選；另有「我想要…」快速查找、Agent 對照表、中英名稱對照與更新紀錄。
- 點技能可看用途、使用時機、產出、對象、觸發詞和各 agent 的版本，並可複製連結分享。

## 檔案

| 檔案 | 內容 |
|---|---|
| `data/skills.json` | 技能資料（網站內容都從這裡來） |
| `data/changelog.json` | 更新紀錄 |
| `index.html` | 網站本體 |
| `scripts/validate.mjs` | 格式檢查：`node scripts/validate.mjs` |
| `UPDATE_RULES.md` | **所有 agent 更新本目錄的原則** |

## 本機預覽

網站用 `fetch` 讀取資料，直接雙擊 `index.html` 會讀不到。請在 repo 資料夾執行：

```bash
python -m http.server 8000
```

然後開 http://localhost:8000 。
