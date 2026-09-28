
if (navigator.hardwareConcurrency === undefined)
{
    navigator.hardwareConcurrency = 2;
}

if (Module['locateFile'] === undefined && Module.IsWxGame) 
{
    Module['locateFile'] = (url) => {
        if (url === 'build.worker.js') {
            return 'webgl.worker.js';
        } else {
            return url;
        }
    };
}
if (Module['mainScriptUrlOrBlob'] === undefined && Module.IsWxGame) {
    Module['mainScriptUrlOrBlob'] = 'webgl.wasm.framework.unityweb.js';
}