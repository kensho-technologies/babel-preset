import * as React from 'react'

interface MyComponentProps {
  disabled: boolean
  label?: string
}

export default function MyComponent(props: MyComponentProps) {
  const {label, ...rest} = props
  const [count, setCount] = React.useState(0)
  return (
    <button onClick={() => setCount(count + 1)} {...rest}>
      {label} {count}
    </button>
  )
}
