import { Button, Link, Stack, TextField } from '@mui/material'
import NextLink from 'next/link'

const SignIn = () => {
  return (
    <Stack spacing={2} className='w-full lg:max-w-sm max-w-xs'>
      <h1 className='text-2xl text-center pb-6'>
        Login to your <span className='font-bold text-z-green-500'>ZENtro</span> account
      </h1>
      <TextField label='Email' name='email' variant='outlined' type='email' />
      <TextField label='Password' name='password' variant='outlined' type='password' />
      <Button color='secondary' variant='contained'>
        Login
      </Button>
      <Link component={NextLink} href='/signup' className='self-center underline-offset-2'>
        Don&apos;t have an account? <span className='font-bold'>Sign up</span>
      </Link>
    </Stack>
  )
}

export default SignIn
