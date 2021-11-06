import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import axios from "axios"
import { useEffect, useState } from 'react'
import Config from 'Config'

export default function Mirrors() {
  const [status, setStatus] = useState({
    running: false,
    worker_status: []
  })
  useEffect(() => {
    (async () => {
      const summary = await axios.get(Config.serverUrl + '/summary')
      let status = []
      for (const key in summary.data.WorkerStatus) {
        const value = summary.data.WorkerStatus[key]
        status.push({
          idle: value.Idle, name: key, last_finished: value.LastFinished, result: value.Result
        })
      }
      setStatus({
        running: summary.data.Running, worker_status: status
      })
    })()
  }, [])
  return (
    <TableContainer component={Paper} sx={{ mt: 4, mb: 6 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>名称</TableCell>
            <TableCell>上次同步</TableCell>
            <TableCell align="right">状态</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {status.worker_status.map((item) => (
            <TableRow key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <Link to={item.name + "/"}>{item.name + "/"}</Link>
              </TableCell>
              <TableCell component="th" scope="row">{format(item.last_finished, 'zh_CN')}</TableCell>
              {item.idle ?
                (item.result ? <TableCell align="right">同步成功</TableCell> : <TableCell align="right">同步失败</TableCell>) :
                (<TableCell align="right">正在同步</TableCell>)
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}