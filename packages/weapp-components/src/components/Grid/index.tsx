import Grid from './Grid'
import Item from './Item/Item'
import type { HuiGridProps } from './Grid'
import type { HuiGridItemProps } from './Item/Item'

interface CompundedComponent extends React.FC<HuiGridProps> {
  Item: typeof Item
}

const HuiGrid = Grid as CompundedComponent
HuiGrid.Item = Item

export type { HuiGridProps }
export type { HuiGridItemProps }
export default HuiGrid
