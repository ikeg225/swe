import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import { useState } from 'react'
import Typed from "react-typed"
import bullet from '../images/greenstar.png'

export default function Home() {

  const [email, setEmail] = useState("")

  function submit() {
    // submit email to db
  }

  return (
    <div>
      <Head>
        <title>SWE Intern</title>
        <meta name="description" content="Software Engineer Intern" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.radialGreen}></div>
      <div className={styles.radialBlue}></div>
      <main className="main">
        <Header />
        <div className={styles.front}>
          <div className={styles.left}>
            <p className={styles.headline}>Your tech search starts here.</p>
            <p className={styles.subheadline}>Find quality <span className={styles.options}><Typed
            strings={['software engineer', 'data science', 'quantitative trader', 
            'hardware engineer', 'data engineer', 'mechanical engineer', 'data analyst']}
                typeSpeed={100}
                backSpeed={50}
                backDelay={2000}
                loop
              /></span><br/>internship postings fast and stay up to date with the latest openings.
            </p>
            <form className={styles.emailSubmit} onSubmit={submit()}>
              <input 
                className={styles.field}
                type="email" 
                value={email} 
                onChange={evt => setEmail(evt.target.value)} 
                placeholder="email address"
              />
              <input 
                className={styles.submit}
                type="submit" 
                value="update me" 
              />
            </form>
          </div>
          <hr className={styles.divider} />
          <div className={styles.points}>
            {[[5, "Fields"], [22, "Locations"], [142, "Companies"], [478, "Positions"]].map(points => (
              <div className={styles.pointsDetails}>
                <Image 
                  src={bullet}
                  alt=""
                  width={30}
                  height={30}
                  layout='fixed'
                />
                <p>{points[0]}<br/><span className={styles.pointsDesc}>{points[1]}</span></p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
