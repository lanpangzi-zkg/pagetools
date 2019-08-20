const path = require('path');
const fs = require('fs-extra');
const ejs = require('ejs');
const beautify = require('./beautifyCode');
const getImportString = require('./getImportString');
const renderModel = require('../template/render/renderModel');
const renderEnter = require('../template/render/renderEnter');
const renderService = require('../template/render/renderService');

const getEjsFile = (fileType) => {
    let ejsFile = '';
    switch (fileType) {
        case 'modal':
            ejsFile = '../../template/basicModal.ejs';
            break;
        case 'model':
            ejsFile = '../../template/basicModel.ejs';
            break;
        case 'service':
            ejsFile = '../../template/basicService.ejs';
            break;
        default:
            ejsFile = '../../template/basicPage.ejs';
            break;
    }
    return ejsFile;
};

const createFile = async (pageName, fileConfig, sourceCacheDir) => {
    const { layoutConfig, fileType = 'page', dir = ''} = fileConfig;
    const fileName = fileType === 'page' ? 'index.js' : dir ? `${dir}/${pageName}.js` : `${pageName}.js`;
    const sourceFile = path.resolve(sourceCacheDir, fileName);
    const templateFile =  path.resolve(sourceCacheDir, getEjsFile(fileType));
    fs.ensureFileSync(sourceFile);
    const initImports = fileType === 'modal' ? ['Modal'] : [];
    const importString = getImportString(layoutConfig, initImports);
    return await new Promise((resolve, reject) => {
        ejs.renderFile(templateFile, {
                pageName,
                fileConfig,
                importString,
                hasForm: importString.indexOf('Form') >= 0,
                renderModel,
                renderEnter,
                renderService,
            }, (err, data) => {
                if(err) {
                    const msgObj = {
                        code: '-1',
                        info: '页面生成失败:' + JSON.stringify(err),
                    };
                    resolve(msgObj);
                    console.log('createFile', err);
                } else {
                    fs.writeFileSync(sourceFile, data);
                    beautify(sourceCacheDir, fileName).then((result) => {
                        resolve(result);
                    }).catch((e) => {
                        console.log('beautify exception:', e);
                        reject(e);
                    });
                }
            }
        );
    });
};

module.exports = createFile;