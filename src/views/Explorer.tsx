import { useState, useEffect, useRef, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
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
import { CodeJson, FormatLetterCase } from 'mdi-material-ui'
import React from 'react'

const formatFileSize = (size: number) => {
  var sizes = [' Bytes', ' KiB', ' MiB', ' GiB']
  for (let index = 0; index < sizes.length; index++)
    if (size < 1024 ** (index + 1))
      return (Math.round((size / 1024 ** index) * 100) / 100) + sizes[index]
  return size
}

const generateNameLink = (name: string, type: string) => (
  <Link
    underline="none"
    component={RouterLink}
    sx={{ fontWeight: 'medium' }}
    target={type === "directory" ? undefined : "_blank"}
    to={location.pathname + name + (type === "directory" ? "/" : "")}
  >
    {name + (type === "directory" ? "/" : "")}
  </Link>
)

const useDebounce = (callback: () => void, delay: number) => {
  const { current } = useRef({ callback, timer: null })
  useEffect(() => { current.callback = callback }, [callback])
  return useCallback(() => {
    if (current.timer) clearTimeout(current.timer)
    current.timer = setTimeout(() => current.callback(), delay) as any
  }, [])
}

interface ExplorerItem {
  name: string,
  update: string,
  size: string
}

interface ExplorerItemComponent {
  name: JSX.Element,
  update: string,
  size: string
}

export default () => {
  const location = useLocation()
  const initialSearchText = useRef(false)
  const initialGeneratePage = useRef(false)

  const [searchText, setSearchText] = useState("")
  const [regExpMode, setRegExpMode] = useState(false)
  const [isRegExpError, setIsRegExpError] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(true)
  const [filteredData, setFilteredData] = useState<ExplorerItem[]>([])
  const [generatedPage, setGeneratedPage] = useState<ExplorerItemComponent[]>([])

  const { isLoading, isError, data } = useQuery(['explorerData', { path: location.pathname }], () => {
    const { MIRROR_API_PROTOCOL, MIRROR_DOMAIN, MIRROR_EXPLORER_PREFIX } = import.meta.env
    const url = MIRROR_API_PROTOCOL + '://' + MIRROR_DOMAIN + MIRROR_EXPLORER_PREFIX + location.pathname
    return fetch(url).then((res) => res.json())
  })

  const handleData = () => {
    if (data) { setFilteredData(data) }
  }

  const handleCaseSensitive = () => {
    handleSearchText()
    setCaseSensitive(!caseSensitive)
  }

  const handleRegExpMode = () => {
    handleSearchText()
    setRegExpMode(!regExpMode)
  }

  const handleFilteredData = () => {
    if (!initialGeneratePage.current) { initialGeneratePage.current = true }
    else { setGeneratedPage(generatePage()) }
  }

  const handleSearchText = useDebounce(() => {
    if (!initialSearchText.current) {
      initialSearchText.current = true
    }
    else if (regExpMode) {
      const searchRegExp = () => new RegExp(searchText, caseSensitive ? "g" : "gi")
      try { searchRegExp() } catch { setIsRegExpError(true); return }
      setIsRegExpError(false)
      setFilteredData(data.filter((item) => item.name.match(searchRegExp())))
    } else {
      setFilteredData(data.filter((item) => {
        if (caseSensitive) { return item.name.includes(searchText) }
        else { return item.name.toLowerCase().includes(searchText.toLowerCase()) }
      }))
    }
  }, 150)

  const generatePage = () => {
    const parantPageLink = (
      <Link
        component={RouterLink}
        sx={{ fontWeight: 'medium' }}
        underline="none"
        to={location.pathname.slice(0, location.pathname.slice(0, -1).lastIndexOf("/") + 1)}
      >
        Parent directory/
      </Link>
    )
    let result = [{ name: parantPageLink, update: "-", size: "-" }]
    filteredData.forEach((value: any) => result.push({
      name: generateNameLink(value.name, value.type),
      update: format(value.mtime, 'zh_CN'),
      size: value.type == "directory" ? "-" : formatFileSize(value.size).toString()
    }))
    return result
  }

  useEffect(handleData, [data])
  useEffect(handleFilteredData, [filteredData])
  useEffect(handleSearchText, [searchText])

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ marginTop: { lg: 4 }, marginBottom: 2 }}>
        <Grid item sm={9} xs={12} container>
          <Typography component="div" variant="h5" sx={{ fontWeight: 'bold' }}>
            {`Index of: ${location.pathname}`}
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
              placeholder="Search something..."
              helperText={isRegExpError && "Invalid regexp pattern!"}
              onChange={(event) => { setSearchText(event.target.value) }}
              InputProps={{
                endAdornment:
                  <InputAdornment position="end">
                    <Tooltip title="Case sensitive">
                      <IconButton onClick={handleCaseSensitive} edge="end">
                        <FormatLetterCase color={caseSensitive ? "primary" : undefined} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Use regular expression">
                      <IconButton onClick={handleRegExpMode} edge="end" sx={{ marginLeft: "4px" }}>
                        <CodeJson fontSize="small" color={regExpMode ? "primary" : undefined} />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
              }}
            />
          </Grid>
        }
      </Grid>
      {isLoading ? <Loading /> :
        (isError ? <Failed hasButton /> :
          generatedPage &&
          <Paper elevation={3}>
            <Table
              rowCount={generatedPage.length}
              rowGetter={({ index }: { index: number }) => generatedPage[index]}
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