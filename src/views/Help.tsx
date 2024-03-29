import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MarkdownIt from 'markdown-it'
import MarkdownItPrism from 'markdown-it-prism'
import 'prismjs/components/prism-bash'
import '@/styles/markdown/prism.css'
import '@/styles/markdown/common.css'

const getHelpContent = (name: string) => {
  const parser = new MarkdownIt()
  parser.use(MarkdownItPrism)
  const content = import.meta.glob('../contents/help/*.md', { as: 'raw', eager: true })
  return parser.render(Object.entries(content).find(([key]) => key.endsWith(`${name}.md`))![1])
}

export default () => (
  <Container maxWidth="lg">
    <Card elevation={3} sx={{ px: { lg: 1 } }}>
      <CardContent
        className="markdown-body"
        sx={{ marginTop: 2 }}
        dangerouslySetInnerHTML={{ __html: getHelpContent(useParams<{ name: string }>().name ?? 'default') }}
      />
    </Card>
  </Container>
)
