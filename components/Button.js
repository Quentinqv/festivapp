export default function Button(props) {
  return (
    <button className="button" type={props.type} onClick={props.onClick} style={{ width: props.width ? props.width : "100%", ...props.style }}>{ props.text }</button>
  )
}
