import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import MarkdownIt from "markdown-it"
import prism from "markdown-it-prism"
import "prismjs/components/prism-bash"
import "@/styles/prism.css"
import "@/styles/markdown.css"

export default () => {
  const { id } = useParams()
  const news = require("@/assets/news.json")
  const parser = new MarkdownIt()
  parser.use(prism)
  const content = parser.render(require("@/assets/news/" + id + ".md"))

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }} gutterBottom>{ news[id].title }</Typography>
      <Card elevation={3} sx={{ px: { lg: 1 } }}>
        <CardContent className="markdown-body" dangerouslySetInnerHTML={{__html: content}} />
      </Card>
    </Container>
  )
}