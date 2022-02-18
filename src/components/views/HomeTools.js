import { useState, forwardRef } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Divider from '@mui/material/Divider'
import Slide from '@mui/material/Slide'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import LinkIcon from '@mui/icons-material/Link'
import CodeIcon from '@mui/icons-material/Code'
import QuickDownload from '@/components/views/QuickDownload'
import ConfigurationGenerator from '@/components/views/ConfigurationGenerator'

const tools = [
  { "title": "获取下载链接", "component": <QuickDownload />, "icon": <LinkIcon /> },
  { "title": "生成配置文件", "component": <ConfigurationGenerator />, "icon": <CodeIcon /> }
]

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

export default () => {
  const isMobileScreen = useMediaQuery(useTheme().breakpoints.down('lg'))
  const [dialogData, setDialogData] = useState({})
  const [openDialog, setOpenDialog] = useState(false)
  const handleCloseDialog = () => setOpenDialog(false)
  const handleOpenDialog = (title, component) => () => {
    setDialogData({ "title": title, "component": component })
    setOpenDialog(true)
  }

  return (
    <Card elevation={3}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Tools</Typography>
      </CardContent>
      <List component="div">
        {tools.map((item) => (
          <Box key={item.title}>
            <Divider />
            <ListItemButton component="div" onClick={handleOpenDialog(item.title, item.component)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText variant="button" primary={item.title} disableTypography />
            </ListItemButton>
          </Box>
        ))}
      </List>
      <Dialog
        open={openDialog}
        fullWidth
        maxWidth="md"
        fullScreen={isMobileScreen}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        PaperProps={{ elevation: 2 }}
      >
        {isMobileScreen ?
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                onClick={handleCloseDialog}
                sx={{ marginRight: 2 }}
              >
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
              {dialogData.title}
            </Toolbar>
          </AppBar> :
          <DialogTitle sx={{ paddingBottom: isMobileScreen ? 1 : 2, paddingX: isMobileScreen ? 2 : 3 }}>
            {dialogData.title}
          </DialogTitle>
        }
        <DialogContent dividers sx={{ paddingTop: 3 }}>{dialogData.component}</DialogContent>
      </Dialog>
    </Card>
  )
}