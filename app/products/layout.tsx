import { Box, Container } from '@mui/material'

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container className="mt-10" sx={{ sm: { px: 1 } }}>
      <Box className="flex items-center justify-center">{children}</Box>
    </Container>
  )
}
