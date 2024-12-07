import { Box, Container } from '@mui/material'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container className="flex h-full min-h-[80vh] w-full flex-col items-center justify-center">
      <Box>{children}</Box>
    </Container>
  )
}
