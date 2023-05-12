import Item from './Item'
import type { HuiContentListItemProps } from './Item/index'

import ContentList from './ContentList'
import type { HuiContentListProps } from './ContentList'

interface CompundedComponent extends React.FC<HuiContentListProps> {
  Item: typeof Item
}

const HuiContentList = ContentList as CompundedComponent
HuiContentList.Item = Item

export type { HuiContentListProps }
export type { HuiContentListItemProps }
export default HuiContentList
