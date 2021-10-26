import React from 'react';
import CallApp from 'callapp-lib';

const option = {
    scheme: {
        protocol: 'wand_scheme',
    },
    intent: {
        package: 'com.zhihu.android',
        scheme: 'wand_scheme',
    },
    universal: {
        host: 'auth.member.dgene.com',
    },
    appstore: 'https://itunes.apple.com/app/id1574341319',
    fallback: 'https://anome.geekpie.club/',
    timeout: 2000,
};

const lib = new CallApp(option);

function RedirectToApps(){
    const search = new URLSearchParams(window.location.search);
    const config = {path: `?${search.toString()}`};
    lib.open(config);
}

function CallTest(){
    const search = new URLSearchParams(window.location.search);
    const config = {path: `?${search.toString()}`};
    let generateScheme = lib.generateScheme(config);
    let generateIntent = lib.generateIntent(config);
    let generateUniversalLink= lib.generateUniversalLink(config);
    console.log("generateScheme: ",lib.generateScheme(config))
    console.log("generateIntent: ",lib.generateIntent(config))
    console.log("generateUniversalLink: ",lib.generateUniversalLink(config))
    return (<div>
        <div className="">
            <span className="block w-full">测试: http://localhost:3000/?user_id=1&style_id=2</span>
            <span className="block w-full">generateScheme:{generateScheme}</span>
            <span className="block w-full">generateIntent:{generateIntent}</span>
            <span className="block w-full">generateUniversalLink:{generateUniversalLink}</span>
        </div>
    </div>)
}

function App() {
    return (
        <div className="App">
            <div className="w-screen h-screen bg-white">
                <p>暂未实现安卓端跳转，一是因为手机上没装，不好调试。二是安卓端跳转需要得到包名(dgene.com).<br/>
                </p>
                <CallTest/>
                <div className="flex items-center justify-center h-24">
                    <span className="block text-center rounded-full px-4 py-2 bg-blue-500 font-semibold text-gray-100 tracking-wider shadow-lg" onClick={RedirectToApps}>App 内打开</span>
                </div>
            </div>
        </div>
    );
}

export default App;
