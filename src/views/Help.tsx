import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MarkdownIt from 'markdown-it'
import MarkdownItPrism from 'markdown-it-prism'
import 'prismjs/components/prism-bash'
import '@/styles/markdown/prism.css'
import '@/styles/markdown/common.css'

const parser = new MarkdownIt()
parser.use(MarkdownItPrism)

const markdownFiles = Object.entries(import.meta.glob(
  '@/contents/help/*.md',
  { query: '?raw', import: 'default', eager: true }
))

export default () => {
  const targetFileKey = `${useParams<{ name: string }>().name ?? 'default'}.md`
  const targetFileEntry = markdownFiles.find(([key]) => key.endsWith(targetFileKey))!
  const renderedText = parser.render(targetFileEntry[1] as string)

  return (
    <Container maxWidth="lg">
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
