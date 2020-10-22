import {useState} from 'react'

export default function MyComponent(props) {
  const {label, ...rest} = props
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)} {...rest}>
      {label} {count}
    </button>
  )
}
