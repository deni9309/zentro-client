/* eslint-disable prefer-const */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { AuthFormErrorState } from '@/types'

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

function formatErrorMessage(message: string) {
  return message.charAt(0).toUpperCase() + message.slice(1)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (response: any) => {
  if (response.message) {
    if (Array.isArray(response.message)) {
      return formatErrorMessage(response.message[0])
    }
    return formatErrorMessage(response.message)
  }
  return 'Unknown error occured.'
}