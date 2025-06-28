import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FormInputProps extends React.ComponentProps<'input'> {
  label?: string;
  labelClassName?: string;
  error?: string;
}

function FormInput({ className, type, label, labelClassName, error, id, ...props }: FormInputProps) {
  const inputId = id || React.useId();

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={inputId} className={labelClassName}>
          {label}
        </Label>
      )}
      <Input
        id={inputId}
        type={type}
        className={cn(error && 'border-destructive focus-visible:border-destructive', className)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export { FormInput };
