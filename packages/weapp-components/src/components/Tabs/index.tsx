import Tabs from './Tabs'
import HuiTab from './Tab/Tab'
import type { HuiTabsProps } from './Tabs'
import type { HuiTabProps } from './Tab/Tab'

interface CompundedComponent extends React.FC<HuiTabsProps> {
  HuiTab: typeof HuiTab
}

const HuiTabs = Tabs as CompundedComponent
HuiTabs.HuiTab = HuiTab

export type { HuiTabsProps }
export type { HuiTabProps }
export default HuiTabs
