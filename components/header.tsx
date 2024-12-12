'use client'

import { MouseEvent, useContext, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Container,
  Button,
  Box,
  Tooltip,
} from '@mui/material'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import MenuIcon from '@mui/icons-material/Menu'

import { AuthContext } from '@/context/auth-context'
import { publicRoutes, privateRoutes } from '@/constants/routes'
import logout from '@/actions/auth/logout'
import { cn, sliceEmail } from '@/lib/utils'
import { User } from '@/types'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, currentUser } = useContext(AuthContext)
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const pages = isAuthenticated && currentUser ? privateRoutes : publicRoutes

  return (
    <AppBar
      position="static"
      className={cn('h-[80px]', pathname === '/' ? 'mb-0' : 'mb-6')}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters className="h-[80px] max-sm:px-0 md:px-4">
          <ShoppingBasketIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Image
              src="/logo.svg"
              alt="ZENtro Logo"
              width={524}
              height={143}
              priority
              className="h-[24px] w-auto"
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => {
                    router.push(page.path)
                    handleCloseNavMenu()
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ShoppingBasketIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Image
              src="/logo.svg"
              alt="ZENtro Logo"
              width={524}
              height={143}
              className="h-[24px] w-auto"
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => {
                  router.push(page.path)
                  handleCloseNavMenu()
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {isAuthenticated && currentUser ? (
            <Settings user={currentUser} />
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const Settings = ({ user }: { user: User }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Box className="flex w-fit items-center justify-center max-xs:flex-col">
      <Tooltip title="Profile settings">
        <Button
          onClick={handleOpenUserMenu}
          className="flex w-fit flex-wrap gap-1 rounded !p-2"
        >
          <p className="lowercase text-white/50 max-sm:text-xs">
            {sliceEmail(user.email)}
          </p>
          <Image
            alt="Profile"
            width={40}
            height={40}
            className="size-7 max-xs:size-5"
            src="/favicon.ico"
          />
        </Button>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          onClick={() => {
            handleCloseUserMenu()
            logout().then(() => {})
          }}
        >
          <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}
