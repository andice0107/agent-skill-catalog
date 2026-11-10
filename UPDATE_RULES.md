# Agent 技能總覽目錄：更新原則

- 網站：https://andice0107.github.io/agent-skill-catalog/
- 原始碼：https://github.com/andice0107/agent-skill-catalog
- 2026-11-10 由使用者要求建立：使用者所有技能的變動，都要即時反映在這個目錄。
- 本檔是正式版；`codex-worklogs/principles/技能目錄更新原則.md` 與 Google Drive「Agent技能總覽目錄」資料夾裡的說明以本檔為準。

## 一、什麼時候要更新

下列任何一件事發生時，在同一輪工作內更新目錄：

| 發生的事 | 目錄要怎麼改 |
|---|---|
| 新建技能 | 新增一個技能條目 |
| 替既有技能建立自己的版本（例如 Claude 專用版） | 在該技能的 `agents` 加一列 |
| 更新技能的用途、使用時機、產出、對象、觸發詞或名稱 | 修改該條目對應欄位 |
| 暫停使用 | `status` 改成「暫停」；只暫停某個 agent 的版本時，改那一列 |
| 恢復使用 | 改回「啟用」 |
| 移除技能 | `status` 改成「已移除」，保留條目，在 `notes` 寫原因與替代技能 |
| 不確定技能現況 | 標「待確認」，在 `notes` 寫原因 |

開工時也比對一次：自己實際有的技能和目錄不同，就提出更新。

## 二、更新步驟

1. 先拉最新版（`git pull --ff-only`；本機沒有就 clone）。
2. 修改 `data/skills.json`：
   - 只改要變動的技能，其他條目與別的 agent 的版本列不動。
   - 被修改的條目更新 `updated`（YYYY-MM-DD），檔案最上方的 `updated` 也改成當天。
   - 新條目必填：`id`（小寫英數與連字號）、`zh`、`en`、`category`（要在 `categories` 清單內）、`functions`、`scenarios`、`purpose`、`when`、`effect`、`audience`、`triggers`、`agents`、`status`、`updated`。
   - 沒有中文名稱的技能補中文名稱；沒有英文名稱的補建議英文名，並加 `"enNote": "原無英文名，此為建議英文名"`。
   - `agents` 代號：`shared`（共用庫 Codex／OpenCode）、`claude-cloud`、`claude-local`、`gemini`、`codex-local`。新增 agent 或分類時，同時改最上方的 `agents` 或 `categories`。
3. 在 `data/changelog.json` 加一筆：`date`、`agent`（識別名）、`action`（新增／更新／暫停／恢復／移除／新增版本）、`skills`（技能 id）、`summary`（一句話）。
4. 執行 `node scripts/validate.mjs`，必須通過。
5. 開分支 `update/<agent識別名>/<YYYYMMDD>-<簡述>`，提交並開 PR。
6. 向使用者回報改了哪些技能與 PR 連結，請使用者合併；使用者在對話中同意後，agent 才可以代為合併。
7. 合併後 GitHub Pages 約 1～2 分鐘更新。

修改 `index.html`、`scripts/`、`.github/` 或本原則，先跟使用者討論再動手。

## 三、沒有 GitHub 寫入權限的 agent（例如 Gemini）

1. 把變動寫進 Google Drive `Agent技能總覽目錄/待更新清單.md`：日期｜agent｜動作｜技能名稱（中英）｜用途、使用時機、產出、對象｜狀態。
2. 告訴使用者已記入待更新清單。
3. 有 GitHub 權限的 agent 開工時讀這份清單，依上面步驟提出更新；完成後在該列註明「已提出更新 YYYY-MM-DD（識別名）」，不刪除該列。

## 四、注意事項

- 這是公開網站：不寫學生姓名、家人姓名、學校名稱、帳密、Token、Google Drive 連結或檔案 ID、私人照片位置。
- 不刪除條目或更新紀錄；移除技能用「已移除」狀態。
- 不改別人的版本列；共用欄位依技能實際內容修改，有衝突先問使用者。
- 技能本體（SKILL.md、腳本）不放進本 repo，仍放在原本的位置。
