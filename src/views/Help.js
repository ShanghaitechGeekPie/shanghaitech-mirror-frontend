import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MarkdownIt from 'markdown-it'
import pangu from 'markdown-it-pangu'
import prism from 'markdown-it-prism'
import 'prismjs/components/prism-bash'
import '@/styles/markdown/prism.css'
import '@/styles/markdown/common.css'

const getHelpContent = () => {
  let { name } = useParams()
  const parser = new MarkdownIt()
  parser.use(pangu).use(prism)
  return parser.render(require("@/assets/content/help/" + (name ? name : "default") + ".md"))
}

export default () => (
  <Container maxWidth="lg">
    <Card elevation={3} sx={{ px: { lg: 1 } }}>
      <CardContent className="markdown-body" sx={{ marginTop: 2 }} dangerouslySetInnerHTML={{ __html: getHelpContent() }} />
    </Card>
  </Container>
)