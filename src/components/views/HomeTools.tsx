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
import { TransitionProps } from '@mui/material/transitions'
import Close from 'mdi-material-ui/Close'
import Link from 'mdi-material-ui/Link'
import CodeTags from 'mdi-material-ui/CodeTags'
import QuickDownload from '@/components/views/QuickDownload'
import ConfigurationGenerator from '@/components/views/ConfigurationGenerator'

const tools = [
  { title: '获取下载链接', component: <QuickDownload />, icon: <Link /> },
  { title: '生成配置文件', component: <ConfigurationGenerator />, icon: <CodeTags /> }
]

const Transition = forwardRef((
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) => <Slide direction="up" ref={ref} {...props} />)

interface DialogData {
  title?: string
  component?: JSX.Element
}

export default () => {
  const isMobileScreen = useMediaQuery(useTheme().breakpoints.down('md'))
  const [dialogData, setDialogData] = useState<DialogData>({})
  const [openDialog, setOpenDialog] = useState(false)
  const handleCloseDialog = () => setOpenDialog(false)
  const handleOpenDialog = (title: string, component: JSX.Element) => () => {
    setDialogData({ title: title, component: component })
    setOpenDialog(true)
  }

  return (
    <Card elevation={3}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography
          component="div"
          variant="h6"
          sx={{ fontWeight: 'bold' }}
          gutterBottom
        >
          Tools
        </Typography>
      </CardContent>
      <List component="div">
        {tools.map((item) => (
          <Box key={item.title}>
            <Divider />
            <ListItemButton
              component="div"
              onClick={handleOpenDialog(item.title, item.component)}
            >
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
        {isMobileScreen ? (
          <AppBar color="inherit" sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton onClick={handleCloseDialog} sx={{ marginRight: 2 }}>
                <Close />
              </IconButton>
              {dialogData.title}
            </Toolbar>
          </AppBar>
        ) : (
          <DialogTitle sx={{ paddingBottom: 2, paddingX: 3 }}>{dialogData.title}</DialogTitle>
        )}
        <DialogContent
          dividers
          sx={{ paddingTop: 3, borderBottom: 0 }}
        >
          {dialogData.component}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
