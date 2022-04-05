import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import SvgIcon from '@mui/material/SvgIcon'
import ShanghaiTechLogo from '@/assets/image/logo/shanghaitech.svg'
import GeekpieLogo from '@/assets/image/logo/geekpie.svg'
import { ReactComponent as QQIcon } from '@/assets/image/icons/qq.svg'
import { ReactComponent as LinkIcon } from '@/assets/image/icons/link.svg'
import { ReactComponent as EnvelopeIcon } from '@/assets/image/icons/envelope.svg'
import { ReactComponent as GithubIcon } from '@/assets/image/icons/github.svg'
import { ReactComponent as TelegramIcon } from '@/assets/image/icons/telegram.svg'
import MarkdownIt from 'markdown-it'
import pangu from 'markdown-it-pangu'
import prism from 'markdown-it-prism'
import '@/styles/markdown/prism.css'
import '@/styles/markdown/common.css'

const getAboutContent = () => {
  const parser = new MarkdownIt()
  parser.use(pangu).use(prism)
  return parser.render(require("@/assets/content/about.md"))
}

const FontAwesomeIcon = styled(SvgIcon)({
  boxSizing: 'content-box',
  padding: 3,
  fontSize: '1.125rem',
})

const ChipGridItem = ({ label, icon, href, viewBox }) => (
  <Grid item component={Link} href={href} underline="none" rel="noopener" target="_blank">
    <Chip clickable variant="outlined" color="primary" icon={<FontAwesomeIcon component={icon} viewBox={viewBox} />} label={label} />
  </Grid>
)

export default () => {
  return (
    <Container maxWidth="lg">
      <Grid container alignItems="flex" spacing={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ marginBottom: 4 }}>
            <CardMedia component="img" image={ShanghaiTechLogo} />
            <Divider sx={{ marginBottom: 1 }} />
            <CardContent>
              <Grid container spacing={1}>
                <ChipGridItem
                  icon={LinkIcon}
                  viewBox="0 0 640 512"
                  label="ShanghaiTech IT Services"
                  href="https://it.shanghaitech.edu.cn"
                />
              </Grid>
            </CardContent>
          </Card>
          <Card elevation={3}>
            <CardMedia component="img" image={GeekpieLogo} />
            <Divider sx={{ marginBottom: 1 }} />
            <CardContent>
              <Grid container spacing={1}>
                <ChipGridItem label="Email" icon={EnvelopeIcon} href="mailto:pie@geekpie.club" viewBox="0 0 512 512" />
                <ChipGridItem label="Github" icon={GithubIcon} href="https://github.com/orgs/ShanghaitechGeekPie" viewBox="0 0 496 512" />
                <ChipGridItem label="Telegram" icon={TelegramIcon} href="https://t.me/GeekPie_mirrors" viewBox="0 0 496 512" />
                <ChipGridItem label="QQ" icon={QQIcon} href="https://jq.qq.com/?k=UjYsRHCR" viewBox="0 0 448 512" />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent className="markdown-body" sx={{ marginTop: 2 }} dangerouslySetInnerHTML={{ __html: getAboutContent() }} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}