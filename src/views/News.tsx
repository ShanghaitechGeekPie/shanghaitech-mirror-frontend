import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Clock from 'mdi-material-ui/Clock'
import MarkdownIt from 'markdown-it'
import MarkdownItPrism from 'markdown-it-prism'
import 'prismjs/components/prism-bash'
import '@/styles/markdown/prism.css'
import '@/styles/markdown/common.css'
import _newsList from '@/assets/metadata/news.json'

interface NewsListProps { title: string, time: string }

const newsList: Record<string, NewsListProps> = _newsList

const parser = new MarkdownIt()
parser.use(MarkdownItPrism)

const markdownFiles = Object.entries(import.meta.glob(
  '@/contents/news/*.md',
  { query: '?raw', import: 'default', eager: true }
))

export default () => {
  const { id = '' } = useParams<{ id: string }>()
  const targetFileEntry = markdownFiles.find(([key]) => key.endsWith(`${id}.md`))!
  const renderedText = parser.render(targetFileEntry[1] as string)

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 3 }}
      >
        {newsList[id].title}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', marginBottom: 3 }}>
        <Clock fontSize="small" />
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', fontWeight: 'bold' }}
        >
          {newsList[id].time}
        </Typography>
      </Stack>
      <Card elevation={3} sx={{ px: { lg: 1 } }}>
        <CardContent
          className="markdown-body"
          sx={{ marginTop: 2 }}
          dangerouslySetInnerHTML={{ __html: renderedText }}
        />
      </Card>
    </Container>
  )
}
