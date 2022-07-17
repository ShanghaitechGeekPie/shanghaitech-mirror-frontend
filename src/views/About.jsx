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
import ShanghaiTechLogo from '@/assets/image/logo/shanghaitech.svg?raw'
import GeekpieLogo from '@/assets/image/logo/geekpie.svg?raw'
import QQChat from '@/assets/image/icons/qqchat.svg?component'
import Github from '@/assets/image/icons/github.svg?component'
import Telegram from '@/assets/image/icons/telegram.svg?component'
import { LinkVariant, Email } from 'mdi-material-ui'
import MarkdownIt from 'markdown-it'
import pangu from 'markdown-it-pangu'
import prism from 'markdown-it-prism'
import '@/styles/markdown/prism.css'
import '@/styles/markdown/common.css'
import AboutContent from '@/assets/content/about.md?raw'

const getAboutContent = () => {
  const parser = new MarkdownIt()
  parser.use(pangu).use(prism)
  return parser.render(AboutContent)
}

const BrandIcon = styled(SvgIcon)({
  boxSizing: 'content-box',
  paddingLeft: 5,
  fontSize: '1rem',
})

const ChipGridItem = ({ label, icon, href }) => (
  <Grid item component={Link} href={href} underline="none" rel="noopener" target="_blank">
    <Chip clickable variant="outlined" color="primary" icon={icon} label={label} />
  </Grid>
)

export default () => (
  <Container maxWidth="lg">
    <Grid container alignItems="flex" spacing={4}>
      <Grid item xs={12} md={4}>
        <Card elevation={3} sx={{ marginBottom: 4 }}>
          <CardMedia component="img" image={`data:image/svg+xml;utf8,${ShanghaiTechLogo}`} />
          <Divider sx={{ marginBottom: 1 }} />
          <CardContent>
            <Grid container spacing={1}>
              <ChipGridItem
                label="ShanghaiTech IT Services"
                icon={<LinkVariant sx={{ paddingLeft: "5px" }} />}
                href="https://it.shanghaitech.edu.cn"
              />
            </Grid>
          </CardContent>
        </Card>
        <Card elevation={3}>
          <CardMedia component="img" image={`data:image/svg+xml;utf8,${GeekpieLogo}`} />
          <Divider sx={{ marginBottom: 1 }} />
          <CardContent>
            <Grid container spacing={1}>
              <ChipGridItem
                label="Email"
                href="mailto:pie@geekpie.club"
                icon={<Email sx={{ paddingLeft: "5px" }} />}
              />
              <ChipGridItem
                label="Github"
                href="https://github.com/orgs/ShanghaitechGeekPie"
                icon={<BrandIcon component={Github} viewBox="0 0 496 512" />}
              />
              <ChipGridItem
                label="Telegram"
                href="https://t.me/GeekPie_mirrors"
                icon={<BrandIcon component={Telegram} viewBox="0 0 496 512" />}
              />
              <ChipGridItem
                label="QQ"
                href="https://jq.qq.com/?k=UjYsRHCR"
                icon={<BrandIcon component={QQChat} viewBox="0 0 448 512" />}
              />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card elevation={3} sx={{ px: { lg: 1 } }}>
          <CardContent
            className="markdown-body"
            sx={{ marginTop: 2 }}
            dangerouslySetInnerHTML={{ __html: getAboutContent() }}
          />
        </Card>
      </Grid>
    </Grid>
  </Container>
)