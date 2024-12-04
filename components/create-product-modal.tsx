'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Modal,
  Stack,
  TextareaAutosize,
  TextField,
} from '@mui/material'

import { CreateProductProps } from '@/types'
import {
  ProductFormData,
  ProductFormSchema,
} from '@/schema/product-form.schema'
import { cn } from '@/lib/utils'
import createProduct from '@/actions/product/create-product'

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

interface CreateProductModalProps {
  product?: CreateProductProps
  open: boolean
  handleClose: () => void
}

export default function CreateProductModal({
  open,
  handleClose,
}: CreateProductModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasError, setHasError] = useState<string | null>(null)

  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0.1,
    },
  })

  const onSubmit = async (values: ProductFormData) => {
    setIsSubmitting(true)
    setHasError(null)
    try {
      const result = await createProduct(values)

      if ('error' in result) {
        setHasError(result.error)
        setIsSubmitting(false)
        return
      }

      form.reset()
      setIsSubmitting(false)
    } catch (_) {
      setHasError('An error occured')
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={(_e, reason) => {
        if (reason && reason === 'backdropClick') return
        handleClose()
      }}
    >
      <Box sx={styles}>
        <div
          className="absolute right-8 top-7 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs duration-300 hover:cursor-pointer hover:bg-z-mauve-900"
          onClick={handleClose}
        >
          X
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full max-w-md'>
          <Stack spacing={2} className="w-full">
            <h1 className="pb-6 text-center text-2xl">Create Product</h1>
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
              name="name"
              control={form.control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Product Name"
                  variant="outlined"
                  type="text"
                  error={!!error || hasError !== null}
                  value={value}
                  onChange={onChange}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Controller
              name="description"
              control={form.control}
              rules={{
                validate: {
                  minLength: (value) => value.length >= 3,
                  maxLength: (value) => value.length <= 600,
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Description"
                  variant="outlined"
                  type="text"
                  multiline
                  maxRows={10}
                  minRows={3}
                  value={value}
                  onChange={onChange}
                  error={!!error || hasError !== null}
                  helperText={error ? error.message : null}
                  placeholder="Please, provide a short description for your product"
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
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}
