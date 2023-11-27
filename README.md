# TM_SubstTable_Editor

**Intro:**

To automatically create a match table from the Twinmotion material csv file exported from User Library,

provides basic edit function like insert, delete items and export edited match data to Excel file, 

as well as to compare data between the newly export material library and the previously edited match table.


可依據 Twinmotion 位於 User Library 中的材料資源庫所導出的 CSV 創建材料匹配清單,

除了可做基本的編輯和導出匹配Excel外, 可以再對新導出的資源庫和匹配清單重新進行資料匹配。

--

**Link:**

Web App Version:

https://zefreestijl.github.io/TM_SubstTable_Editor/

.

Desktop App Version (by Electron):

https://github.com/zefreestijl/TM_SubstTable_Editor/releases/tag/app

--

**0. UI Outlook:**



..

**1. Loading Material Library CSV File from Twinmotion:**



..

**2. Loading Previously Exported Match Table Excel File:**



..

**3. Data Comparison Note:**

"1. New Added" - no matched material found in match table → will create new item automatically.

"2. ID Replaced" - current material ID has been changed → will update to new ID automatically.

"3. Has Deleted" - material has been removed from library → new match table will ignore the item.




--

**0. 基本操作介面說明:**


.

**1. 載入 Twinmotion User Library 材料清單步驟說明:**


.

**2. 自動生成的匹配表單基本功能說明:**


.

**3. 資料匹配狀況說明:**

"1. 新添加的材料" - 現有的匹配表單中未找到Twinmotion中的該項材料 → 將自動新建該材料匹配欄位

"2. ID更新的材料" - 當前Twinmotion的材料ID已被替換過 → 將自動更新材料匹配清單的材料ID

"3. 已刪除的材料" - Twinmotion中的該項材料已被刪除 → 導出新的材料匹配清單時將會忽略該項材料
