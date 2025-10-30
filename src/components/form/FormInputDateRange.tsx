import {
  InputDataRangePicker,
  InputDataRangePickerRefProps,
} from '@/components/InputDataRangePicker'
import { InputLabel, Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { forwardRef } from 'react'
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  PathValue,
} from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

type FormDateRangeProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  id: string
  name: TName
  control: Control<TFieldValues>
  label: string
  size?: 'small' | 'medium'
  format?: string
  disabled?: boolean
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  bgcolor?: string
  labelVariant?: Variant
  onChange?: (fechas: string[]) => void
}

function FormInputDateRangeInner<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  {
    id,
    name,
    control,
    label,
    size = 'small',
    rules,
    bgcolor,
    labelVariant = 'subtitle2',
    onChange,
  }: FormDateRangeProps<TFieldValues, TName>,
  ref: React.ForwardedRef<InputDataRangePickerRefProps>
) {
  return (
    <div>
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
        render={({ field, fieldState: { error } }) => (
          <InputDataRangePicker
            ref={ref}
            onChange={(fechas) => {
              field.onChange(fechas)
              if (onChange) {
                onChange(fechas)
              }
            }}
            error={!!error}
            size={size}
            bgcolor={bgcolor}
            name={name}
            id={id}
          />
        )}
        rules={rules}
        defaultValue={'' as PathValue<TFieldValues, TName>}
      />
    </div>
  )
}

export const FormInputDateRange = forwardRef(FormInputDateRangeInner) as <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: FormDateRangeProps<TFieldValues, TName> & {
    ref?: React.ForwardedRef<InputDataRangePickerRefProps>
  }
) => ReturnType<typeof FormInputDateRangeInner>
