import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import MarkdownIt from "markdown-it"
import Prism from "markdown-it-prism"
import "prismjs/components/prism-bash"
import "../../styles/prism.css"
import "../../styles/markdown.css"

export default () => (
  <Box sx={{ mt: 4, mb: 6 }}>
    <Card elevation={3}>
      <CardContent sx={{ pb: 0 }}>
        <Typography component="div" variant="h6" gutterBottom>News</Typography>
      </CardContent>
      <List>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Inbox" />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Inbox" />
        </ListItem>
      </List>
    </Card>
  </Box>
)