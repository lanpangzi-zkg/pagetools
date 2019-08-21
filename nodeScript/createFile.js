const path = require('path');
const fs = require('fs-extra');
const ejs = require('ejs');
const beautify = require('./beautifyCode');
const getImportString = require('./getImportString');
const renderColumns = require('../template/render/renderColumns');
const renderProp = require('../template/render/renderProp');
const renderExport = require('../template/render/renderExport');
const renderConstructor = require('../template/render/renderConstructor');
const renderMethod = require('../template/render/renderMethod');
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

const renderCallBack = (err, data, sourceCacheDir, fileName, resolve, reject) => {
    if(err) {
        const msgObj = {
            code: '-1',
            info: '页面生成失败:' + JSON.stringify(err),
        };
        resolve(msgObj);
        console.log('createFile', err);
    } else {
        fs.writeFileSync(path.resolve(sourceCacheDir, fileName), data);
        beautify(sourceCacheDir, fileName).then((result) => {
            resolve(result);
        }).catch((e) => {
            console.log('beautify exception:', e);
            reject(e);
        });
    }
};

const createFile = async (pageName, fileConfig, sourceCacheDir) => {
    const { layoutConfig, layerConfig, fileType = 'page', dir = ''} = fileConfig;
    const fileName = fileType === 'page' ? 'index.js' : dir ? `${dir}/${pageName}.js` : `${pageName}.js`;
    const sourceFile = path.resolve(sourceCacheDir, fileName);
    const templateFile =  path.resolve(sourceCacheDir, getEjsFile(fileType));
    fs.ensureFileSync(sourceFile);
    const initImports = fileType === 'modal' ? ['Modal'] : [];
    const [ importString, extraConfig ] = getImportString(layoutConfig, initImports);
    if (layerConfig && layerConfig.modalArr.length > 0) {
        extraConfig.modalArr = layerConfig.modalArr;
    }
    const renderPageData = {
        pageName,
        fileConfig,
        extraConfig: Object.assign({}, extraConfig, { pageName }),
        importString,
        renderProp,
        renderConstructor,
        renderMethod,
        renderModel,
        renderExport,
        renderEnter,
        renderService,
    };
    if (extraConfig.table) {
        const results = await Promise.all([new Promise((resolve, reject) => {
            ejs.renderFile(path.resolve(sourceCacheDir, '../../template/columns.ejs'), {
                extraConfig,
                renderColumns,
                }, (err, data) => {
                    renderCallBack(err, data, sourceCacheDir, 'columns.js', resolve, reject);
                }
            );
        }), new Promise((resolve, reject) => {
            const importsArr = importString.split('\n');
            importsArr.splice(1, 0, 'import columns from \'./columns\';');
            ejs.renderFile(templateFile, Object.assign({}, renderPageData, { importString: importsArr.join('\n')}), (err, data) => {
                    renderCallBack(err, data, sourceCacheDir, fileName, resolve, reject);
                }
            );
        })]);
        let responseObj = {};
        for (let r of results) {
            responseObj= r;
            if (r.code != '0') {
                break;
            }
        }
        return responseObj;
    }
    return await new Promise((resolve, reject) => {
        ejs.renderFile(templateFile, renderPageData, (err, data) => {
                renderCallBack(err, data, sourceCacheDir, fileName, resolve, reject);
            }
        );
    });
};

module.exports = createFile;