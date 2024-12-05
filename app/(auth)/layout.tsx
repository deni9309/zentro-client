import { Box, Container } from '@mui/material'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      <Box className="flex h-screen items-center justify-center">
        {children}
      </Box>
    </Container>
  )
}
