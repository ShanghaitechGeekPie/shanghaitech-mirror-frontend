import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Clock } from 'mdi-material-ui'
import MarkdownIt from 'markdown-it'
import pangu from 'markdown-it-pangu'
import prism from 'markdown-it-prism'
import 'prismjs/components/prism-bash'
import '@/styles/markdown/prism.css'
import '@/styles/markdown/common.css'
import newsList from '@/assets/config/news.json'

const getPostContent = (id) => {
  const parser = new MarkdownIt()
  parser.use(pangu).use(prism)
  const content = import.meta.glob('@/assets/content/news/*.md', { as: "raw", eager: true })
  for (const item in content) if (item.includes(id)) return parser.render(content[item])
}

export default () => {
  const { id } = useParams()

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 3 }}
      >
        {newsList[id].title}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "center", marginBottom: 3 }}>
        <Clock fontSize="small" />
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', fontWeight: 'bold' }}
        >
          {newsList[id].time}
        </Typography>
      </Stack>
      <Card elevation={3} sx={{ px: { lg: 1 } }}>
        <CardContent className="markdown-body" sx={{ marginTop: 2 }} dangerouslySetInnerHTML={{ __html: getPostContent(id) }} />
      </Card>
    </Container>
  )
}