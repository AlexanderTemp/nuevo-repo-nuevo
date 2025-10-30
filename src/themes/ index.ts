import { Components, Theme } from '@mui/material/styles'
import { CardOverrides } from './overrides/Card'
import { ButtonOverrides } from './overrides/Button'
import { TextFieldOverrides } from './overrides/TextField'
import { AppBarOverrides } from './overrides/AppBar'
import { ListItemButtonOverrides } from './overrides/ListItemButton'
import {
  AccordionDetailsOverrides,
  AccordionOverrides,
  AccordionSummaryOverrides,
} from './overrides/Accordion'
import { InputLabelOverrides, SelectOverrides } from './overrides/Select'
import { ChipOverrides } from './overrides/Chip'
import { AutocompleteOverrides } from './overrides/Autocomplete'
import { DialogOverrides } from './overrides/Dialog'
import { AlertOverrides } from './overrides/Alert'

export const componentOverrides: Partial<Components<Theme>> = {
  MuiAppBar: AppBarOverrides,
  MuiCard: CardOverrides,
  MuiButton: ButtonOverrides,
  MuiTextField: TextFieldOverrides,
  MuiListItemButton: ListItemButtonOverrides,
  MuiAccordion: AccordionOverrides,
  MuiAccordionSummary: AccordionSummaryOverrides,
  MuiAccordionDetails: AccordionDetailsOverrides,
  MuiSelect: SelectOverrides,
  MuiInputLabel: InputLabelOverrides,
  MuiChip: ChipOverrides,
  MuiDialog: DialogOverrides,
  MuiAlert: AlertOverrides,

  MuiAutocomplete: AutocompleteOverrides,
}
