import Container from '@mui/material/Container'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Link, useLocation } from 'react-router-dom'
import { format } from 'timeago.js'
import axios from "axios"
import { useEffect, useState, componentWillReceiveProps } from 'react'

function formatFileSize(size) {
  var sizes = [' Bytes', ' KiB', ' MiB', ' GiB'];
  for (var index = 1; index < sizes.length; index++)
    if (size < Math.pow(1024, index))
      return (Math.round((size / Math.pow(1024, index - 1)) * 100) / 100) + sizes[index - 1]
  return size;
}

export default function Mirrors(props) {
  const [content, setContent] = useState({
    content: []
  })
  const location = useLocation()
  useEffect(() => {
    (async () => {
      const content = await axios.get('https://mirrors.geekpie.tech/api/v1' + location.pathname + '/')
      setContent({
        content: content.data
      })
    })()
  }, [props.location])
  return (
    <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
      <TableContainer component={Paper} sx={{ mt: 4, mb: 6 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>文件名</TableCell>
              <TableCell>上次同步</TableCell>
              <TableCell align="right">大小</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Link to={location.pathname.slice(0, location.pathname.lastIndexOf("/"))} >Parent directory/</Link>
              </TableCell>
              <TableCell component="th" scope="row">-</TableCell>
              <TableCell align="right">-</TableCell>
            </TableRow>
            {content.content.map((item) => (
              <TableRow key={item.name}>
                <TableCell>
                  {item.type == "directory" ? <Link to={location.pathname + "/" + item.name}>{item.name + "/"}</Link> : <Link href={location.pathname + "/" + item.name}>{item.name}</Link>}
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
    </Container>
  )
}