import * as z from 'zod'

export const ProductFormSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(3).max(600),
  price: z.string({
    required_error: 'Price is required.',}),
})

export type ProductFormData = z.infer<typeof ProductFormSchema>
