import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MarkdownIt from "markdown-it"
import prism from "markdown-it-prism"
import "prismjs/components/prism-bash"
import "@/styles/prism.css"
import "@/styles/markdown.css"

const distributionsData = require("@/assets/repository.json")

const replaceVariables = (template, version, https) => {
  let result = template.replace(/{{ PROTOCOL }}/g, https ? "https" : "http")
  result = result.replace(/{{ VERSION }}/g, version)
  result = result.replace(/{{ URL }}/g, "mirrors.geekpie.tech")
  return result
}

const getResultText = (distribution, version, https) => {
  const template = require("@/assets/repository/" + distribution + ".template")
  return replaceVariables(template, version, https)
}

const parseMarkdown = (resultText) => {
  const parser = new MarkdownIt()
  parser.use(prism)
  return parser.render("```\n" + resultText + "\n```")
}

export default () => {
  const [selectedDistribution, setSelectedDistribution] = useState("Archlinux")
  const [allVersions, setAllVersions] = useState(["rolling"])
  const [selectedVersion, setSelectedVersion] = useState("rolling")
  const [enableHTTPS, setEnableHTTPS] = useState(true)
  const [resultText, setResultText] = useState()

  const handleDistribution = (value) => {
    setSelectedDistribution(value)
    setAllVersions(distributionsData[value])
    setSelectedVersion(distributionsData[value][0])
  }

  useEffect(() => {
    const generatedResultText = getResultText(selectedDistribution, selectedVersion, enableHTTPS)
    setResultText(generatedResultText)
  }, [selectedDistribution, selectedVersion, enableHTTPS])

  return (
    <Container disableGutters>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12} container>
          <Autocomplete
            value={selectedDistribution}
            onChange={(event, value) => { handleDistribution(value) }}
            options={Object.keys(distributionsData)}
            disableClearable
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="发行版" />}
          />
        </Grid>
        <Grid item sm={4} xs={7}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel>版本</InputLabel>
            <Select value={selectedVersion} onChange={(event) => { setSelectedVersion(event.target.value) }}>
              {allVersions.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={2} xs={5}>
          <FormControlLabel
            checked={enableHTTPS}
            onChange={(event, value) => { setEnableHTTPS(value) }}
            sx={{ mt: 1 }}
            control={<Checkbox />}
            label="HTTPS"
          />
        </Grid>
        <Grid item xs={12}>
          <Box className="markdown-body" dangerouslySetInnerHTML={{ __html: parseMarkdown(resultText) }} />
        </Grid>
      </Grid>
    </Container>
  )
}