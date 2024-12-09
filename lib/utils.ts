/* eslint-disable prefer-const */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { AuthFormErrorState } from '@/types'
import { ChangeEvent } from 'react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFormErrorMessage(response: any) {
  let obj: AuthFormErrorState = {}

  if (response.message) {
    if (Array.isArray(response.message)) {
      const messageArr: string[] = response.message

      messageArr.map((message) => {
        if (message.includes('email')) {
          obj.emailError = formatErrorMessage(message)
        }

        if (message.includes('password')) {
          obj.passwordError = formatErrorMessage(message)
        }
      })
      return obj
    }

    obj.otherError = formatErrorMessage(response.message)
    return obj
  }

  obj.otherError = 'Sorry, an error occurred.'
  return obj
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (response: any) => {
  if (response?.message) {
    if (Array.isArray(response.message)) {
      return formatErrorMessage(response.message[0])
    }
    return formatErrorMessage(response.message)
  }

  return 'An error occured. Please try again'
}

function formatErrorMessage(message: string) {
  return message.charAt(0).toUpperCase() + message.slice(1)
}

export function formatDecimal(
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) {
  if (e.target.value !== '') {
    const decimalParts = e.target.value.split('.')
    if (decimalParts.length > 1) {
      const integerPart = decimalParts[0]
      let decimalPart = decimalParts[1].slice(0, 2)

      e.target.value = `${integerPart}.${decimalPart}`
    }
    if (e.target.value !== '.' && e.target.value.charAt(1))
      e.target.value = parseFloat(e.target.value).toFixed(2)
  }
  return e
}

export function getImageUrl(id: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}/images/products/${id}.jpg`
}
