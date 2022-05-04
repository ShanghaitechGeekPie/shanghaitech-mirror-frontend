import { useState, useEffect, useRef, useCallback } from 'react'
import { useQuery } from 'react-query'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { format } from 'timeago.js'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Table from '@/components/global/Table'
import Loading from '@/components/global/Loading'
import Failed from '@/components/global/Failed'
import { CodeJson } from 'mdi-material-ui'

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

const useDebounce = (callback, delay) => {
  const { current } = useRef({ callback, timer: null })
  useEffect(() => { current.callback = callback }, [callback])
  return useCallback((...args) => {
    if (current.timer) clearTimeout(current.timer)
    current.timer = setTimeout(() => { current.callback(...args) }, delay)
  }, [])
}

export default () => {
  const location = useLocation()
  const initialSearchText = useRef(false)
  const initialGeneratePage = useRef(false)

  const [searchText, setSearchText] = useState("")
  const [regExpMode, setRegExpMode] = useState(false)
  const [isRegExpError, setIsRegExpError] = useState(false)
  const [fileData, setFileData] = useState()
  const [generatedPage, setGeneratedPage] = useState()

  const { isLoading, isError, data } = useQuery(['explorerData', { path: location.pathname }], () =>
    fetch('/api/v1' + location.pathname).then(async (data) => {
      const result = await data.json()
      setFileData(result)
      return result
    })
  )

  const handleRegExpMode = () => {
    handleSearchText()
    setRegExpMode(!regExpMode)
  }

  const handleFileData = () => {
    if (initialGeneratePage.current)
      setGeneratedPage(generatePage(fileData))
    else initialGeneratePage.current = true
  }

  const handleSearchText = useDebounce(() => {
    const getResult = (regexp) => {
      let result = []
      data.forEach((item) => { if (item.name.match(regexp)) result.push(item) })
      return result
    }
    if (initialSearchText.current) {
      if (regExpMode) {
        let isValidRegExp = true
        try { eval(searchText) } catch { isValidRegExp = false }
        if (isValidRegExp) {
          setIsRegExpError(false)
          setFileData(getResult(eval(searchText)))
        }
        else setIsRegExpError(true)
      }
      else setFileData(getResult(new RegExp(searchText, 'i')))
    } else initialSearchText.current = true
  }, 100)

  const generatePage = () => {
    let result = []
    const sliceIndex = location.pathname.slice(0, -1).lastIndexOf("/") + 1
    const lastPageLink = location.pathname.slice(0, sliceIndex)
    result.push({
      name: <Link component={RouterLink} sx={{ fontWeight: 'medium' }} underline="none" to={lastPageLink}>Parent directory/</Link>,
      update: "-",
      size: "-"
    })
    fileData.forEach((value) => result.push({
      name: generateNameLink(value.name, value.type),
      update: format(value.mtime, 'zh_CN'),
      size: value.type == "directory" ? "-" : formatFileSize(value.size)
    }))
    return result
  }

  useEffect(handleFileData, [fileData])
  useEffect(handleSearchText, [searchText])

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ marginTop: { lg: 4 }, marginBottom: 2 }}>
        <Grid item sm={9} xs={12} container>
          <Typography component="div" variant="h5" sx={{ fontWeight: 'bold' }}>
            {"Index of: " + location.pathname}
          </Typography>
        </Grid>
        {!isLoading && !isError &&
          <Grid item sm={3} xs={12} container>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              value={searchText}
              error={isRegExpError}
              helperText={isRegExpError && "Invalid regexp pattern!"}
              placeholder="Search something..."
              onChange={(event) => { setSearchText(event.target.value) }}
              InputProps={{
                endAdornment:
                  <InputAdornment position="end">
                    <Tooltip title="Use RegExp">
                      <IconButton onClick={handleRegExpMode} edge="end">
                        <CodeJson color={regExpMode ? "primary" : "default"} />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
              }}
            />
          </Grid>
        }
      </Grid>
      {isLoading ? <Loading /> :
        (isError ? <Failed button /> :
          generatedPage &&
          <Paper elevation={3}>
            <Table
              rowCount={generatedPage.length}
              rowGetter={({ index }) => generatedPage[index]}
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