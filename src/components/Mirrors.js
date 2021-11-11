import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import { useQuery } from 'react-query'
import Loading from "../components/Loading"
import Failed from "../components/Failed"
import Config from 'Config'

export default function Mirrors() {
  const { isLoading, isError, data } = useQuery('summarydata', () =>
    fetch(Config.serverUrl + '/summary').then(async function (data) {
      data = await data.json()
      const status= {
        running: data.Running,
        worker_status: []
      }
      for (const key in data.WorkerStatus) {
        const value = data.WorkerStatus[key]
        status.worker_status.push({
          idle: value.Idle, name: key, last_finished: value.LastFinished, result: value.Result
        })
      }
      return status
    })
  )
  if (isLoading) return <Loading />
  if (isError) return <Failed />
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
          {data.worker_status.map((item) => (
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