import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import VirtualizedTable from "@/components/global/Table"
import { format } from 'timeago.js'
import { useLocation } from 'react-router-dom'

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
    <Link component={RouterLink}
      sx={{ fontWeight: 'medium' }}
      underline="none"
      to={location.pathname + name}
      target="_blank"
    >
      {name}
    </Link>
)

const getData = (data) => {
  let result = []
  result.push({
    id: 0,
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
  data.forEach((value, index) => result.push({
    id: index + 1,
    name: generateNameLink(value.name, value.type),
    update: format(value.mtime, 'zh_CN'),
    size: value.type == "directory" ? "-" : formatFileSize(value.size)
  }))
  return result
}

export default (props) => {
  const location = useLocation()
  const data = getData(props.data)

  return (
    <Container maxWidth="lg">
      <Typography
        component="div"
        variant="h5"
        sx={{ fontWeight: 'medium', mb: 4 }}
        gutterBottom
      >
        {"Index of: " + location.pathname}
      </Typography>
      <Paper elevation={3}>
        <VirtualizedTable
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
          columns={[
            {
              label: '文件名',
              dataKey: 'name',
              align: 'left'
            },
            {
              label: '上次修改',
              dataKey: 'update',
              align: 'center'
            },
            {
              label: '大小',
              dataKey: 'size',
              align: 'right'
            },
          ]}
        />
      </Paper>
    </Container>
  )
}