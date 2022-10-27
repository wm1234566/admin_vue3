vue3+pinia+elementPlus 实现的后台管理系统（非 TS 版本）

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

```
mksz542
├─ .cz-config.js
├─ .eslintignore
├─ .eslintrc.cjs
├─ .husky
│  ├─ commit-msg
│  ├─ pre-commit
│  └─ _
│     ├─ .gitignore
│     └─ husky.sh
├─ .prettierignore
├─ .prettierrc
├─ commitlint.config.js
├─ index.html
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ hash.js          # 计算文件哈希值
│  ├─ mobile.html
│  └─ spark-md5.min.js # 计算文件哈希值
├─ README.md
├─ server.js
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  ├─ echart.jpg
│  │  ├─ home.jpg
│  │  ├─ ljt.jpeg
│  │  ├─ logo.svg
│  │  ├─ styles
│  │  │  ├─ base.scss
│  │  │  └─ variables.module.scss
│  │  ├─ svg
│  │  └─ trash.png
│  ├─ auto-imports.d.ts
│  ├─ components
│  │  ├─ Breadcrumb
│  │  │  └─ index.vue
│  │  ├─ Com
│  │  │  ├─ calendar
│  │  │  │  ├─ index.js
│  │  │  │  └─ src
│  │  │  │     ├─ index.vue
│  │  │  │     └─ types.ts
│  │  │  ├─ chooseArea
│  │  │  │  ├─ index.js
│  │  │  │  └─ src
│  │  │  │     ├─ index.vue
│  │  │  │     └─ pcas-code.json
│  │  │  ├─ chooseicon
│  │  │  │  ├─ index.js
│  │  │  │  └─ src
│  │  │  │     └─ index.vue
│  │  │  ├─ chooseTime
│  │  │  │  ├─ index.js
│  │  │  │  └─ src
│  │  │  │     └─ index.vue
│  │  │  ├─ Clipboard
│  │  │  │  ├─ index.js
│  │  │  │  └─ src
│  │  │  │     └─ index.vue
│  │  │  ├─ huanqi
│  │  │  │  ├─ index.js
│  │  │  │  └─ src
│  │  │  │     ├─ index.vue
│  │  │  │     └─ renderDom.jsx
│  │  │  ├─ index.js
│  │  │  ├─ list
│  │  │  │  ├─ index.js
│  │  │  │  └─ src
│  │  │  │     ├─ index-my.vue
│  │  │  │     ├─ index.vue
│  │  │  │     └─ types.ts
│  │  │  ├─ menu
│  │  │  │  ├─ index.js
│  │  │  │  └─ src
│  │  │  │     ├─ index.vue
│  │  │  │     ├─ menu.jsx
│  │  │  │     ├─ styles
│  │  │  │     │  └─ index.scss
│  │  │  │     └─ types.ts
│  │  │  ├─ notificatin
│  │  │  │  ├─ index.js
│  │  │  │  └─ src
│  │  │  │     └─ index.vue
│  │  │  └─ table
│  │  │     ├─ index.js
│  │  │     ├─ README.md
│  │  │     └─ src
│  │  │        ├─ index.vue
│  │  │        └─ types.ts
│  │  ├─ Guide
│  │  │  ├─ index.vue
│  │  │  └─ steps.js
│  │  ├─ HeaderSearch
│  │  │  ├─ FuseData.js
│  │  │  └─ index.vue
│  │  ├─ LangSelect
│  │  │  └─ index.vue
│  │  ├─ ScreenFull
│  │  │  └─ index.vue
│  │  ├─ SelectColor
│  │  │  └─ index.vue
│  │  ├─ SvgIcon
│  │  │  └─ index.vue
│  │  ├─ TagsView
│  │  │  ├─ index.vue
│  │  │  └─ menus.js
│  │  ├─ ThemeSelect
│  │  │  └─ index.vue
│  │  └─ Trash
│  │     └─ index.vue
│  ├─ components.d.ts
│  ├─ directive
│  │  └─ v-permissions.js
│  ├─ entry-client.js
│  ├─ entry-server.js
│  ├─ i18n
│  │  ├─ index.js
│  │  └─ lang
│  │     ├─ en.js
│  │     └─ zh.js
│  ├─ main.js
│  ├─ stores
│  │  ├─ admin.js
│  │  ├─ cssVar.js
│  │  ├─ language.js
│  │  ├─ store.js
│  │  └─ TagsView.js
│  ├─ styles
│  │  ├─ element.scss
│  │  ├─ index.scss
│  │  ├─ mixin.scss
│  │  ├─ sidebar.scss
│  │  ├─ transition.scss
│  │  ├─ variables.module.scss
│  │  └─ variables.scss
│  ├─ utilities
│  │  ├─ Axios.js
│  │  ├─ BrowserLang.js
│  │  ├─ Constant.js
│  │  ├─ DateTransform.js
│  │  ├─ DayJs.js
│  │  ├─ Export2Excel.js
│  │  ├─ getHeaderRow.js
│  │  ├─ i18n.js
│  │  ├─ isExternal.js
│  │  ├─ NProgress.js
│  │  ├─ Permission.js   ## 登陆路由拦截
│  │  ├─ Request.js
│  │  ├─ Storage.js
│  │  └─ validate.js
│  └─ views
│     ├─ article-create
│     │  ├─ components
│     │  │  ├─ MarkDown.vue
│     │  │  └─ myEditor.vue
│     │  ├─ index.vue
│     │  └─ useIndex.js
│     ├─ article-detail
│     │  └─ index.vue
│     ├─ article-ranking
│     │  ├─ index.js
│     │  ├─ index.vue
│     │  └─ sortable.js
│     ├─ ComView
│     │  ├─ calendar
│     │  │  └─ index.vue
│     │  ├─ chooseArea.vue
│     │  ├─ ChooseiconView.vue
│     │  ├─ chooseTime
│     │  │  └─ index.vue
│     │  ├─ filesPreview
│     │  │  └─ index.vue
│     │  ├─ HomeView.vue
│     │  ├─ Notificatin.js
│     │  ├─ Notificatin.vue
│     │  ├─ qrcode
│     │  │  └─ index.vue
│     │  ├─ table
│     │  │  └─ index.vue
│     │  ├─ uploadFiles
│     │  │  ├─ app.vue
│     │  │  ├─ Simples.vue
│     │  │  └─ utils
│     │  │     ├─ hash.js
│     │  │     ├─ localstorage.js
│     │  │     ├─ sendRequest-domo.js
│     │  │     └─ spark-md5.min.js
│     │  └─ websocket
│     │     └─ index.vue
│     ├─ echarts
│     │  ├─ app.vue
│     │  ├─ china.js
│     │  ├─ geoMap.js
│     │  └─ index.vue
│     ├─ error-page
│     │  ├─ 401.vue
│     │  └─ 404.vue
│     ├─ HomeView.vue          ##首页
│     ├─ import
│     │  └─ index.vue
│     ├─ login
│     │  └─ index.vue
|     ├─ layout
│     │  └─ index.vue      ## 后台模板
│     ├─ permission-list
│     │  └─ index.vue
│     ├─ profile
│     │  ├─ components
│     │  │  ├─ Author.vue
│     │  │  ├─ Chapter.vue
│     │  │  ├─ DandV.vue
│     │  │  ├─ Feature.vue
│     │  │  ├─ Performance.vue
│     │  │  └─ ProjectCard.vue
│     │  └─ index.vue
│     ├─ role-list
│     │  ├─ components
│     │  │  └─ Permissions.vue
│     │  └─ index.vue
│     ├─ user-info
│     │  └─ index.vue
│     └─ user-manage
│        ├─ components
│        │  ├─ Export.vue
│        │  └─ Role.vue
│        └─ index.vue
└─ vite.config.js

```
