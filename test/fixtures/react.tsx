import React from 'react'

interface IMyComponentPops {
  foo?: string
  bar: number
}

export default function MyComponent({ foo, bar }: IMyComponentPops) {
  return <div />
}
