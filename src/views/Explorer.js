import { useQuery } from 'react-query'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { format } from 'timeago.js'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Table from '@/components/global/Table'
import Loading from '@/components/global/Loading'
import Failed from '@/components/global/Failed'
import Config from 'Config'

const formatFileSize = (size) => {
  var sizes = [' Bytes', ' KiB', ' MiB', ' GiB'];
  for (let index = 0; index < sizes.length; index++)
    if (size < Math.pow(1024, index + 1))
      return (Math.round((size / Math.pow(1024, index)) * 100) / 100) + sizes[index]
  return size;
}

const generateNameLink = (name, type) => (
  type == "directory" ?
    <Link
      component={RouterLink}
      sx={{ fontWeight: 'medium' }}
      underline="none" to={location.pathname + name + "/"}
    >
      {name + "/"}
    </Link> :
    <Link
      component={RouterLink}
      sx={{ fontWeight: 'medium' }}
      to={location.pathname + name}
      underline="none"
      target="_blank"
    >
      {name}
    </Link>
)

export default () => {
  const location = useLocation()
  const { isLoading, isError, data } = useQuery(['explorerData', { path: location.pathname }], () =>
    fetch(Config.serverUrl + '/api/v1' + location.pathname).then(async (data) => {
      let result = [], content = await data.json()
      result.push({
        name: (
          <Link
            component={RouterLink}
            sx={{ fontWeight: 'medium' }}
            underline="none"
            to={location.pathname.slice(0, location.pathname.slice(0, -1).lastIndexOf("/") + 1)}
          >
            Parent directory/
          </Link>
        ),
        update: "-",
        size: "-"
      })
      content.forEach((value) => result.push({
        name: generateNameLink(value.name, value.type),
        update: format(value.mtime, 'zh_CN'),
        size: value.type == "directory" ? "-" : formatFileSize(value.size)
      }))
      return result
    })
  )

  return (
    <Container maxWidth="lg">
      <Typography
        component="div"
        variant="h5"
        sx={{ fontWeight: 'bold', marginTop: { lg: 4 }, marginBottom: 4 }}
      >
        {"Index of: " + location.pathname}
      </Typography>
      {isLoading ? <Loading /> :
        (isError ? <Failed button /> :
          <Paper elevation={3}>
            <Table
              rowCount={data.length}
              rowGetter={({ index }) => data[index]}
              columns={[
                { label: '文件名', dataKey: 'name', align: 'left' },
                { label: '上次修改', dataKey: 'update', align: 'center' },
                { label: '大小', dataKey: 'size', align: 'right' }
              ]}
            />
          </Paper>
        )
      }
    </Container>
  )
}