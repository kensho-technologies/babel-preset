import * as React from 'react'

interface MyComponentProps {
  disabled: boolean
  label?: string
}

export default function MyComponent(props: MyComponentProps) {
  const {label, ...rest} = props
  return <button {...rest}>{label}</button>
}
