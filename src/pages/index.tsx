import Image from "next/image"
import type { NextPage } from 'next'
import styles from "@styles/Home.module.scss"


const Home: NextPage = () => {
  const { container } = styles
  
  return (
    <div>
      <div className=""> 
       <Image className="" src='/bigoteJossiel.png' alt='un bigote piola'  />
      </div>
    </div> 
  )
}

export default Home
