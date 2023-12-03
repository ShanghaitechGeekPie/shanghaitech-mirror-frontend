import { Link as RouterLink } from 'react-router-dom'
import { format } from 'timeago.js'
import { useQuery } from '@tanstack/react-query'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import Check from 'mdi-material-ui/Check'
import Sync from 'mdi-material-ui/Sync'
import Close from 'mdi-material-ui/Close'
import HelpCircle from 'mdi-material-ui/HelpCircle'
import Loading from '@/components/global/Loading'
import Failed from '@/components/global/Failed'
import Table from '@/components/global/Table'
import Title from '@/components/views/HomeTitle'
import News from '@/components/views/HomeNews'
import Tools from '@/components/views/HomeTools'
import Links from '@/components/views/HomeLinks'
import helpConfig from '@/assets/metadata/help.json'

interface MirrorWorkerStatus {
  Result: boolean,
  LastFinished: string,
  Idle: boolean
}

interface MirrorSummary {
  Running: boolean,
  WorkerStatus: { [key: string]: MirrorWorkerStatus }
}

type HomeMirrorItem = {
  name: JSX.Element,
  update: string,
  status: JSX.Element
}

const generateNameLink = (name: string) => (
  <>
    <Link component={RouterLink} sx={{ fontWeight: 'medium' }} underline="none" to={`${name}/`}>{name}</Link>
    {
      Object.prototype.hasOwnProperty.call(helpConfig, name) &&
      <IconButton
        component={RouterLink}
        color="primary"
        size="small"
        to={`/help/${name}`}
        aria-label={`Help for ${name}`}
      >
        <HelpCircle fontSize="inherit" />
      </IconButton>
    }
  </>
)

const generateStatus = (ifIdle: boolean, ifSuccess: boolean) => {
  enum Status { Idle, Success, Fail }
  interface SyncStatusMeta {
    icon: JSX.Element,
    label: string,
    color: 'info' | 'success' | 'warning'
  }
  const syncStatusMeta = {
    [Status.Idle]: { icon: <Sync />, label: '正在同步', color: 'info' },
    [Status.Success]: { icon: <Check />, label: '同步成功', color: 'success' },
    [Status.Fail]: { icon: <Close />, label: '同步失败', color: 'warning' }
  } as { [key in Status]: SyncStatusMeta }
  const status = ifIdle ? (ifSuccess ? Status.Success : Status.Fail) : Status.Idle
  const { icon, label, color } = syncStatusMeta[status]
  return <Chip icon={icon} label={label} size="small" color={color} />
}

export default () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['summaryData'],
    queryFn: async () => {
      const {
        MIRROR_BACKEND_SEPARATION,
        MIRROR_API_PROTOCOL,
        MIRROR_DOMAIN,
        MIRROR_SUMMARY
      } = import.meta.env

      const prefixAddress = MIRROR_BACKEND_SEPARATION === 'true' ?
        `${MIRROR_API_PROTOCOL}://${MIRROR_DOMAIN}` : ''

      return fetch(`${prefixAddress}${MIRROR_SUMMARY}`).then(async (result) => (
        Object.entries((await result.json() as MirrorSummary).WorkerStatus).map(([key, value]) => ({
          name: generateNameLink(key),
          update: format(value.LastFinished, 'zh_CN'),
          status: generateStatus(value.Idle, value.Result)
        }))
      ))
    }
  }) as { isLoading: boolean, isError: boolean, data: HomeMirrorItem[] }

  return (
    <Container maxWidth="lg">
      <Title />
      <Grid container spacing={4}>
        <Grid xs={12} md={8}>
          {isLoading ? <Loading /> :
            (isError ? <Failed /> :
              <Paper elevation={3}>
                <Table data={data} columns={[
                  { label: '名称', dataKey: 'name', align: 'left' },
                  { label: '上次同步', dataKey: 'update', align: 'center' },
                  { label: '状态', dataKey: 'status', align: 'right' }
                ]} />
              </Paper>
            )
          }
        </Grid>
        <Grid xs={12} md={4}>
          <Stack spacing={4}>
            <News />
            <Tools />
            <Links />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}
