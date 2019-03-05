const path = require('path');
const fs = require('fs-extra');
const ejs = require('ejs');
const getInitialValue = require('../template/function/getInitialValue');
const renderItemComponent = require('../template/function/renderItemComponent');
const renderButton = require('../template/function/renderButton');

const sourceDir = path.resolve(__dirname, '../sourceCache');

const createPage = async ({ pageName, layoutConfig }) => {
    fs.ensureDirSync(sourceDir);
    process.chdir(sourceDir);
    const fileName = `${pageName}.js`;
    fs.ensureFileSync(fileName);
    const templateFile = path.resolve(__dirname, '../template/basicPage.ejs');
    const sourceFile = path.resolve(sourceDir, fileName);
    return await new Promise((resolve, reject) => {
        ejs.renderFile(templateFile, {
                pageName,
                layoutConfig,
                renderButton,
                getInitialValue,
                renderItemComponent,
            }, (err, data) => {
                const msgObj = {
                    code: 1,
                    info: '生成页面成功',
                };
                if(err) {
                    msgObj.code = 0;
                    msgObj.info = '页面生成失败:' + JSON.stringify(err);
                } else {
                    fs.writeFileSync(sourceFile, data);
                }
                resolve(msgObj);
            }
        );
    });
};

module.exports = createPage;