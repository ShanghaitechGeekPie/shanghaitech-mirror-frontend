import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Autocomplete from '@mui/material/Autocomplete'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Download from 'mdi-material-ui/Download'
import Loading from '@/components/Loading'
import LoadFailed from '@/components/LoadFailed'

interface QuickDownloadItem {
  display: string,
  type: string,
  links: QuickDownloadLink[]
}

interface QuickDownloadLink {
  name: string,
  external: string,
  link: string
}

export default () => {
  const [selection, setSelection] = useState<string>()
  const { isLoading, isError, data } = useQuery({
    queryKey: ['quickDownloadData'],
    queryFn: async () => {
      const {
        MIRROR_BACKEND_SEPARATION,
        MIRROR_API_PROTOCOL,
        MIRROR_DOMAIN,
        MIRROR_QUICKDOWNLOAD
      } = import.meta.env
      const prefixAddress = MIRROR_BACKEND_SEPARATION === 'true' ?
        `${MIRROR_API_PROTOCOL}://${MIRROR_DOMAIN}` : ''
      return fetch(`${prefixAddress}${MIRROR_QUICKDOWNLOAD}`).then(async (res) => await res.json())
    }
  }) as { isLoading: boolean, isError: boolean, data: Record<string, QuickDownloadItem> }

  if (isLoading) return <Loading isInline />
  if (isError) return <LoadFailed isInline />

  return (
    <Stack spacing={2}>
      <Autocomplete
        value={selection ?? Object.keys(data)[0]}
        options={Object.keys(data)}
        sx={{ width: '100%' }}
        disableClearable
        noOptionsText="No result"
        onChange={(event, value) => { setSelection(value) }}
        getOptionLabel={(item) => data[item].display}
        renderInput={(params) => <TextField {...params} />}
      />
      <Paper variant="outlined" sx={{ backgroundColor: 'transparent' }}>
        <List>
          {data[selection ?? Object.keys(data)[0]].links.map((item, key) => (
            <Box key={item.link}>
              {Boolean(key) && <Divider />}
              <ListItem
                secondaryAction={
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    rel="noopener"
                    target="_blank"
                    href={item.link}
                    sx={{ minWidth: '96px', marginLeft: 1 }}
                  >
                    下载
                  </Button>
                }
              >
                <ListItemText primary={item.name} secondary={item.external} />
              </ListItem>
            </Box>
          ))}
        </List>
      </Paper>
    </Stack>
  )
}
