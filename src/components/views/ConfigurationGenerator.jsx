import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MarkdownIt from "markdown-it"
import prism from 'markdown-it-prism'
import distributionsData from '@/assets/config/repository.json'
import styles from '@/styles/modules/index.module.css'
import '@/styles/markdown/prism.css'
import '@/styles/markdown/common.css'

const replaceVariables = (template, version, https) => {
  let result = template.replace(/{{ PROTOCOL }}/g, https ? "https" : "http")
  result = result.replace(/{{ VERSION }}/g, version)
  result = result.replace(/{{ URL }}/g, "mirrors.shanghaitech.edu.cn")
  return result
}

const getTemplate = (distribution, version, https) => {
  const templatePath = distributionsData[distribution].seperated ? distribution + "/" + version + ".template" : distribution + ".template"
  const content = import.meta.glob('@/assets/content/repository/*.template', { as: "raw", eager: true })
  for (const item in content) if (item.includes(templatePath)) return replaceVariables(content[item], version, https)
}

const parseMarkdown = (resultText) => {
  const parser = new MarkdownIt()
  parser.use(prism)
  return parser.render("```\n" + resultText + "\n```")
}

export default () => {
  const [selectedDistribution, setSelectedDistribution] = useState("archlinux")
  const [allVersions, setAllVersions] = useState(["rolling"])
  const [selectedVersion, setSelectedVersion] = useState("rolling")
  const [enableHTTPS, setEnableHTTPS] = useState(true)
  const [resultText, setResultText] = useState()

  const handleDistribution = (distribution) => {
    setSelectedDistribution(distribution)
    setAllVersions(distributionsData[distribution].versions)
    setSelectedVersion(distributionsData[distribution].versions[0])
  }

  const shouldShowDebSrcInfo = ["debian", "kali", "ubuntu"].includes(selectedDistribution)

  useEffect(() => {
    setResultText(getTemplate(selectedDistribution, selectedVersion, enableHTTPS))
  }, [selectedDistribution, selectedVersion, enableHTTPS])

  return (
    <Grid container spacing={2}>
      <Grid item sm={6} xs={12} container>
        <Autocomplete
          value={selectedDistribution}
          options={Object.keys(distributionsData)}
          sx={{ width: "100%" }}
          disableClearable
          noOptionsText="No such distribution"
          onChange={(event, value) => { handleDistribution(value) }}
          getOptionLabel={(distribution) => distributionsData[distribution].name}
          renderInput={(params) => <TextField {...params} label="发行版" />}
        />
      </Grid>
      <Grid item sm={4} xs={7}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel>版本</InputLabel>
          <Select
            label="版本"
            value={selectedVersion}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300
                }
              }
            }}
            onChange={(event) => { setSelectedVersion(event.target.value) }}
          >
            {allVersions.map((version) => (
              <MenuItem key={version} value={version}>{version}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sm={2} xs={5}>
        <FormControlLabel
          checked={enableHTTPS}
          onChange={(event, value) => { setEnableHTTPS(value) }}
          sx={{ marginTop: 1 }}
          control={<Checkbox />}
          label="HTTPS"
        />
      </Grid>
      {shouldShowDebSrcInfo &&
        <Grid item xs={12}>
          <Alert variant="filled" severity="info">源码库默认被禁用以提高同步速度，您可以取消注释以启用之！</Alert>
        </Grid>
      }
      <Grid item xs={12}>
        {/* Word break on mobile screen to enhance reading experience */}
        <Box className={styles.wordBreak}>
          <Box className="markdown-body" dangerouslySetInnerHTML={{ __html: parseMarkdown(resultText) }} />
        </Box>
      </Grid>
    </Grid>
  )
}