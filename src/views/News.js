import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import MarkdownIt from 'markdown-it'
import pangu from 'markdown-it-pangu'
import prism from 'markdown-it-prism'
import 'prismjs/components/prism-bash'
import '@/styles/markdown/prism.css'
import '@/styles/markdown/common.css'

const getPostContent = (id) => {
  const parser = new MarkdownIt()
  parser.use(pangu).use(prism)
  return parser.render(require("@/assets/content/news/" + id + ".md"))
}

export default () => {
  const { id } = useParams()
  const news = require("@/assets/config/news.json")

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 3 }}
      >
        {news[id].title}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "center", marginBottom: 3 }}>
        <AccessTimeFilledIcon fontSize="small" />
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', fontWeight: 'bold' }}
        >
          {news[id].time}
        </Typography>
      </Stack>
      <Card elevation={3} sx={{ px: { lg: 1 } }}>
        <CardContent className="markdown-body" dangerouslySetInnerHTML={{ __html: getPostContent(id) }} />
      </Card>
    </Container>
  )
}