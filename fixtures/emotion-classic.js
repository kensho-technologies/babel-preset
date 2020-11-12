import * as React from 'react'
import {css} from '@emotion/react'

const cssObj = css({color: 'red'})

export default function MyComponent(props) {
  const {a, b, ...rest} = props
  const [count, setCount] = React.useState(0)
  return (
    <>
      <button css={{color: 'blue'}} onClick={() => setCount((prevSize) => prevSize + 1)}>
        Increment
      </button>
      <div height={count} {...rest} css={cssObj} />
    </>
  )
}
