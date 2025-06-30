# Markdown-it Katex

> clone 时间 2025年6月13日

将katex插件打包为浏览器能识别的，并开启了katex库的化学公式扩展

```bash
npm install browserify -g

# ts 转 js
npm run compile 

# js 打包为浏览器能识别的js 
npm run browser 

# 这就是打包好的js
dist/browser.js
```

浏览器调用

```js
const md = window.markdownit();

md.use(window.vscodeMarkdownitKatex, {
    throwOnError: false,
    // output: 'html'
});
```

