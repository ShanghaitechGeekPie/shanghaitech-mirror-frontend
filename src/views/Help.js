import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MarkdownIt from "markdown-it"
import prism from "markdown-it-prism"
import "prismjs/components/prism-bash"
import "@/styles/prism.css"
import "@/styles/markdown.css"

const getHelpContent = () => {
  const parser = new MarkdownIt()
  let { id } = useParams()
  parser.use(prism)
  return parser.render(require("@/assets/help/" + (id ? id : "default") + ".md"))
}

export default () => {
  const data = getHelpContent()

  return (
    <Container maxWidth="lg">
      <Card elevation={3} sx={{ px: { lg: 1 } }}>
        <CardContent className="markdown-body" dangerouslySetInnerHTML={{ __html: data }} />
      </Card>
    </Container>
  )
}