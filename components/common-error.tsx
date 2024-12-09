import { Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

export default function CommonError({
  message = 'Opps! There was an error.',
}: {
  message?: string
}) {
  return (
    <Stack gap={3} className="text-center">
      <Typography variant="h6">{message}</Typography>
      <Image
        src={'/not-found.svg'}
        alt="Not Found"
        className="h-auto max-w-[400px] rounded-lg opacity-80 saturate-50 filter"
        width={400}
        height={400}
      />
      <Typography
        component={Link}
        href="/"
        prefetch={true}
        className="rounded-lg bg-black px-4 py-2 duration-300 hover:bg-z-mauve-900"
      >
        Go back home
      </Typography>
    </Stack>
  )
}
