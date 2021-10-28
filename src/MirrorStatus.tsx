import React, {useEffect, useState} from 'react';
import {format} from 'timeago.js';
import axios from "axios";

interface WorkerStatusResponse {
    Running: boolean;
    WorkerStatus: { [index: string]: MirrorScriptStatusResponse };
}

interface WorkerStatus {
    Running: boolean;
    WorkerStatus: Array<MirrorScriptStatus>;
}

interface MirrorScriptStatusResponse {
    Result: boolean;
    LastFinished: Date;
    Idle: boolean;
}

interface MirrorScriptStatus {
    Result: boolean;
    LastFinished: Date;
    Idle: boolean;
    Name: string;
}

const syncSuccessSVG = <svg className="text-green-500 inline mr-2 h-4 w-6 stroke-1" stroke="currentColor"
                            fill="currentColor" strokeWidth="0" viewBox="0 0 13 13"
                            xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd"
          d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z"
          clipRule="evenodd"/>
</svg>
const syncFailedSVG = <svg className="text-red-500 inline mr-2 h-4 w-6 stroke-1" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 13 13"
                           height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd"
          d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"
          clipRule="evenodd"/>
    <path fillRule="evenodd"
          d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"
          clipRule="evenodd"/>
</svg>
const syncingSVG =                         <svg
    className="animate-spin mr-2 h-4 w-6 text-blue-500 inline"
    xmlns="http://www.w3.org/2000/svg"
    fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
            strokeWidth="4"/>
    <path className="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
</svg>

function MirrorStatus() {
    const [status, setStatus] = useState<WorkerStatus>({
        Running: false,
        WorkerStatus: []
    });
    useEffect(() => {
        (async () => {
            const summary = await axios.get<WorkerStatusResponse>('https://mirrors.geekpie.tech/summary');
            let status: Array<MirrorScriptStatus> = [];
            for (const key in summary.data.WorkerStatus) {
                const value = summary.data.WorkerStatus[key];
                status.push({
                    Idle: value.Idle, LastFinished: value.LastFinished, Name: key, Result: value.Result
                })
            }
            setStatus({
                Running: summary.data.Running, WorkerStatus: status
            });
        })()
    }, [])
    return <table className="lg:w-2/3 w-full font-normal">
        <thead className="text-left text-gray-800">
        <tr>
            <th className="border-b-2 border-black">
                名称
            </th>
            <th>
                上次同步
            </th>
            <th>
                状态
            </th>
        </tr>
        </thead>
        <tbody>
        {status.WorkerStatus.map((s) =>
            <tr className="hover:bg-gray-200 transition-all border-t-4 border-b-4 border-transparent font-medium text-gray-800" key={s.Name}>
                <td>
                    {s.Name}
                </td>
                <td>
                    <span>{format(s.LastFinished, 'zh_CN')}</span>
                </td>
                <td>
                    {s.Idle ? (s.Result ? <div className="flex items-center">
                            {syncSuccessSVG}
                            <span className="text-green-500">同步成功</span></div> : <div className="flex items-center">
                            {syncFailedSVG}
                            <span className="text-red-400">同步失败</span>
                        </div>
                    ) : (<div className="flex items-center">
                        {syncingSVG}
                        <span className="text-blue-500">正在同步</span>
                    </div>)}
                </td>
            </tr>
        )}
        </tbody>
    </table>
}

export default MirrorStatus;