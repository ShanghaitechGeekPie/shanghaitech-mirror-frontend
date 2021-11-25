import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MarkdownIt from "markdown-it"
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
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
  const [openSystem, setOpenSysyem] = useState(true)
  const [openSoftware, setopenSoftware] = useState(true)
  const toggleDrawer = (status) => () => setOpen(status)
  const doOpenSystem = () => setOpenSysyem(!openSystem)
  const doOpenSoftware = () => setopenSoftware(!openSoftware)
  const data = getHelpData()
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
        <List component="div" sx={{ width: "17.5rem", pt: 0 }}>
          <ListItemButton onClick={doOpenSystem}>
            <ListItemText primary="System" />
            {openSystem ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSystem} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {data.list.system.map((item) => (
                <ListItem component="div" key={item} onClick={toggleDrawer(false)} disablePadding>
                  <ListItemButton to={'/help/' + item} component={Link}>
                    <ListItemText inset primary={item} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider component="li" />
          <ListItemButton onClick={doOpenSoftware}>
            <ListItemText primary="Software" />
            {openSoftware ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSoftware} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {data.list.software.map((item) => (
                <ListItem component="div" key={item} onClick={toggleDrawer(false)} disablePadding>
                  <ListItemButton to={'/help/' + item} component={Link}>
                    <ListItemText inset primary={item} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </SwipeableDrawer>
    </Container>
  )
}