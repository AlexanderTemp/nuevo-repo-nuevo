import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { InputBaseProps, InputLabel, Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

type FormInputIPProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  id: string
  name: TName
  control: Control<TFieldValues>
  label: string
  size?: 'small' | 'medium'
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  disabled?: boolean
  inputProps?: InputBaseProps['inputProps']
  variant?: 'standard' | 'outlined' | 'filled'
  bgcolor?: string
  labelVariant?: Variant
  onEnter?: () => void
}

export const FormInputIP = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  id,
  name,
  control,
  label,
  size = 'small',
  rules,
  disabled,
  inputProps,
  variant,
  bgcolor,
  labelVariant = 'subtitle2',
  onEnter,
}: FormInputIPProps<TFieldValues, TName>) => (
  <div style={{ flexGrow: 1 }}>
    <InputLabel htmlFor={id}>
      <Typography
        variant={labelVariant}
        sx={{ color: 'text.primary', fontWeight: '400', mb: 1 }}
      >
        {label}
      </Typography>
    </InputLabel>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const handleKeyDown = (
          event: React.KeyboardEvent<HTMLInputElement>
        ) => {
          if (event.key === 'Enter' && onEnter) {
            onEnter()
          }
        }

        const handleChange = (event: any) => {
          const formattedValue = formatearIP(event.target.value)
          field.onChange(formattedValue)
        }

        return (
          <TextField
            id={id}
            variant={variant}
            size={size}
            disabled={disabled}
            value={field.value || ''}
            placeholder="     ·     ·     ·     "
            autoComplete="off"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            sx={{ bgcolor }}
            inputProps={{
              maxLength: 15,
              style: { textAlign: 'center', letterSpacing: '2px' },
              ...inputProps,
            }}
          />
        )
      }}
    />
  </div>
)

const formatearIP = (valor: string) =>
  valor.replace(/[^0-9.]/g, '').replace(/\.{2,}/g, '.')
