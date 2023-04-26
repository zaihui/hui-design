import InternalRadio from './Radio'
import HuiRadioGroup from './Group'
import type { HuiRadioProps } from './Radio'
import type { HuiRadioGroupProps } from './Group'

interface CompoundedComponent extends React.FC<HuiRadioProps> {
  Group: typeof HuiRadioGroup
}
const HuiRadio = InternalRadio as CompoundedComponent
HuiRadio.Group = HuiRadioGroup

export type { HuiRadioProps }
export type { HuiRadioGroupProps }
export default HuiRadio
