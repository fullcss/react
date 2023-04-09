import { ComponentPropsWithRef, ElementType, forwardRef, useMemo } from 'react'
import { css } from '@emotion/react'
import { AutoLayoutComponentType, AutoLayoutOptions, AutoLayoutProps, FlexOptions, XAxis, YAxis } from '@jsxcss/core'
import * as utils from '../../utils'

const createAutoLayoutComponent = (autoLayoutOptions: AutoLayoutOptions = {}): AutoLayoutComponentType =>
  forwardRef(function AutoLayout<T extends ElementType>(
    props: AutoLayoutProps<T>,
    ref: ComponentPropsWithRef<T>['ref']
  ) {
    const {
      direction = autoLayoutOptions.direction ?? 'vertical',
      space = autoLayoutOptions.space ?? 0,
      spacingMode = autoLayoutOptions.spacingMode ?? 'packed',
      padding = autoLayoutOptions.padding ?? 0,
      align = autoLayoutOptions.align ?? 'top-left',
      as,
      ...rest
    } = props

    const axis = useMemo((): {
      x: XAxis
      y: YAxis | undefined
    } => {
      const array = align.split('-')

      if (array.length === 1) {
        const [x] = array

        return { x: x as XAxis, y: undefined }
      }
      const [y, x] = array
      return { x: x as XAxis, y: y as YAxis }
    }, [align])

    const flexParam = useMemo((): FlexOptions => {
      let align: FlexOptions['align']
      let justify: FlexOptions['justify']

      if (direction === 'vertical') {
        if (axis.y) {
          if (axis.y === 'top') {
            justify = 'start'
          }
          if (axis.y === 'bottom') {
            justify = 'end'
          }
        } else {
          justify = 'center'
        }

        if (axis.x === 'left') {
          align = 'left'
        }
        if (axis.x === 'center') {
          align = 'center'
        }
        if (axis.x === 'right') {
          align = 'flex-end'
        }
      }
      if (direction === 'horizontal') {
        if (axis.y) {
          if (axis.y === 'top') {
            align = 'start'
          }
          if (axis.y === 'bottom') {
            align = 'end'
          }
        } else {
          align = 'center'
        }

        if (axis.x === 'left') {
          justify = 'left'
        }
        if (axis.x === 'center') {
          justify = 'center'
        }
        if (axis.x === 'right') {
          justify = 'flex-end'
        }
      }

      if (spacingMode === 'space-between') {
        justify = 'space-between'
      }

      return { direction: direction === 'vertical' ? 'column' : 'row', align, justify }
    }, [axis, direction, spacingMode])

    const Component = as || 'div'

    return (
      <Component
        css={css`
          ${utils.flex(flexParam)}
          ${utils.gutter({ direction, spacing: space })}
        ${utils.padding(padding)}
        `}
        {...rest}
        ref={ref}
      />
    )
  })

type AutoLayoutType = AutoLayoutComponentType & {
  Vertical: AutoLayoutComponentType
  Horizontal: AutoLayoutComponentType
}

export const AutoLayout = createAutoLayoutComponent() as AutoLayoutType
AutoLayout.Vertical = createAutoLayoutComponent({ direction: 'vertical' })
AutoLayout.Horizontal = createAutoLayoutComponent({ direction: 'horizontal' })
