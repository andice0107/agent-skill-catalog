# Agent 技能總覽目錄：給所有 agent 的說明

> 給 Claude（雲端／桌面／本機）、Codex、OpenCode、Gemini 等所有 agent 讀。
> 使用者有一個「Agent 技能總覽目錄」網站，記錄他所有 agent 可用的技能。需要找技能、確認技能現況或更新目錄時，先讀本說明。

## 一、這是什麼

- 網站：https://andice0107.github.io/agent-skill-catalog/
- 原始碼：https://github.com/andice0107/agent-skill-catalog（公開）
- 目前收錄約 50 個技能，每個技能有中英文名稱、分類、功能、使用情境、用途、使用時機、產出、對象、觸發詞，以及各 agent 的版本與狀態（啟用／暫停／已移除／待確認）。
- 網頁可搜尋，也能依分類、功能、情境、對象、agent、狀態篩選；另有「我想要…」快速查找、Agent 對照表、中英名稱對照、更新紀錄。

## 二、agent 怎麼讀（不必開網頁）

直接讀資料檔（純 JSON）：

| 想知道 | 讀這個 |
|---|---|
| 有哪些技能、各自用途與使用時機、哪個 agent 有 | https://raw.githubusercontent.com/andice0107/agent-skill-catalog/main/data/skills.json |
| 最近誰改了什麼 | https://raw.githubusercontent.com/andice0107/agent-skill-catalog/main/data/changelog.json |
| 使用者自己改過的版本 | `data/my-version.json`（同一個 repo；**只讀，不要改**） |
| 完整技能內容（各技能的 SKILL.md 全文） | `data/skills-full.md`（raw 連結：`https://raw.githubusercontent.com/andice0107/agent-skill-catalog/main/data/skills-full.md`） |
| 更新規則 | `UPDATE_RULES.md`（同一個 repo） |

`skills.json` 結構：最上方 `agents`（各 agent 代號與位置）、`categories`（分類清單）、`skills`（技能陣列）。技能欄位：`id`、`zh`、`en`、`category`、`functions`、`scenarios`、`purpose`、`when`、`effect`、`audience`、`triggers`、`agents`、`related`、`status`、`updated`。

agent 代號：`shared`（共用庫 Codex／OpenCode）、`opencode`、`claude-cloud`、`claude-local`、`gemini`、`codex-local`。

使用方式：使用者提到某類需求（例如「出期中考卷」「成語漫畫」）時，先到目錄用 `purpose`、`when`、`triggers` 找最合適的技能，再確認自己的 agent 是否在該技能的 `agents` 裡、狀態是否「啟用」，然後用該技能原本的位置去啟動它。目錄只是索引，技能本體（SKILL.md、腳本）不在這個 repo；唯一例外是 `data/skills-full.md`（只放 SKILL.md 全文文字、不含腳本，給無法登入私有庫的 AI 讀）。

## 三、什麼時候要更新目錄

新建、修改、暫停、恢復、移除技能，或替既有技能建立自己的版本時，要在同一輪工作內更新目錄。詳細步驟與欄位規定一律看 `UPDATE_RULES.md`，重點如下：

1. **先啟動共用技能 `skill-catalog-update`**（共用庫 `skills/skill-catalog-update/SKILL.md`），未啟動不可編輯目錄；與規則衝突時以技能為準。
2. 先讀最新的 `data/my-version.json`，保護使用者自己改過的內容；非改不可要先說明並取得使用者確認。
3. 只改 `data/skills.json` 與 `data/changelog.json` 中要變動的條目，不動別的 agent 的版本列；不刪除條目，移除用狀態「已移除」。
4. 執行 `node scripts/validate.mjs` 必須通過。
5. 開分支 `update/<agent識別名>/<YYYYMMDD>-<簡述>`、開 PR，向使用者回報並請使用者合併；使用者在對話中同意後才可代為合併。
6. 修改 `index.html`、`scripts/`、`.github/` 或規則本身，要先跟使用者討論。
7. 沒有 GitHub 寫入權限的 agent（例如 Gemini）：把變動寫進 Google Drive「Agent技能總覽目錄」資料夾的 `待更新清單.md`，並告訴使用者。

## 四、注意事項

- 這是**公開網站**：不寫學生姓名、家人姓名、學校名稱、帳密、Token、Google Drive 連結或檔案 ID、私人照片位置。
- 使用者的 GitHub 金鑰只存在他自己的瀏覽器，agent 不需要也不要索取。
- 不確定技能現況時，標「待確認」並在 `notes` 寫原因，不要猜。
