import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import { format } from 'timeago.js'
import { useQuery } from 'react-query'
import IconButton from '@mui/material/IconButton'
import DoneIcon from '@mui/icons-material/Done'
import LoopIcon from '@mui/icons-material/Loop'
import CloseIcon from '@mui/icons-material/Close'
import HelpIcon from '@mui/icons-material/Help'
import Loading from "@/components/global/Loading"
import Failed from "@/components/global/Failed"
import VirtualizedTable from "@/components/global/Table"
import Config from 'Config'

const helpData = require("@/assets/help.json")

const generateNameLink = (name) => (
  <>
    <Link component={RouterLink} sx={{ fontWeight: 'medium' }} underline="none" to={name + "/"}>{name}</Link>
    {
      (helpData.system.hasOwnProperty(name) || helpData.software.hasOwnProperty(name)) &&
      <IconButton
        color="primary"
        size="small"
        component={RouterLink}
        to={"/help/" + name}
      >
        <HelpIcon fontSize="inherit" />
      </IconButton>
    }
  </>
)

const generateStatus = (ifIdle, ifSuccess) => {
  if (ifIdle)
    if (ifSuccess) return <Chip icon={<DoneIcon />} label="同步成功" size="small" color="success" />
    else return <Chip icon={<CloseIcon />} label="同步失败" size="small" color="warning" />
  else return <Chip icon={<LoopIcon />} label="正在同步" size="small" color="info" />
}

export default () => {
  const { isLoading, isError, data } = useQuery('summarydata', () =>
    fetch(Config.serverUrl + '/summary').then(async function (data) {
      const { WorkerStatus } = await data.json(), status = []
      let index = 0
      for (let key in WorkerStatus) {
        const value = WorkerStatus[key]
        status.push({
          id: index,
          name: generateNameLink(key),
          update: format(value.LastFinished, 'zh_CN'),
          status: generateStatus(value.Idle, value.Result)
        })
        index += 1
      }
      return status
    })
  )
  if (isLoading) return <Loading />
  if (isError) return <Failed />

  return (
    <Paper elevation={3}>
      <VirtualizedTable
        rowCount={data.length}
        rowGetter={({ index }) => data[index]}
        columns={[
          {
            label: '名称',
            dataKey: 'name',
            align: 'left'
          },
          {
            label: '上次同步',
            dataKey: 'update',
            align: 'center'
          },
          {
            label: '状态',
            dataKey: 'status',
            align: 'right'
          },
        ]}
      />
    </Paper>
  )
}