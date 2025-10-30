import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import {
  FormHelperText,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import esMX from 'dayjs/locale/es-mx'
import { Variant } from '@mui/material/styles/createTypography'
import dayjs, { Dayjs } from 'dayjs'
import { TimePicker } from '@mui/x-date-pickers'

type FormTimePickerProps<T extends FieldValues> = {
  id: string
  name: Path<T>
  control: Control<T, object>
  label: string
  size?: 'small' | 'medium'
  format?: string
  disabled?: boolean
  rules?: RegisterOptions
  bgcolor?: string
  minDate?: Dayjs
  maxDate?: Dayjs
  labelVariant?: Variant
  desktopModeMediaQuery?: string
}

export const FormInputTime = <T extends FieldValues>({
  id,
  name,
  control,
  label,
  size = 'small',
  labelVariant = 'subtitle2',
  disabled,
  desktopModeMediaQuery = '',
}: FormTimePickerProps<T>) => (
  <div>
    <InputLabel htmlFor={id}>
      <Typography
        variant={labelVariant}
        sx={{ pb: 1, color: 'text.primary', fontWeight: '400' }}
      >
        {label}
      </Typography>
    </InputLabel>
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esMX}>
          <TimePicker
            label={label}
            onChange={(data) => {
              if (data) {
                field.onChange(dayjs(data).format('HH:mm'))
                return
              }
              field.onChange(data)
            }}
            value={dayjs(`2023-01-01 ${field.value}`)}
            ref={field.ref}
            disabled={disabled}
            desktopModeMediaQuery={desktopModeMediaQuery}
            renderInput={(params) => (
              <>
                <TextField
                  id={id}
                  name={name}
                  sx={{ width: '100%' }}
                  size={size}
                  {...params}
                  error={disabled ? undefined : !!error}
                />
                {!!error && !disabled && (
                  <FormHelperText error>{error?.message}</FormHelperText>
                )}
              </>
            )}
          />
        </LocalizationProvider>
      )}
      defaultValue={'' as PathValue<T, Path<T>>}
    />
  </div>
)
