import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { format as formatTimeAgo } from 'timeago.js'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Link, { LinkProps } from '@mui/material/Link'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VirtualizedTable from '@/components/VirtualizedTable'
import Loading from '@/components/Loading'
import LoadFailed from '@/components/LoadFailed'
import Home from 'mdi-material-ui/Home'
import CodeJson from 'mdi-material-ui/CodeJson'
import ListBoxOutline from 'mdi-material-ui/ListBoxOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'

interface ExplorerDataItem {
  name: string,
  type: string,
  mtime: string,
  size?: number
}

type ExplorerPageItem = {
  name: JSX.Element,
  update: string,
  size: string
}

interface LinkRouterProps extends LinkProps {
  to: string
  replace?: boolean
}

const LinkRouter = (props: LinkRouterProps) => {
  return <Link {...props} component={RouterLink} />
}

const useDebounce = (callback: () => void, delay: number) => {
  type DebounceRef = {
    callback: () => void,
    timer: ReturnType<typeof setTimeout> | null
  }
  const { current } = useRef<DebounceRef>({ callback, timer: null })
  useEffect(() => { current.callback = callback }, [callback])
  return useCallback(() => {
    if (current.timer) clearTimeout(current.timer)
    current.timer = setTimeout(() => current.callback(), delay)
  }, [])
}

export default () => {
  const location = useLocation()
  const pathnameSplit = location.pathname.split('/').filter((value) => value)

  const [searchText, setSearchText] = useState('')
  const [regExpMode, setRegExpMode] = useState(false)
  const [isRegExpError, setIsRegExpError] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(true)
  const [filteredData, setFilteredData] = useState<ExplorerDataItem[]>([])
  const [generatedPage, setGeneratedPage] = useState<ExplorerPageItem[]>([])

  const initialSearchText = useRef(false)
  const initialGeneratePage = useRef(false)

  const { isLoading, isError, data } = useQuery({
    queryKey: ['explorerData', { path: location.pathname }],
    queryFn: async () => {
      const {
        MIRROR_BACKEND_SEPARATION,
        MIRROR_API_PROTOCOL,
        MIRROR_DOMAIN,
        MIRROR_EXPLORER_PREFIX
      } = import.meta.env
      const prefixAddress = MIRROR_BACKEND_SEPARATION === 'true' ?
        `${MIRROR_API_PROTOCOL}://${MIRROR_DOMAIN}` : ''

      const url = `${prefixAddress}${MIRROR_EXPLORER_PREFIX}${location.pathname}`
      return fetch(url).then((res) => res.json())
    }
  })

  const handleCaseSensitive = () => {
    handleSearchText()
    setCaseSensitive(!caseSensitive)
  }

  const handleRegExpMode = () => {
    handleSearchText()
    setRegExpMode(!regExpMode)
  }

  const handleFilteredData = () => {
    if (initialGeneratePage.current)
      setGeneratedPage(generateExplorerPage())
    else initialGeneratePage.current = true
  }

  const handleSearchText = useDebounce(() => {
    if (!initialSearchText.current)
      initialSearchText.current = true

    else if (regExpMode) {
      const searchRegExp = () => new RegExp(searchText, caseSensitive ? 'g' : 'gi')
      try { searchRegExp() } catch { setIsRegExpError(true); return }
      setIsRegExpError(false)
      setFilteredData(data.filter((item: ExplorerDataItem) => item.name.match(searchRegExp())))
    } else {
      setFilteredData(data.filter((item: ExplorerDataItem) => {
        if (caseSensitive) return item.name.includes(searchText)
        else return item.name.toLowerCase().includes(searchText.toLowerCase())
      }))
    }
  }, 150)

  const generateExplorerPage = () => {
    const NameLink = ({ name, type }: { name: string, type: string }) => (
      <Link
        underline="none"
        component={RouterLink}
        sx={{ fontWeight: 'medium' }}
        target={type === 'directory' ? undefined : '_blank'}
        to={location.pathname + name + (type === 'directory' ? '/' : '')}
      >
        {name + (type === 'directory' ? '/' : '')}
      </Link>
    )

    const formatFileSize = (size: number): string => {
      const sizes = [' Bytes', ' KiB', ' MiB', ' GiB']
      for (let index = 0; index < sizes.length; index++) {
        if (size < 1024)
          return (Math.round(size * 100) / 100) + sizes[index]
        size /= 1024
      }
      return (Math.round(size * 100) / 100) + sizes[sizes.length - 1]
    }

    return filteredData.map((value) => ({
      name: <NameLink name={value.name} type={value.type} />,
      update: formatTimeAgo(new Date(value.mtime).getTime(), 'zh_CN'),
      size: value.type === 'directory' ? '-' : formatFileSize(value.size!)
    }))
  }

  useEffect(handleFilteredData, [filteredData])
  useEffect(handleSearchText, [searchText])
  useLayoutEffect(() => data && setFilteredData(data), [data])

  return (
    <Container maxWidth="lg">
      <Stack spacing={2} sx={{ marginTop: { lg: 4 } }}>
        <Grid container rowSpacing={{ xs: 2, sm: 0 }}>
          <Grid size={{ xs: 12, sm: 9 }}>
            <Typography
              component="div"
              variant="h5"
              sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}
              gutterBottom
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <ListBoxOutline sx={{ fontSize: 30 }} />
                <Box>Explorer</Box>
              </Stack>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              value={searchText}
              error={isRegExpError}
              disabled={isLoading || isError}
              placeholder="Search something..."
              helperText={isRegExpError && 'Invalid regexp pattern!'}
              onChange={(event) => { setSearchText(event.target.value) }}
              InputProps={{
                endAdornment:
                  !isLoading && !isError &&
                  <InputAdornment position="end">
                    <Tooltip title="Case sensitive">
                      <IconButton onClick={handleCaseSensitive} edge="end">
                        <FormatLetterCase color={caseSensitive ? 'primary' : undefined} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Use regular expression">
                      <IconButton onClick={handleRegExpMode} edge="end" sx={{ marginLeft: '4px' }}>
                        <CodeJson fontSize="small" color={regExpMode ? 'primary' : undefined} />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
              }}
            />
          </Grid>
        </Grid>
        <Paper sx={{ padding: '12px 16px' }} elevation={2}>
          <Breadcrumbs aria-label="File breadcrumb">
            <LinkRouter
              underline="hover"
              color="inherit"
              to="/"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Home sx={{ fontSize: 20 }} />
            </LinkRouter>
            {pathnameSplit.map((value, index) => (
              index === pathnameSplit.length - 1 ? (
                <Typography
                  color="text.primary"
                  key={value}
                  fontSize={16}
                >
                  {value}
                </Typography>
              ) : (
                <LinkRouter
                  underline="hover"
                  color="inherit"
                  key={value}
                  to={`/${pathnameSplit.slice(0, index + 1).join('/')}/`}
                >
                  {value}
                </LinkRouter>
              )
            ))}
          </Breadcrumbs>
        </Paper>
        {isLoading ? <Loading /> :
          (isError ? <LoadFailed hasButton /> :
            generatedPage &&
            <Paper elevation={2}>
              <VirtualizedTable data={generatedPage} columns={[
                { label: '文件名', dataKey: 'name', align: 'left' },
                { label: '上次修改', dataKey: 'update', align: 'center' },
                { label: '大小', dataKey: 'size', align: 'right' }
              ]} />
            </Paper>
          )
        }
      </Stack>
    </Container>
  )
}
