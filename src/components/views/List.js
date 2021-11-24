import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import Typography from '@mui/material/Typography'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import { format } from 'timeago.js'
import { useLocation } from 'react-router-dom'

function formatFileSize(size) {
  var sizes = [' Bytes', ' KiB', ' MiB', ' GiB'];
  for (let index = 0; index < sizes.length; index++)
    if (size < Math.pow(1024, index + 1))
      return (Math.round((size / Math.pow(1024, index)) * 100) / 100) + sizes[index]
  return size;
}

export default (props) => {
  const location = useLocation()
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" sx={{ fontWeight: 'medium' }} gutterBottom>{"Index of: " + location.pathname}</Typography>
      <Paper elevation={3}>
        <TableContainer component={Paper} sx={{ mt: 4, mb: 6 }}>
          <Table sx={{ width: "100%" }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>文件名</TableCell>
                <TableCell>上次同步</TableCell>
                <TableCell align="right">大小</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell>
                  <Link component={RouterLink} sx={{ fontWeight: 'medium' }} underline="none" to={location.pathname.slice(0, location.pathname.slice(0, -1).lastIndexOf("/") + 1)} >Parent directory/</Link>
                </TableCell>
                <TableCell component="th" scope="row">-</TableCell>
                <TableCell align="right">-</TableCell>
              </TableRow>
              {props.data.map((item) => (
                <TableRow hover key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    {item.type == "directory" ? <Link component={RouterLink} sx={{ fontWeight: 'medium' }} underline="none" to={location.pathname + item.name + "/"}>{item.name + "/"}</Link> : <Link component={RouterLink} sx={{ fontWeight: 'medium' }} underline="none" to={location.pathname + item.name} target="_blank">{item.name}</Link>}
                  </TableCell>
                  <TableCell component="th" scope="row">{format(item.last_finished, 'zh_CN')}</TableCell>
                  <TableCell align="right">
                    {item.type == "directory" ? "-" : formatFileSize(item.size)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  )
}