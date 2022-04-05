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
import { Download } from 'mdi-material-ui'
import Loading from '@/components/global/Loading'
import Failed from '@/components/global/Failed'

export default () => {
  const [selection, setSelection] = useState()
  const { isLoading, isError, data } = useQuery('quickDownloadData', () =>
    fetch('/downloads').then(async (data) => await data.json())
  )

  if (isLoading) return <Loading inline />
  if (isError) return <Failed inline />

  return (
    <Stack spacing={2}>
      <Autocomplete
        value={selection ? selection : Object.keys(data)[0]}
        options={Object.keys(data)}
        sx={{ width: "100%" }}
        disableClearable
        noOptionsText="No result"
        onChange={(event, value) => { setSelection(value) }}
        getOptionLabel={(item) => data[item].display}
        renderInput={(params) => <TextField {...params} />}
      />
      <Paper variant="outlined" sx={{ backgroundColor: "transparent" }}>
        <List>
          {data[selection ? selection : Object.keys(data)[0]].links.map((item, key) => (
            <Box key={item.link}>
              {Boolean(key) && <Divider />}
              <ListItem>
                <ListItemText primary={item.name} secondary={item.external} />
                <Button
                  edge="end"
                  variant="outlined"
                  startIcon={<Download />}
                  rel="noopener"
                  target="_blank"
                  href={item.link}
                  sx={{ minWidth: "96px", marginLeft: 1 }}
                >
                  下载
                </Button>
              </ListItem>
            </Box>
          ))}
        </List>
      </Paper>
    </Stack>
  )
}