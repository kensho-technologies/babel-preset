import PropTypes from 'prop-types'

export default function MyComponent(props) {
  return <div />
}

MyComponent.propTypes = {
  foo: PropTypes.string,
  bar: PropTypes.number.isRequired,
}
