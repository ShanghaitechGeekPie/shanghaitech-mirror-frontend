import { FC, SVGProps } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'
import ShanghaiTechLogo from '@/assets/image/logo/shanghaitech.svg?raw'
import GeekpieLogo from '@/assets/image/logo/geekpie.svg?raw'
import Github from '@/assets/image/icons/github.svg?react'
import Telegram from '@/assets/image/icons/telegram.svg?react'
import LinkVariant from 'mdi-material-ui/LinkVariant'
import Email from 'mdi-material-ui/Email'
import MarkdownIt from 'markdown-it'
import MarkdownItPrism from 'markdown-it-prism'
import AboutContent from '@/contents/about.md?raw'
import '@/styles/markdown/prism.css'
import '@/styles/markdown/common.css'

const getAboutContent = () => {
  const parser = new MarkdownIt({ html: true })
  parser.use(MarkdownItPrism)
  return parser.render(AboutContent)
}

interface BrandIconProps extends Omit<SvgIconProps, 'component'> {
  component: FC<SVGProps<SVGSVGElement>>
}

const BrandIcon = ({ component, ...props }: BrandIconProps) => (
  <SvgIcon
    component={component}
    sx={{ boxSizing: 'content-box', paddingLeft: '4px', fontSize: '1.1rem' }}
    {...props}
  />
)

interface ChipGridItemProps {
  label: string,
  href: string,
  icon: JSX.Element
}

const ChipGridItem = ({ label, icon, href }: ChipGridItemProps) => (
  <Chip
    component={Link}
    href={href}
    underline="none"
    rel="noopener"
    target="_blank"
    clickable
    variant="outlined"
    color="primary"
    icon={icon}
    label={label}
  />
)

export default () => (
  <Container maxWidth="lg">
    <Grid container alignItems="flex" spacing={4}>
      <Grid xs={12} md={4}>
        <Card elevation={3} sx={{ marginBottom: 4 }}>
          <CardMedia component="img" image={`data:image/svg+xml;utf8,${ShanghaiTechLogo}`} />
          <Divider sx={{ marginBottom: 1 }} />
          <CardContent>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <ChipGridItem
                label="ShanghaiTech IT Services"
                icon={<LinkVariant sx={{ paddingLeft: '5px' }} />}
                href="https://it.shanghaitech.edu.cn"
              />
            </Stack>
          </CardContent>
        </Card>
        <Card elevation={3}>
          <CardMedia component="img" image={`data:image/svg+xml;utf8,${GeekpieLogo}`} />
          <Divider sx={{ marginBottom: 1 }} />
          <CardContent>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <ChipGridItem
                label="Email"
                href="mailto:pie@geekpie.club"
                icon={<Email sx={{ paddingLeft: '5px' }} />}
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
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={8}>
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
