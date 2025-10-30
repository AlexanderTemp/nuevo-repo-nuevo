import TextField from '@mui/material/TextField'
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  PathValue,
} from 'react-hook-form'
import Typography from '@mui/material/Typography'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { InputProps as StandardInputProps } from '@mui/material/Input/Input'
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import React, { InputHTMLAttributes, useState } from 'react'
import { InputBaseProps } from '@mui/material/InputBase'
import { Icono } from '@/components/Icono'
import { OutlinedInputProps } from '@mui/material/OutlinedInput'

type FormInputTextProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  id: string
  name: TName
  control: Control<TFieldValues>
  label: string
  size?: 'small' | 'medium'
  type?: InputHTMLAttributes<unknown>['type']
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  disabled?: boolean
  onChange?: StandardInputProps['onChange']
  InputProps?: Partial<OutlinedInputProps>
  inputProps?: InputBaseProps['inputProps']
  onEnter?: () => void
  clearable?: boolean
  variant?: 'standard' | 'outlined' | 'filled'
  rows?: number
  multiline?: boolean
  bgcolor?: string
  labelVariant?: Variant
  showCharCount?: boolean
  maxLength?: number
  minLength?: number
}

export const FormInputText = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  id,
  name,
  control,
  label,
  size = 'small',
  type,
  rules,
  disabled,
  onChange,
  InputProps,
  inputProps,
  onEnter,
  clearable,
  variant,
  rows = 1,
  multiline = false,
  bgcolor,
  labelVariant = 'subtitle2',
  showCharCount = false,
  maxLength,
  minLength,
}: FormInputTextProps<TFieldValues, TName>) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const getValidationLimits = async () => {
    try {
      const resolver = (control as any)._options?.resolver

      if (resolver && typeof resolver === 'function') {
        let maxLength: number | undefined
        let minLength: number | undefined

        try {
          const testValuesMax: any = { [name]: 'x'.repeat(10000) }
          const resultMax = await resolver(testValuesMax, undefined, {
            criteriaMode: 'all',
            fields: {},
            shouldUseNativeValidation: false,
          })

          if (resultMax?.errors?.[name]) {
            const error = resultMax.errors[name]
            const message = error?.message || ''
            const maxMatch =
              message.match(/(\d+)\s*caracteres/i) ||
              message.match(/exceder\s*(\d+)/i) ||
              message.match(/max.*?(\d+)/i)
            if (maxMatch) {
              maxLength = parseInt(maxMatch[1], 10)
            }
          }
        } catch (e) {}

        try {
          const testValuesMin: any = { [name]: '' }
          const resultMin = await resolver(testValuesMin, undefined, {
            criteriaMode: 'all',
            fields: {},
            shouldUseNativeValidation: false,
          })

          if (resultMin?.errors?.[name]) {
            const error = resultMin.errors[name]
            const message = error?.message || ''
            const minMatch =
              message.match(/menos\s*(\d+)\s*caracteres/i) ||
              message.match(/mínimo\s*(\d+)/i) ||
              message.match(/min.*?(\d+)/i)
            if (minMatch) {
              minLength = parseInt(minMatch[1], 10)
            }
          }
        } catch (e) {}

        return { min: minLength, max: maxLength }
      }
    } catch (e) {}
    return { min: undefined, max: undefined }
  }

  const [limits, setLimits] = React.useState<{
    min: number | undefined
    max: number | undefined
  }>({ min: undefined, max: undefined })

  const [retryCount, setRetryCount] = React.useState(0)

  React.useEffect(() => {
    getValidationLimits().then((newLimits) => {
      // Si no se detectaron límites y es la primera vez, reintentar
      if (!newLimits.max && !newLimits.min && retryCount < 5) {
        setTimeout(() => setRetryCount((prev) => prev + 1), 200)
      }
      setLimits(newLimits)
    })
  }, [name, control, retryCount])

  const detectedMinLength =
    minLength ??
    (rules?.minLength as number | undefined) ??
    limits.min ??
    (typeof inputProps?.minLength === 'number'
      ? inputProps.minLength
      : undefined)
  const detectedMaxLength =
    maxLength ??
    (rules?.maxLength as number | undefined) ??
    limits.max ??
    (typeof inputProps?.maxLength === 'number'
      ? inputProps.maxLength
      : undefined)

  return (
    <div style={{ flexGrow: 1 }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <InputLabel htmlFor={id}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant={labelVariant}
                  sx={{ color: 'text.primary', fontWeight: '400', mb: 1 }}
                >
                  {label}
                </Typography>
                {showCharCount && detectedMaxLength && (
                  <Typography
                    variant="caption"
                    color={
                      detectedMinLength &&
                      field.value?.length < detectedMinLength
                        ? 'error.main'
                        : field.value?.length > detectedMaxLength
                          ? 'error.main'
                          : 'text.secondary'
                    }
                    sx={{ mb: 1 }}
                  >
                    {field.value?.length || 0} / {detectedMaxLength}
                  </Typography>
                )}
              </div>
            </InputLabel>
            <TextField
              id={id}
              name={name}
              variant={variant}
              sx={{
                width: '100%',
                bgcolor,
              }}
              size={size}
              error={!!error}
              rows={rows}
              multiline={multiline}
              type={showPassword ? 'text' : type}
              onChange={(event) => {
                if (onChange) {
                  onChange(event)
                }
                field.onChange(event)
              }}
              inputRef={field.ref}
              onKeyUp={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  if (onEnter) {
                    onEnter()
                  }
                }
              }}
              value={field.value}
              disabled={disabled}
              inputProps={inputProps}
              InputProps={{
                endAdornment:
                  field.value && clearable ? (
                    <IconButton
                      size="small"
                      color={'primary'}
                      onClick={() => {
                        field.onChange('')
                      }}
                    >
                      <Icono color={'primary'}>clear</Icono>
                    </IconButton>
                  ) : type == 'password' ? (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? (
                          <Icono color={'inherit'}>visibility</Icono>
                        ) : (
                          <Icono color={'inherit'}>visibility_off</Icono>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ) : undefined,
                ...InputProps,
              }}
            />
            {!!error && <FormHelperText error>{error?.message}</FormHelperText>}
          </>
        )}
        defaultValue={'' as PathValue<TFieldValues, TName>}
        rules={rules}
      />
    </div>
  )
}
