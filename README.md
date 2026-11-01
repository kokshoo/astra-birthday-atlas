# 星序 ASTRA

線上 App：https://astra-birthday-atlas.ongkokshoo.workers.dev

GitHub：https://github.com/kokshoo/astra-birthday-atlas

繁體中文、響應式生日解讀 App。無需安裝依賴，靜態檔案位於 `dist/`。

## 執行

`node serve.cjs`，瀏覽 `http://127.0.0.1:5183`。

## 驗證

`node --test tests/core.test.cjs tests/career.test.cjs`

## 功能

- 西曆生日驗證、十二星座固定日期區間、靈數 1–9／11／22／33。
- 總覽、性格與動機、經典角色映照、七天成長練習。
- 本機收藏（最多 30 份、可刪除）、完整 Markdown 下載、列印全部報告為 PDF。
- 無後端與 API 金鑰；生日與稱呼不傳至伺服器，僅使用者點選收藏才寫入 localStorage。
- 「生涯與行為」分頁：手動輸入或讀取 `.txt` 的 4U 報告摘錄；16 題 ASTRA 自編 DISC 概念自評；生涯資料可一併收藏、完整文字下載及列印。
- 生涯檔案以 `astra-career-v1` JSON 匯出／還原，只接受生日相符的檔案。既有生日收藏保持相容。

## 4U 與 DISC 的整合範圍

4U 是特定體系，公開資料不足以重建其正式計算規則。本 App 僅呈現使用者匯入的既有報告內容，標示使用者提供且未核驗，不從生日推算 4U 分類。未宣稱與 4U 或 Everything DiSC 合作、認證或使用其官方測驗。

DISC 概念自評採 ASTRA 原創 16 題、每類 4 題，各題 1–5 分，分項為算術平均；同分保留並列，四類總分極差不超過 2 時顯示多元均衡傾向。這是透明的反思工具，未經心理計量驗證，沒有常模、診斷或精準率主張。生日不參與計分。

概念來源：[4U 官方課程介紹](https://4uinstitute.com/cht/index.php?act=class&code=content&ids=22)、[DISC 模型介紹](https://www.everythingdisc.com/what-is-disc/)。匯入的私人報告與作答不傳送伺服器，也不包含在網站部署或原始碼中。

## 內容限制

生日解讀是固定規則與編輯內容的組合，非即時 AI 生成或科學人格測評。太陽星座使用固定日期近似，交界日需出生時間、地點與星曆才能精確判定，未計算完整星盤。靈數採全部日期數字先相加、逐次相加並保留 11／22／33；其他流派可能結果不同。「命運」提供成長敘事，不預言未來。角色為象徵類比，非官方生日或星座設定。

Google Fonts 為外部字體服務，無法連線時使用系統字體。應用程式的生日計算、內容與圖像不依賴外部服務。列印 PDF 由瀏覽器列印功能提供。
