import Head from 'next/head'
import Image from 'next/image'
import styles from './styles/Home.module.css'
import Header from '../components/Header'
import { useState, useRef, useEffect } from 'react'
import Typed from "react-typed"
import bullet from '../images/greenstar.png'
import controls from '../images/controls.png'

export default function Home() {

  const [email, setEmail] = useState("")
  const [sortValue, setSort] = useState("company")
  const [search, setSearch] = useState("type here...")
  const [width, setWidth] = useState(0);
  const span = useRef();

  useEffect(() => {
    setWidth(span.current.offsetWidth + 10);
  }, [search, span.current]);

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
              /></span><br/>internship postings <span className={styles.emphasis}>fast</span> and stay up to date with the latest openings.
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
              <div key={points[1]} className={styles.pointsDetails}>
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
        <div className={styles.code}>
          <div className={styles.codeBar}>
            <Image 
              src={controls}
              alt=""
              width={84}
              height={20}
              layout='fixed'
            />
            <div className={styles.tab}>
              <p>sweintern.py</p>
            </div>
          </div>
          <div className={styles.codeText}>
            <p><span className={styles.lineNumber}>1</span> <span className={styles.import}>import</span> <span className={styles.re}>re</span></p>
            <p><span className={styles.lineNumber}>2</span> re.search(<span id="hide" ref={span}>{search}</span><input 
                className={styles.fieldSearch}
                type="text" 
                style={{ width }}
                onChange={evt => evt.target.value.length > 0 ? setSearch(evt.target.value) : setSearch("type here...")} 
                placeholder="type here..."
              />, database)</p>
            <p><span className={styles.lineNumber}>3</span> database.sort(</p>
            <p className={styles.optionsRow}><span className={styles.lineNumber}>4</span> <span className={styles.sortOptions}>{
            ["company", "pay/hour", "location", "position"].map(sort => (
                <label key={sort} className={styles.sort} onClick={() => setSort(sort)}>
                    <input type="radio" name="radio" checked={sort === sortValue} readOnly/> 
                    <span>{sort}</span>
                </label>
              ))}</span></p>
            <p><span className={styles.lineNumber}>5</span> )</p>
          </div>
        </div>
      </main>
    </div>
  )
}
