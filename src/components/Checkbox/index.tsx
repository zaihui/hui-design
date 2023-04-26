import React from 'react'
import InternalCheckbox from './Checkbox'
import HuiCheckboxGroup from './Group'
import type { HuiCheckboxProps } from './Checkbox'
import type { HuiCheckboxGroupProps } from './Group'

interface CompundedComponent extends React.ForwardRefExoticComponent<HuiCheckboxProps> {
  Group: typeof HuiCheckboxGroup
}

const HuiCheckbox = InternalCheckbox as CompundedComponent
HuiCheckbox.Group = HuiCheckboxGroup

export type { HuiCheckboxGroupProps }
export type { HuiCheckboxProps }
export default HuiCheckbox
