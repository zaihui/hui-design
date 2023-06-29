import HuiSelect from './Select'
import type { HuiSelectProps } from './Select'
import type {
  OptionValue,
  Level,
  HuiSelectBodyProps,
} from './SelectBody/SelectBody'

import SelectBody from './SelectBody/SelectBody'

type HuiSelectInterface = typeof HuiSelect
interface SelectInterface extends HuiSelectInterface {
  SelectBody: typeof SelectBody
}

;(HuiSelect as SelectInterface).SelectBody = SelectBody

export type { HuiSelectProps, OptionValue, Level, HuiSelectBodyProps }
export default HuiSelect
