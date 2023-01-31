import type { NextPage } from 'next'
import styles from "@styles/Home.module.scss"


const Home: NextPage = () => {
  const { container } = styles
  
  return (
    <span className={container}>OwO</span>
  )
}

export default Home
