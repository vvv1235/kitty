'use client'

import { useState } from 'react'
import { Input, InputProps } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PasswordInputProps extends InputProps {
  confirmPassword?: boolean
}

export function PasswordInput({ confirmPassword = false, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className={`${props.className || ''}`}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-gray-500" />
        ) : (
          <Eye className="h-4 w-4 text-gray-500" />
        )}
        <span className="sr-only">{showPassword ? 'Ocultar senha' : 'Mostrar senha'}</span>
      </Button>
    </div>
  )
}