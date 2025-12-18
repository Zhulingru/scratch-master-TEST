# GitHub Pages 部署指南

## 📋 從 Google AI Studio 到 GitHub Pages 的完整流程

本文檔記錄了從 Google AI Studio 下載的專案成功部署到 GitHub Pages 的關鍵步驟。

---

## 🔍 原始專案的問題

### 1. **目錄命名問題**
- **問題**：`components:` 目錄名稱帶有冒號（macOS 資源分叉）
- **影響**：Vite 無法正確解析導入路徑
- **解決**：創建正常的 `components` 目錄並複製檔案

### 2. **缺少部署配置**
- 沒有 `.gitignore` 檔案
- 沒有 GitHub Actions 工作流程
- `vite.config.ts` 沒有設定 GitHub Pages 的 base path

### 3. **HTML 檔案問題**
- 引用了不存在的 `/index.css` 檔案
- 有重複的 script 標籤
- 包含不需要的 `importmap`（React 已打包）

---

## ✅ 關鍵修復步驟

### 步驟 1：修復目錄結構

```bash
# 創建正常的 components 目錄
mkdir -p components
cp "components:/QuestionCard.tsx" components/
cp "components:/ScratchBlockVisual.tsx" components/
```

### 步驟 2：設定 Git 和 GitHub Pages

#### 2.1 創建 `.gitignore`
排除不需要上傳的檔案：
- `node_modules/`
- `dist/`
- `.env` 檔案
- 快取檔案

#### 2.2 修改 `vite.config.ts`
添加 GitHub Pages 的 base path：

```typescript
const base = process.env.GITHUB_REPOSITORY 
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/your-repo-name/';

return {
  base: base,
  // ... 其他配置
};
```

**重要**：
- 如果 repository 名稱是 `username.github.io`，base 設為 `'/'`
- 否則 base 設為 `'/repository-name/'`

#### 2.3 創建 GitHub Actions 工作流程

建立 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
      - master

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        env:
          GITHUB_REPOSITORY: ${{ github.repository }}
      - run: touch dist/.nojekyll
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
  
  deploy:
    environment:
      name: github-pages
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
```

### 步驟 3：修復 HTML 檔案

#### 3.1 移除不存在的資源引用
```html
<!-- 移除這行 -->
<link rel="stylesheet" href="/index.css">
```

#### 3.2 移除重複的 script 標籤
```html
<!-- 只保留一個 -->
<script type="module" src="./index.tsx"></script>
```

#### 3.3 移除 importmap（如果 React 已打包）
```html
<!-- 移除整個 importmap，因為 Vite 已經將 React 打包進 JS 檔案 -->
```

### 步驟 4：添加 `.nojekyll` 檔案

創建 `public/.nojekyll` 空檔案，防止 GitHub Pages 使用 Jekyll 處理，確保正確的 MIME 類型。

---

## 🚀 部署流程

### 1. 初始化 Git Repository

```bash
git init
git remote add origin https://github.com/username/repo-name.git
```

### 2. 提交並推送程式碼

```bash
git add .
git commit -m "Initial commit with GitHub Pages setup"
git branch -M main
git push -u origin main
```

### 3. 啟用 GitHub Pages

1. 前往 GitHub Repository 的 **Settings**
2. 選擇左側的 **Pages**
3. 在 **Source** 選擇 **GitHub Actions**
4. 儲存設定

### 4. 自動部署

- 推送程式碼到 `main` 分支會自動觸發部署
- 或前往 **Actions** 標籤手動觸發

### 5. 查看網站

部署完成後，網站會出現在：
```
https://username.github.io/repo-name/
```

---

## 📝 關鍵配置檔案清單

### 必須的檔案

1. **`.gitignore`** - 排除不需要的檔案
2. **`.github/workflows/deploy.yml`** - 自動部署工作流程
3. **`vite.config.ts`** - 設定 base path
4. **`public/.nojekyll`** - 防止 Jekyll 處理

### 修復的檔案

1. **`index.html`** - 移除不存在的資源和 importmap
2. **`components/`** - 修復目錄結構

---

## ⚠️ 常見問題與解決方案

### 問題 1：建置失敗
- **原因**：HTML 檔案引用了不存在的資源
- **解決**：檢查並移除所有不存在的資源引用

### 問題 2：頁面空白，Console 顯示 MIME 類型錯誤
- **原因**：缺少 `.nojekyll` 檔案或仍有 importmap
- **解決**：
  1. 添加 `public/.nojekyll` 檔案
  2. 移除 `index.html` 中的 importmap
  3. 確保 Vite 正確打包 React

### 問題 3：資源路徑錯誤（404）
- **原因**：base path 設定不正確
- **解決**：檢查 `vite.config.ts` 中的 base 設定是否與 repository 名稱匹配

### 問題 4：macOS 目錄名稱問題
- **原因**：macOS 可能創建帶冒號的目錄（資源分叉）
- **解決**：創建正常的目錄並複製檔案

---

## 🎯 總結

從 Google AI Studio 下載的專案要成功部署到 GitHub Pages，需要：

1. ✅ **修復目錄結構**（特別是 components 目錄）
2. ✅ **設定 Git 和 GitHub Pages 配置**
3. ✅ **修改 vite.config.ts 添加 base path**
4. ✅ **創建 GitHub Actions 工作流程**
5. ✅ **修復 HTML 檔案**（移除不存在的資源和 importmap）
6. ✅ **添加 .nojekyll 檔案**

完成這些步驟後，每次推送程式碼到 GitHub 都會自動部署到 GitHub Pages！

---

## 📚 參考資源

- [GitHub Pages 文檔](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions 文檔](https://docs.github.com/en/actions)

