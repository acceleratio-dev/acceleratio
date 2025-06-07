import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';
import { Input } from './input';

interface FormInputProps extends React.ComponentProps<'input'> {
  label: string;
  error?: string;
  description?: string;
  className?: string;
  labelClassName?: string;
  icon?: React.ReactNode;
}

function FormInput({
  className,
  type,
  label,
  error,
  description,
  labelClassName,
  id,
  icon,
  ...props
}: FormInputProps) {
  const inputId = id || React.useId();
  const errorId = `${inputId}-error`;
  const descriptionId = `${inputId}-description`;

  return (
    <div className={cn('space-y-1', className)}>
      <Label htmlFor={inputId} className={cn('pl-1.5', labelClassName)}>
        {label}
      </Label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg:not([class*='size-'])]:size-4">
            {icon}
          </div>
        )}
        <Input
          id={inputId}
          type={type}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(error && errorId, description && descriptionId)}
          className={cn(error && 'border-destructive', icon && 'pl-9')}
          {...props}
        />
      </div>
      {description && (
        <p id={descriptionId} className="text-xs pl-1.5 text-muted-foreground">
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs pl-1.5 text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export { FormInput };
