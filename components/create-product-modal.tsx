'use client'

import { CSSProperties, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import { CreateProductProps } from '@/types'
import {
  ProductFormData,
  ProductFormSchema,
} from '@/schema/product-form.schema'
import { cn, formatDecimal } from '@/lib/utils'
import createProduct from '@/actions/product/create-product'

const styles: CSSProperties = {
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
  backgroundColor: 'background.paper',
  border: '2px solid #000',
  boxShadow: '24',
  padding: 4,
}
const fileInputStyles: CSSProperties = {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
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
  const [fileName, setFileName] = useState('')
  const [file, setFile] = useState<File | undefined>(undefined)

  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '0.00',
    },
  })

  const onSubmit = async (values: ProductFormData) => {
    setIsSubmitting(true)
    setHasError(null)
    try {
      const imageData = new FormData()
      if (file) imageData.append('image', file)

      const result = await createProduct(values, imageData)

      if ('error' in result) {
        setHasError(result.error)
        setIsSubmitting(false)
        return
      }
      resetFormAndFile()
      setIsSubmitting(false)
    } catch (_) {
      setHasError('An error occured')
      setIsSubmitting(false)
    }
  }

  function resetFormAndFile() {
    form.reset()
    setFileName('')
    setFile(undefined)
  }

  return (
    <Modal
      open={open}
      onClose={(_e, reason) => {
        if (reason && reason === 'backdropClick') return
        resetFormAndFile()
        handleClose()
      }}
    >
      <Box sx={styles}>
        <div
          className="absolute right-8 top-7 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs duration-300 hover:cursor-pointer hover:bg-z-mauve-900"
          onClick={() => {
            resetFormAndFile()
            handleClose()
          }}
        >
          X
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full max-w-md"
        >
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
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Short Description"
                  variant="outlined"
                  multiline
                  maxRows={6}
                  minRows={3}
                  value={value}
                  onChange={onChange}
                  error={!!error || hasError !== null}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Price"
                  variant="outlined"
                  type="number"
                  slotProps={{ htmlInput: { step: 0.01, min: 0.0 } }}
                  error={!!error || hasError !== null}
                  value={value}
                  onChange={(e) => {
                    onChange(formatDecimal(e))
                  }}
                  helperText={error ? error.message : null}
                />
              )}
            />

            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Upload File
              <input
                name="image"
                type="file"
                hidden
                style={fileInputStyles}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  setFile(e.target.files[0] || undefined)
                  setFileName(e.target.files[0].name || '')
                }}
              />
            </Button>

            {fileName !== '' && <Typography>{fileName}</Typography>}

            <Button
              disabled={isSubmitting}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}
