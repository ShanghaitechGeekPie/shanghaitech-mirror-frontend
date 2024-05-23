import { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
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
import MarkdownIt from 'markdown-it'
import MarkdownItPrism from 'markdown-it-prism'
import _distributionsData from '@/assets/metadata/repository.json'
import '@/styles/markdown/prism.css'
import '@/styles/markdown/common.css'

interface DistributionInfo {
  name: string
  seperated: boolean,
  versions: string[],
}

const debSrcInfoDistributions = ['debian', 'kali', 'ubuntu']
const distributionsData: Record<string, DistributionInfo> = _distributionsData

const metaGlob = Object.entries(import.meta.glob(
  '@/contents/repository/*.template',
  { query: '?raw', import: 'default', eager: true }
))

const seperatedMetaGlob = Object.entries(import.meta.glob(
  '@/contents/repository/*/*.template',
  { query: '?raw', import: 'default', eager: true }
))

const parser = new MarkdownIt()
parser.use(MarkdownItPrism)

export default () => {
  const [selectedDistribution, setSelectedDistribution] = useState('archlinux')
  const [allVersions, setAllVersions] = useState(['rolling'])
  const [selectedVersion, setSelectedVersion] = useState('rolling')
  const [enableHTTPS, setEnableHTTPS] = useState(true)
  const [templateText, setTemplateText] = useState('')
  const shouldShowDebSrcInfo = debSrcInfoDistributions.includes(selectedDistribution)

  const handleDistribution = (distribution: string) => {
    setSelectedDistribution(distribution)
    setAllVersions(distributionsData[distribution].versions)
    setSelectedVersion(distributionsData[distribution].versions[0])
  }

  useEffect(() => {
    const constructTemplate = () => {
      const { seperated } = distributionsData[selectedDistribution]
      const templatePath = seperated ?
        `${selectedDistribution}/${selectedVersion}.template` :
        `${selectedDistribution}.template`

      const template = (seperated ? seperatedMetaGlob : metaGlob)
        .find(([key]) => key.endsWith(templatePath))![1] as string

      return template
        .replace(/{{ PROTOCOL }}/g, enableHTTPS ? 'https' : 'http')
        .replace(/{{ VERSION }}/g, selectedVersion)
        .replace(/{{ URL }}/g, import.meta.env.MIRROR_DOMAIN)
    }
    setTemplateText(constructTemplate())
  }, [selectedDistribution, selectedVersion, enableHTTPS])

  return (
    <Grid container spacing={2}>
      <Grid xs={12} sm={6}>
        <Autocomplete
          value={selectedDistribution}
          options={Object.keys(distributionsData)}
          disableClearable
          noOptionsText="No such distribution"
          onChange={(event, value) => { handleDistribution(value) }}
          getOptionLabel={(distribution) => distributionsData[distribution].name}
          renderInput={(params) => <TextField {...params} label="发行版" />}
        />
      </Grid>
      <Grid xs={7} sm={4}>
        <FormControl fullWidth>
          <InputLabel>版本</InputLabel>
          <Select
            label="版本"
            value={selectedVersion}
            MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
            onChange={(event) => { setSelectedVersion(event.target.value) }}
          >
            {allVersions.map((version) => (
              <MenuItem key={version} value={version}>{version}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={5} sm={2}>
        <FormControlLabel
          checked={enableHTTPS}
          onChange={(event, value) => { setEnableHTTPS(value) }}
          sx={{ marginTop: 1 }}
          control={<Checkbox />}
          label="HTTPS"
        />
      </Grid>
      {shouldShowDebSrcInfo &&
        <Grid xs={12}>
          <Alert variant="filled" severity="info">源码库默认被禁用以提高同步速度，您可以取消注释以启用之！</Alert>
        </Grid>
      }
      <Grid xs={12}>
        {/* Word break on mobile screen to enhance reading experience */}
        <Box
          sx={
            (theme) => ({
              [theme.breakpoints.down('lg')]: {
                code: {
                  whiteSpace: 'pre-wrap !important',
                  wordBreak: 'break-all'
                }
              }
            })
          }
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: parser.render('```\n' + templateText + '\n```') }}
        />
      </Grid>
    </Grid>
  )
}
