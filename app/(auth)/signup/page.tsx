'use client'

import { Button, Link, Stack, TextField } from '@mui/material'
import NextLink from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import createUser from '@/actions/create-user'
import { AuthFormData, AuthFormSchema } from '@/schema/auth-form.schema'
import { cn } from '@/lib/utils'

export default function SignUp() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasError, setHasError] = useState<string | null>(null)

  const form = useForm<AuthFormData>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: AuthFormData) => {
    setIsSubmitting(true)
    setHasError(null)
    try {
      const result = await createUser(values)

      if ('error' in result) {
        setHasError(result.error)
        return
      }

      form.reset()
      router.push('/')
    } catch (_) {
      setHasError('An error occured')
    }
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack spacing={2} className='w-full lg:max-w-sm max-w-xs'>
        <h1 className='text-2xl text-center pb-6'>
          Create your <span className='font-bold text-z-green-500'>ZENtro</span> account
        </h1>
        <p
          className={cn(
            'collapse -translate-y-[50%] ease-in-out opacity-0 text-red-200 p-4 rounded bg-z-mauve-900',
            hasError && 'duration-700 translate-y-0 visible opacity-100',
            !hasError && 'hidden'
          )}
        >
          ! {hasError}gbbtt
        </p>
        <Controller
          name='email'
          control={form.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='Email'
              variant='outlined'
              type='email'
              error={!!error}
              value={value}
              onChange={onChange}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name='password'
          control={form.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='Password'
              variant='outlined'
              type='password'
              error={!!error}
              value={value}
              onChange={onChange}
              helperText={error ? error.message : null}
            />
          )}
        />

        <Button disabled={isSubmitting} type='submit' color='secondary' variant='contained'>
          Sign Up
        </Button>
        <Link
          component={NextLink}
          color='textSecondary'
          href='/signin'
          className='self-center underline-offset-2'
        >
          Already have an account? <span className='font-bold'>Login</span>
        </Link>
      </Stack>
    </form>
  )
}
