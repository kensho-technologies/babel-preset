import * as React from 'react'
import {css} from '@emotion/react'

const cssObj = css({color: 'red'})

export default function MyComponent(props) {
  return (
    <>
      <div css={{color: 'blue'}} a={props.a} />
      <div b={props.b} css={cssObj} />
    </>
  )
}
