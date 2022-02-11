import { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import DownloadIcon from '@mui/icons-material/Download'
import ListItemText from '@mui/material/ListItemText'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Config from 'Config'

export default () => {
  const [selection, setSelection] = useState(Object.keys(options)[0])

  return (
    <Stack spacing={2}>
      <Autocomplete
        value={selection}
        options={Object.keys(options)}
        sx={{ width: "100%" }}
        disableClearable
        noOptionsText="No result"
        onChange={(event, value) => { setSelection(value) }}
        getOptionLabel={(item) => options[item].display}
        renderInput={(params) => <TextField {...params} />}
      />
      <Paper variant="outlined">
        <List>
          {options[selection].links.map((item, key) => (
            <Box key={item.name}>
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

const options = {
  "archlinux": {
    display: "Archlinux",
    type: "system",
    links: [
      {
        name: "2022.02.01",
        external: "x86_64, CLI-only",
        link: "/archlinux/iso/latest/archlinux-2022.02.01-x86_64.iso"
      }
    ]
  },
  "anaconda": {
    display: "Anaconda",
    type: "software",
    links: [
      {
        name: "Miniconda3-py38 4.10.3",
        external: "Windows/x86_64, exe",
        link: "/anaconda/miniconda/Miniconda3-py38_4.10.3-Windows-x86_64.exe"
      },
      {
        name: "Miniconda3-py38 4.10.3",
        external: "Windows/x86, exe",
        link: "/anaconda/miniconda/Miniconda3-py38_4.10.3-Windows-x86.exe"
      }
    ]
  },
}