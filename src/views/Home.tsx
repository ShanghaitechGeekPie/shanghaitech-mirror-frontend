import { Link as RouterLink } from 'react-router-dom'
import { format } from 'timeago.js'
import { useQuery } from '@tanstack/react-query'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import { Check, Sync, Close, HelpCircle } from 'mdi-material-ui'
import Loading from '@/components/global/Loading'
import Failed from '@/components/global/Failed'
import Table from '@/components/global/Table'
import Title from '@/components/views/HomeTitle'
import News from '@/components/views/HomeNews'
import Tools from '@/components/views/HomeTools'
import Links from '@/components/views/HomeLinks'
import helpConfig from '@/assets/config/help.json'

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
  if (ifIdle) {
    if (ifSuccess) return <Chip icon={<Check />} label="同步成功" size="small" color="success" />
    else return <Chip icon={<Close />} label="同步失败" size="small" color="warning" />
  } else return <Chip icon={<Sync />} label="正在同步" size="small" color="info" />
}

interface MirrorSummary {
  Running: boolean,
  WorkerStatus: { [key: string]: MirrorWorkerStatus }
}

interface MirrorWorkerStatus {
  Result: boolean,
  LastFinished: string,
  Idle: boolean
}

export default () => {
  const { isLoading, isError, data } = useQuery(['summaryData'], () => {
    const { MIRROR_API_PROTOCOL, MIRROR_DOMAIN, MIRROR_SUMMARY_PREFIX } = import.meta.env
    const url = MIRROR_API_PROTOCOL + '://' + MIRROR_DOMAIN + MIRROR_SUMMARY_PREFIX
    return fetch(url).then(async (result) => (
      Object.entries((await result.json() as MirrorSummary).WorkerStatus).map(([key, value]) => ({
        name: generateNameLink(key),
        update: format(value.LastFinished, 'zh_CN'),
        status: generateStatus(value.Idle, value.Result)
      }))
    ))
  })

  return (
    <Container maxWidth="lg">
      <Title />
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {isLoading ? <Loading /> :
            (isError ? <Failed /> :
              <Paper elevation={3}>
                <Table
                  rowCount={data.length}
                  rowGetter={({ index }: { index: number }) => data[index]}
                  columns={[
                    { label: '名称', dataKey: 'name', align: 'left' },
                    { label: '上次同步', dataKey: 'update', align: 'center' },
                    { label: '状态', dataKey: 'status', align: 'right' }
                  ]}
                />
              </Paper>
            )
          }
        </Grid>
        <Grid item xs={12} md={4}>
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
