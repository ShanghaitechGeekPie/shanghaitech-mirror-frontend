import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MarkdownIt from 'markdown-it'
import prism from 'markdown-it-prism'
import pangu from 'markdown-it-pangu-ts'
import 'prismjs/components/prism-bash'
import '@/styles/markdown/prism.css'
import '@/styles/markdown/common.css'

const getHelpContent = (name: string) => {
  const parser = new MarkdownIt()
  parser.use(pangu).use(prism)
  const content = import.meta.glob('@/assets/content/help/*.md', { as: 'raw', eager: true })
  return parser.render(Object.entries(content).find(([key]) => key.includes(name))![1])
}

export default () => (
  <Container maxWidth="lg">
    <Card elevation={3} sx={{ px: { lg: 1 } }}>
      <CardContent
        className="markdown-body"
        sx={{ marginTop: 2 }}
        dangerouslySetInnerHTML={{ __html: getHelpContent((() => {
          const { name } = useParams<{ name: string }>()
          return name ? name : 'default'
        })()) }}
      />
    </Card>
  </Container>
)