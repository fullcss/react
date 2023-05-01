import { AxisDirection } from '../../common'
import { FlexOption } from '../flex'
import { GutterOption } from '../gutter'

export type StackOption = Pick<FlexOption, 'align' | 'justify'> & GutterOption & { direction?: AxisDirection }
