import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import { format } from 'timeago.js'
import { useQuery } from 'react-query'
import DoneIcon from '@mui/icons-material/Done'
import LoopIcon from '@mui/icons-material/Loop'
import CloseIcon from '@mui/icons-material/Close'
import Loading from "../global/Loading"
import Failed from "../global/Failed"
import Config from 'Config'

export default function Mirrors() {
  const { isLoading, isError, data } = useQuery('summarydata', () =>
    fetch(Config.serverUrl + '/summary').then(async function (data) {
      data = await data.json()
      const status = {
        running: data.Running,
        worker_status: []
      }
      for (let key in data.WorkerStatus) {
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
    <Paper elevation={3}>
      <TableContainer sx={{ mt: 4, mb: 6 }}>
        <Table sx={{ minWidth: 650 }} style={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>名称</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>上次同步</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>状态</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.worker_status.map((item) => (
              <TableRow key={item.name} rowSpan={item.length} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">
                  <Link component={RouterLink} underline="none" to={item.name + "/"}>{item.name}</Link>
                </TableCell>
                <TableCell component="th" scope="row" align="center">{format(item.last_finished, 'zh_CN')}</TableCell>
                <TableCell align="right">
                  {item.idle ?
                    (item.result ? <Chip icon={<DoneIcon />} label="同步成功" size="small" color="success" /> : <Chip icon={<CloseIcon />} label="同步失败" size="small" color="warning" />) :
                    (<Chip icon={<LoopIcon />} label="正在同步" size="small" color="primary" />)
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}