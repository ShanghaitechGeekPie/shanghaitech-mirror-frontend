import { useState } from 'react'
import { useQuery } from 'react-query'
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
import DownloadIcon from '@mui/icons-material/Download'
import Loading from '@/components/global/Loading'
import Failed from '@/components/global/Failed'
import Config from 'Config'

export default () => {
  const [selection, setSelection] = useState()
  const { isLoading, isError, data } = useQuery('quickDownloadData', () =>
    fetch(Config.serverUrl + '/downloads').then(async (data) => {
      const result = await data.json()
      setSelection(result[0])
      return result
    })
  )

  if (isLoading) return <Loading variant="outlined" />
  if (isError) return <Failed variant="outlined" disableButton />

  return (
    <Stack spacing={2}>
      <Autocomplete
        value={selection}
        options={Object.keys(data)}
        sx={{ width: "100%" }}
        disableClearable
        noOptionsText="No result"
        onChange={(event, value) => { setSelection(value) }}
        getOptionLabel={(item) => data[item].display}
        renderInput={(params) => <TextField {...params} />}
      />
      <Paper variant="outlined">
        <List>
          {data[selection].links.map((item, key) => (
            <Box key={item.link}>
              {Boolean(key) && <Divider />}
              <ListItem>
                <ListItemText primary={item.name} secondary={item.external} />
                <Button
                  edge="end"
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  rel="noopener"
                  target="_blank"
                  href={Config.serverUrl + item.link}
                >
                  Download
                </Button>
              </ListItem>
            </Box>
          ))}
        </List>
      </Paper>
    </Stack>
  )
}