import React from 'react';
import MirrorStatus from "./MirrorStatus";
import Navbar from "./Navbar";
import News from "./News";
import Banner from "./Banner";
import Footer from "./Footer";

function App() {
    return (
        <div className="App">
            <div className="w-full bg-gray-100">
                <div className="w-11/12 lg:w-5/6 mx-auto">
                    <Navbar/>
                    <div className="flex flex-col w-full">
                        <Banner/>
                        <span className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-600">镜像列表</span>
                        <div className="flex flex-col lg:flex-row w-full">
                            <MirrorStatus/>
                            <News/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
