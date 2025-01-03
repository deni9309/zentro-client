'use client'

import { Button, Link, Stack, TextField } from '@mui/material'
import NextLink from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

import { login } from '@/actions/auth/login'
import { AuthFormData, AuthFormSchema } from '@/schema/auth-form.schema'
import { cn } from '@/lib/utils'

const SignIn = () => {
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
      const result = await login(values)

      if ('error' in result) {
        setHasError(result.error)
        setIsSubmitting(false)
        return
      }

      form.reset()
      setIsSubmitting(false)
    } catch (_) {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack spacing={2} className="w-full max-w-xs lg:max-w-sm">
        <h1 className="pb-6 text-center text-2xl">
          Login to your <span className="font-bold text-z-green-500">ZEN</span>
          tro account
        </h1>
        {hasError && (
          <p
            className={cn(
              'collapse -translate-y-[50%] rounded bg-z-mauve-900 p-4 text-red-200 opacity-0 ease-in-out',
              hasError && 'visible translate-y-0 opacity-100 duration-700',
            )}
          >
            <span className="font-bold text-red-400">! </span>
            {hasError}
          </p>
        )}
        <Controller
          name="email"
          defaultValue=""
          control={form.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              error={!!error || hasError !== null}
              value={value}
              onChange={onChange}
              helperText={error ? 'Please enter a valid email' : null}
            />
          )}
        />
        <Controller
          name="password"
          defaultValue=""
          control={form.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              error={!!error || hasError !== null}
              value={value}
              onChange={onChange}
              helperText={error ? 'Please enter a valid password' : null}
            />
          )}
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Login
        </Button>
        <Link
          component={NextLink}
          color="textSecondary"
          href="/signup"
          className="self-center underline-offset-2"
        >
          Don&apos;t have an account? <span className="font-bold">Sign up</span>
        </Link>
      </Stack>
    </form>
  )
}

export default SignIn
