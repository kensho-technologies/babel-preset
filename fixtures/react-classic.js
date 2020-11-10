import * as React from 'react'

export default function MyComponent(props) {
  const {label, ...rest} = props
  const [count, setCount] = React.useState(0)
  return (
    <button onClick={() => setCount(count + 1)} {...rest}>
      {label} {count}
    </button>
  )
}
