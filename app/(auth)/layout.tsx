import { Box } from '@mui/material'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box className="flex h-screen items-center justify-center">{children}</Box>
  )
}
