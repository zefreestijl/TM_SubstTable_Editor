# TM_SubstTable_Editor / Twinmotion 材料清單匹配編輯器

**Intro:**

To automatically create a match table from the Twinmotion material csv file exported from User Library,

provides basic edit function like insert, delete items and export edited match data to Excel file, 

as well as to compare data between the newly export material library and the previously edited match table.

..

可依據 Twinmotion 位於 User Library 中的材料資源庫所導出的 CSV 創建材料匹配清單,

除了可做基本的編輯和導出匹配Excel外, 可以再對新導出的資源庫和匹配清單重新進行資料匹配。

--

**Link:**

Web App Version:

https://zefreestijl.github.io/TM_SubstTable_Editor/

..

Desktop App Version (by Electron):

https://github.com/zefreestijl/TM_SubstTable_Editor/releases/tag/app

..

Explaination of Each Attributes in the Match Table

https://twinmotionhelp.epicgames.com/s/article/Twinmotion-2023-1-Substitution-Table-Overview?language=en_US

..

--

**0. UI Outlook:**

**0. 基本操作介面說明:**


![image](https://github.com/zefreestijl/TM_SubstTable_Editor/assets/97733793/bd582539-c9a5-47d5-bce0-78ec22c47be5)



..

**1. Loading Material Library CSV File from Twinmotion:**

**1. 載入 Twinmotion User Library 材料清單步驟說明:**

![3363e68c006bb507b33bed3828c08d6](https://github.com/zefreestijl/TM_SubstTable_Editor/assets/97733793/f60141e2-3081-4c91-99a9-bd3bd26b4486)

![918ba13b17fe66f33c8c5ff49089a39](https://github.com/zefreestijl/TM_SubstTable_Editor/assets/97733793/63330669-8465-40d7-8bd2-021980f4ae9b)




..

--

**2. Loading Previously Exported Match Table Excel File:**

**2. 自動生成的匹配表單基本功能說明:**

![image](https://github.com/zefreestijl/TM_SubstTable_Editor/assets/97733793/d5e901fb-5c23-4add-8601-b3fdd47cd1e4)

![image](https://github.com/zefreestijl/TM_SubstTable_Editor/assets/97733793/69a09190-56e6-4839-8571-de47743ccee0)




..

--

**3. Data Comparison Note:**

**3. 資料匹配狀況說明:**


"1. New Added" - no matched material found in match table → will create new item automatically.

"2. ID Replaced" - current material ID has been changed → will update to new ID automatically.

"3. Has Deleted" - material has been removed from library → new match table will ignore the item.

..

"1. 新添加的材料" - 現有的匹配表單中未找到Twinmotion中的該項材料 → 將自動新建該材料匹配欄位

"2. ID更新的材料" - 當前Twinmotion的材料ID已被替換過 → 將自動更新材料匹配清單的材料ID

"3. 已刪除的材料" - Twinmotion中的該項材料已被刪除 → 導出新的材料匹配清單時將會忽略該項材料

..

--


**4. Save the Exported Xsl File to CSV**

Before Importing datasmith model with the matched data table, we have to Convert the xsl to CSV-UTF8 first.

(Still trying to figure out how to export the csv in UTF8 enconding inside the Table Editor App..)

..

**4. 將導出的Excel檔案另存為CSV格式**

因為還在研究如何從Web App編輯器中導出UTF-8編碼的CSV檔案...

所以暫時需要依賴外部程序進行轉檔工作才能在Twinmotion中使用匹配清單..


![f9785fc650e3a07335c5fe56846d4bb](https://github.com/zefreestijl/TM_SubstTable_Editor/assets/97733793/c96cb89f-4c69-4e62-9d8a-5ee0c08fd275)

![c4ae6650bbd53400d19a75b963de122](https://github.com/zefreestijl/TM_SubstTable_Editor/assets/97733793/1f384e52-213e-41d6-aa31-0eb2a076dc9e)

..

--

**5. Result Before & After Material Matches when Importing a New Datasmith Model**

**5. 導入Datasmith模型時使用匹配清單前/後對比:**



..

--
