import HuiSelect from './Select'
import type { HuiSelectProps } from './Select'
import type {
  OptionValue,
  Level,
  HuiSelectBodyProps,
  HuiSelectParentOption,
} from './SelectBody/SelectBody'

import SelectBody from './SelectBody/SelectBody'

type HuiSelectInterface = typeof HuiSelect
interface SelectInterface extends HuiSelectInterface {
  SelectBody: typeof SelectBody
}

const HSelect = HuiSelect as SelectInterface

HSelect.SelectBody = SelectBody

export type {
  HuiSelectProps,
  OptionValue,
  Level,
  HuiSelectBodyProps,
  HuiSelectParentOption,
}
export default HSelect
