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
  const parser = new MarkdownIt()
  parser.use(pangu).use(prism)
  const name = useParams().name ? useParams().name : "default"
  const content = import.meta.glob('@/assets/content/help/*.md', { as: "raw", eager: true })
  for (const item in content) if (item.includes(name)) return parser.render(content[item])
}

export default () => (
  <Container maxWidth="lg">
    <Card elevation={3} sx={{ px: { lg: 1 } }}>
      <CardContent className="markdown-body" sx={{ marginTop: 2 }} dangerouslySetInnerHTML={{ __html: getHelpContent() }} />
    </Card>
  </Container>
)