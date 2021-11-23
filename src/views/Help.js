import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListSubheader from '@mui/material/ListSubheader'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MarkdownIt from "markdown-it"
import prism from "markdown-it-prism"
import "prismjs/components/prism-bash"
import "@/styles/prism.css"
import "@/styles/markdown.css"

function getHelpData() {
  const data = {
    "list": {
      "system": [],
      "software": []
    },
    "content": null
  }
  const parser = new MarkdownIt()
  const help = require("@/assets/help.json")
  let { id } = useParams()
  for (let key in help) {
    data.list[help[key].type].push(key)
  }
  parser.use(prism)
  data.content = parser.render(require("@/assets/help/" + (id ? id : "default") + ".md"))
  return data
}

export default () => {
  const [open, setOpen] = useState(false)
  const data = getHelpData()
  const toggleDrawer = (status) => () => setOpen(status)
  return (
    <Container maxWidth="lg">
      <Button variant="contained" sx={{ mb: 6 }} onClick={toggleDrawer(true)}>open</Button>
      <Card elevation={3}>
        <CardContent className="markdown-body" dangerouslySetInnerHTML={{ __html: data.content }} />
      </Card>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        ModalProps={{ keepMounted: true }}>
        <List sx={{ width: "17.5rem", pt: 0 }} onClick={toggleDrawer(false)}>
          <ListSubheader>System</ListSubheader>
          {data.list.system.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton to={'/help/' + item} component={Link}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider component="li" />
          <ListSubheader>Software</ListSubheader>
          {data.list.software.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton to={'/help/' + item} component={Link}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </Container>
  )
}