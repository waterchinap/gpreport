const fs = require('fs');
const path = require('path');

// 获取htmls文件夹中的所有HTML文件
const htmlFolderPath = path.join(__dirname, 'htmls');
const htmlFiles = fs.readdirSync(htmlFolderPath).filter(file => file.endsWith('.html'));

// 生成导航条的HTML代码
const navLinks = htmlFiles.map(file => {
    const fileName = file.replace('.html', '');
    return `<a href="#" data-file="htmls/${file}">${fileName}</a>`;
}).join('');

// 将生成的导航条HTML代码写入index.html
const indexHtmlPath = path.join(__dirname, 'index.html');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// 使用正则表达式匹配并替换导航条部分的内容
const navLinksRegex = /<!-- 导航链接将在这里动态生成 -->[\s\S]*<!-- 导航链接结束 -->/;
const updatedIndexHtmlContent = indexHtmlContent.replace(
    navLinksRegex,
    `<!-- 导航链接将在这里动态生成 -->\n${navLinks}\n<!-- 导航链接结束 -->`
);

fs.writeFileSync(indexHtmlPath, updatedIndexHtmlContent, 'utf8');

console.log('导航条已成功生成并写入index.html');