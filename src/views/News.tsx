import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Clock from 'mdi-material-ui/Clock'
import MarkdownIt from 'markdown-it'
import MarkdownItMeta from 'markdown-it-meta'
import MarkdownItPrism from 'markdown-it-prism'
import 'prismjs/components/prism-bash'
import '@/styles/markdown/prism.css'
import '@/styles/markdown/common.css'
import newsList from '@/assets/metadata/news.json'
import { Divider } from '@mui/material'

const parser = new MarkdownIt()
parser.use(MarkdownItMeta)
parser.use(MarkdownItPrism)

const markdownFiles = Object.entries(import.meta.glob(
  '@/contents/news/*.md',
  { query: '?raw', import: 'default', eager: true }
))

const News = ({ id }: { id: string }) => {
  const newsData = newsList.find((news) => news.id === id)!
  const targetFileEntry = markdownFiles.find(([key]) => key.endsWith(`${id}.md`))!
  const renderedText = parser.render(targetFileEntry[1] as string)

  return (
    <Paper
      variant="outlined"
      sx={{
        px: { lg: 4, xs: 2 },
        py: 2,
        backgroundColor: 'transparent'
      }}
    >
      <Typography
        className="markdown-body"
        sx={{ marginTop: 2 }}
        dangerouslySetInnerHTML={{ __html: renderedText }}
      />
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" spacing={2} alignItems="center">
        <Clock sx={{ fontSize: 16 }} />
        <Typography
          variant="overline"
          sx={{ fontWeight: 'bold' }}
        >
          {newsData.date.split('T')[0]}
        </Typography>
      </Stack>
    </Paper>
  )
}

export default () => {
  return (
    <Container maxWidth="md">
      <Stack spacing={2}>
        {newsList.map((news) => (
          <News key={news.id} id={news.id} />
        ))}
      </Stack>
    </Container >
  )
}
