import WL from "wrapping-letters-react"

const structure = ({ letter }) => ( <p>{letter}</p> )

export default function Citas() {
  return (
    <WL 
      text="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" 
      structure={structure} 
    />
  )
}