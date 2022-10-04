import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import List from "@mui/material/List"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import { EmoticonOutline, ThumbDownOutline } from "mdi-material-ui"
import newsList from "@/assets/config/news.json"
import * as React from 'react'

const icons = {
  smile: <EmoticonOutline color="secondary" />,
  downtime: <ThumbDownOutline color="error" />
}

export default () => (
  <Card elevation={3}>
    <CardContent sx={{ paddingBottom: 0 }}>
      <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>News</Typography>
    </CardContent>
    <List component="div">
      {Object.entries(newsList).map(([key, value]) => (
        <Box key={value.title}>
          <Divider />
          <ListItemButton to={"/news/" + key} component={Link}>
            <ListItemIcon>{icons[value.icon]}</ListItemIcon>
            <ListItemText variant="button" primary={value.title} disableTypography />
          </ListItemButton>
        </Box>
      ))}
    </List>
  </Card>
)
