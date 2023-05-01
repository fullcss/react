import { ComponentPropsWithRef, ElementType } from 'react'
import { AsProps } from '../../common'
import { OptionWithMediaQuery } from '../../contexts'
import { StackOption } from '../../utils'

export type StackProps<T extends ElementType = 'div'> = AsProps<T> & OptionWithMediaQuery<StackOption>

export type StackComponentType = <T extends ElementType = 'div'>(
  props: StackProps<T> & Partial<Pick<ComponentPropsWithRef<T>, 'ref'>>
) => JSX.Element | null
