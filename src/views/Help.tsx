import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
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

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={3}
        className="markdown-body"
        sx={{ px: 3, pt: 3, pb: 1 }}
        dangerouslySetInnerHTML={{ __html: parser.render(targetFileEntry[1] as string) }}
      />
    </Container>
  )
}
