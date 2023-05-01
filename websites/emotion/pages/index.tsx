import { css } from '@emotion/react'
import s, { AutoLayout, Flex, Stack } from '@jsxcss/emotion'
import { AnimatePresence, motion } from 'framer-motion'
import { ComponentPropsWithoutRef, forwardRef, PropsWithChildren } from 'react'
import { useToggle } from '../hooks'

const Web = () => {
  const [isLoading, toggleIsLoading] = useToggle(true)

  return (
    <Stack.Vertical
      direction={['vertical', 'vertical', 'horizontal']}
      as={motion.div}
      whileHover={{ scale: 0.99 }}
      css={css(
        s.padding(12),
        s.color({ backgroundColor: '#fafafa' }),
        s.border({ width: 1, style: 'solid', color: 'lightgray', radius: 16 })
      )}
    >
      <Flex
        as="section"
        css={css`
          ${s.padding({ left: 16, y: 16 })}
          ${s.color({ backgroundColor: 'lightgray' })}
          ${s.border({ radius: 12 })}
        `}
      >
        @jsxcss/emotion
      </Flex>
      <Stack.Vertical spacing={[12, 24]} css={{ flex: 1 }}>
        <Stack
          direction={['vertical', 'horizontal']}
          justify={['space-between']}
          spacing={[12, 8]}
          css={css(
            s.padding(12),
            s.color({ backgroundColor: 'black' }),
            s.border({ width: 1, style: 'solid', color: 'lightgray', radius: 16 })
          )}
        >
          <Button loading={isLoading} onClick={() => toggleIsLoading()}>
            Press Button
          </Button>
          <Button loading={isLoading} onClick={() => toggleIsLoading()}>
            Press Button
          </Button>
          <Button loading={isLoading} onClick={() => toggleIsLoading()}>
            Press Button
          </Button>
        </Stack>
        <AutoLayout
          padding={{ x: 16, y: 24 }}
          css={css(
            s.padding(12),
            s.color({ backgroundColor: 'black' }),
            s.border({ width: 1, style: 'solid', color: 'lightgray', radius: 16 })
          )}
        >
          <Button loading={isLoading} onClick={() => toggleIsLoading()}>
            Press Button
          </Button>
          <Button loading={isLoading} onClick={() => toggleIsLoading()}>
            Press Button
          </Button>
          <Button loading={isLoading} onClick={() => toggleIsLoading()}>
            Press Button
          </Button>
        </AutoLayout>
      </Stack.Vertical>
    </Stack.Vertical>
  )
}

const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<
    Pick<ComponentPropsWithoutRef<'button'>, 'onClick'> & {
      loading?: boolean
    }
  >
>(({ children, loading = false, ...rest }, ref) => (
  <AutoLayout.Horizontal
    as={motion.button}
    ref={ref}
    whileTap={{ scale: 0.92, backgroundColor: 'rgb(46, 0, 90)' }}
    whileHover={{ scale: 0.98, opacity: 0.86 }}
    css={css`
      ${s.padding({ x: 50, y: 16 })};
      ${s.color({ backgroundColor: 'blueviolet' })};
      ${s.border({ radius: 12, style: 'none' })};
      cursor: pointer;
      position: relative;
      flex: 1;
    `}
    {...rest}
  >
    <Flex.Center
      css={css`
        position: absolute;
        top: 0;
        left: 20px;
        bottom: 0;
      `}
    >
      <AnimatePresence>{loading && <Spinner />}</AnimatePresence>
    </Flex.Center>
    <Flex.Center
      css={css`
        ${s.color({ color: 'white' })};
        flex: 1;
        font-size: 16px;
      `}
    >
      {children}
    </Flex.Center>
  </AutoLayout.Horizontal>
))

const Spinner = () => (
  <motion.div initial={{ x: -20, scale: 0 }} animate={{ x: 0, scale: 1 }} exit={{ x: -20, scale: 0 }}>
    <motion.div
      animate={{
        scale: [1, 1.2, 1, 1.2, 1],
        rotate: [0, 180, 360],
        transition: { repeat: Infinity, duration: 1, ease: 'linear' },
      }}
      exit={{ scale: 0 }}
      css={css`
        ${s.size({ width: 12, height: 12 })}
        ${s.border({ width: 1, color: 'white', radius: '50%', style: 'solid' })}
      border-top: none;
        border-right: none;
        margin: 8px auto;
      `}
    />
  </motion.div>
)
export default Web
