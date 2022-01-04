type ButtonProps = {
  text?: string
}

function Button(props: ButtonProps) {
  return (
    <button>{props.text}</button>
  )
}

export default Button;
