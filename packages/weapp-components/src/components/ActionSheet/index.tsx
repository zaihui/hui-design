import ActionSheet from './ActionSheet'
import Item from './Item/Item'
import type { HuiActionSheetProps } from './ActionSheet'
import type { HuiActionSheetItemProps } from './Item/Item'

type IActionSheet = typeof ActionSheet

interface IHuiActionSheet extends IActionSheet {
  Item: typeof Item
}

const HuiActionSheet = ActionSheet as IHuiActionSheet

HuiActionSheet.Item = Item

export type { HuiActionSheetProps }
export type { HuiActionSheetItemProps }
export default HuiActionSheet
