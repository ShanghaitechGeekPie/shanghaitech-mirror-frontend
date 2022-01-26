import { useState } from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Divider from '@mui/material/Divider'
import LinkIcon from '@mui/icons-material/Link'
import CodeIcon from '@mui/icons-material/Code'
import QuickDownload from '@/components/views/QuickDownload'
import ConfigurationGenerator from '@/components/views/ConfigurationGenerator'

const tools = [
  {"title": "获取下载链接", "component": <QuickDownload />, "icon": <LinkIcon />},
  {"title": "生成配置文件", "component": <ConfigurationGenerator />, "icon": <CodeIcon />}
]

export default () => {
  const [dialogData, setDialogData] = useState({})
  const [openDialog, setOpenDialog] = useState(false)
  const handleCloseDialog = () => setOpenDialog(false)
  const handleOpenDialog = (title, component) => () => {
    setDialogData({"title": title, "component": component})
    setOpenDialog(true)
  }

  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <CardContent sx={{ pb: 0 }}>
        <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Tools</Typography>
      </CardContent>
      <List component="div" sx={{ pb: 0 }}>
        {tools.map((item) => (
          <Box key={item.title}>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton onClick={handleOpenDialog(item.title, item.component)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          </Box>
        ))}
      </List>
      <Dialog open={openDialog} onClose={handleCloseDialog} scroll="paper" maxWidth="md" fullWidth>
        <DialogTitle>{dialogData.title}</DialogTitle>
        <DialogContent dividers>{dialogData.component}</DialogContent>
      </Dialog>
    </Card>
  )
}