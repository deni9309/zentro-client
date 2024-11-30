import { Button, Link, Stack, TextField } from '@mui/material'
import NextLink from 'next/link'

export default function SignUp() {
  return (
    <Stack spacing={2} className='w-full lg:max-w-sm max-w-xs'>
      <h1 className='text-2xl text-center pb-6'>
        Create your <span className='font-bold text-z-green-500'>ZENtro</span> account
      </h1>
      <TextField label='Email' name='email' variant='outlined' type='email' />
      <TextField label='Password' name='password' variant='outlined' type='password' />
      <Button color='secondary' variant='contained'>
        Sign Up
      </Button>
      <Link component={NextLink} href='/signin' className='self-center underline-offset-2'>
        Already have an account? <span className='font-bold'>Login</span>
      </Link>
    </Stack>
  )
}
