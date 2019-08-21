const createFile = require('./createFile');
const path = require('path');
const fs = require('fs-extra');
const compressing = require('compressing');

const getSourceCacheDir = (pageName) => path.resolve(__dirname, '../sourceCache', `${pageName}`);

const resetCacheDir = () => { // 先清空文件夹
    if (fs.existsSync(sourceCacheDir)) {
        fs.readdirSync(sourceCacheDir).forEach((file) => {
            const curPath = sourceCacheDir + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                resetCacheDir(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

const createFilePartial = (pageName, sourceCacheDir) => {
    return (fileConfig) => {
        return createFile(pageName, fileConfig, sourceCacheDir);
    };
};

const createCode = async ({ pageName = 'Page', layoutConfig = [], layerConfig = {} }) => {
    // resetCacheDir();
    const sourceCacheDir = getSourceCacheDir(pageName);
    fs.ensureDirSync(sourceCacheDir);
    const newCreateFile = createFilePartial(pageName, sourceCacheDir);
    const { modalArr = [] } = layerConfig;
    const results = await Promise.all([
        newCreateFile({ layoutConfig, layerConfig }),
        ...modalArr.map(({ name, ...rest }) => {
            return createFile(name, Object.assign(rest, { pageName, fileType: 'modal', type: 'ModalContainer' }), sourceCacheDir);
        }),
        newCreateFile({ layerConfig, fileType: 'model', dir: 'models' }),
        newCreateFile({ layerConfig, fileType: 'service', dir: 'services' })
    ]);
    let responseObj = {};
    for (let r of results) {
        responseObj= r;
        if (r.code != '0') {
            break;
        }
    }
    // if (responseObj.code == '0') { // 生成页面成功，压缩文件
    //     compressing.gzip.compressFile(sourceCacheDir, `${sourceCacheDir}.gz`);
    // }
    return responseObj;
};

module.exports = createCode;