import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
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

const WordBreakWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    '.markdown-body code': {
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      overflow: 'hidden'
    }
  }
}))

const distributionsData: DistributionsData = _distributionsData

const replaceVariables = (template: string, version: string, https: boolean) => {
  let result = template.replace(/{{ PROTOCOL }}/g, https ? 'https' : 'http')
  result = result.replace(/{{ VERSION }}/g, version)
  result = result.replace(/{{ URL }}/g, import.meta.env.MIRROR_DOMAIN)
  return result
}

const getTemplate = (distribution: string, version: string, https: boolean) => {
  const isSeperated = distributionsData[distribution].seperated
  const templatePath = isSeperated ? `${distribution}/${version}.template` : `${distribution}.template`
  const metaGlob = import.meta.glob('../../contents/repository/*.template', { as: 'raw', eager: true })
  const seperatedMetaGlob = import.meta.glob('../../contents/repository/*/*.template', { as: 'raw', eager: true })
  const content = isSeperated ? seperatedMetaGlob : metaGlob

  const template = Object.entries(content).find(([key]) => key.endsWith(templatePath))![1]
  return replaceVariables(template, version, https)
}

const parseMarkdown = (resultText: string) => {
  const parser = new MarkdownIt()
  parser.use(MarkdownItPrism)
  return parser.render('```\n' + resultText + '\n```')
}

interface DistributionsData {
  [key: string]: DistributionInfo
}

interface DistributionInfo {
  name: string
  seperated: boolean,
  versions: string[],
}

export default () => {
  const [selectedDistribution, setSelectedDistribution] = useState('archlinux')
  const [allVersions, setAllVersions] = useState(['rolling'])
  const [selectedVersion, setSelectedVersion] = useState('rolling')
  const [enableHTTPS, setEnableHTTPS] = useState(true)
  const [resultText, setResultText] = useState('')

  const handleDistribution = (distribution: string) => {
    setSelectedDistribution(distribution)
    setAllVersions(distributionsData[distribution].versions)
    setSelectedVersion(distributionsData[distribution].versions[0])
  }

  const shouldShowDebSrcInfo = ['debian', 'kali', 'ubuntu'].includes(selectedDistribution)

  useEffect(() => {
    setResultText(getTemplate(selectedDistribution, selectedVersion, enableHTTPS))
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
        <WordBreakWrapper>
          <Box className="markdown-body" dangerouslySetInnerHTML={{ __html: parseMarkdown(resultText) }} />
        </WordBreakWrapper>
      </Grid>
    </Grid>
  )
}
