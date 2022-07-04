import Head from 'next/head'
import Image from 'next/image'
import styles from './styles/Home.module.css'
import Header from '../components/Header'
import { useState } from 'react'
import Typed from "react-typed"
import bullet from '../public/images/greenstar.png'
import controls from '../public/images/controls.png'
import Posting from '../components/Posting'
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { InstantSearch, connectSearchBox, InfiniteHits, SortBy } from 'react-instantsearch-dom';

export default function Home({ postings, companies }) {

  const [email, setEmail] = useState("")
  const date = new Date();

  function submit() {
    // submit email to db
  }

  const SearchBox = ({ currentRefinement, refine }) => (
    <input
      className={styles.fieldSearch}
      type="text" 
      style={{ width: 220 }}
      placeholder="type here..."
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
    />
  );

  const CustomSearchBox = connectSearchBox(SearchBox);
  
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
            {[[12, "Fields"], [companies["num_documents"], "Companies"], [postings["num_documents"], "Positions"], [date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), "Last Updated"]].map(points => (
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
        <InstantSearch indexName="postings" searchClient={searchClient}>
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
              <p><span className={styles.lineNumber}>2</span> re.search(<CustomSearchBox />, database)</p>
              <div className={styles.sort}><span className={styles.lineNumber}>3</span> database.sort(<SortBy
                items={[
                  {label: 'most recent', value: 'postings/sort/postedNum:asc'},
                  {label: 'highest pay', value: 'postings/sort/payhour:desc'},
                ]}
                defaultRefinement="postings/sort/postedNum:asc"
              />)</div>
            </div>
          </div>
          <p className={styles.openings}>Current Openings:</p>
          <div className={styles.results}>
            <InfiniteHits
              showPrevious={true}
              hitComponent={Posting}
            />
          </div>
        </InstantSearch>
      </main>
    </div>
  )
}

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "7yLgCsumHRkfAOH92I1kiE1mhF4dJeKI",
    nodes: [
      {
        host: "209.50.54.104",
        port: "8108",
        protocol: "http",
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60,
  },
  additionalSearchParameters: {
    query_by: "company,name,locations,date,timeframe,posted,contents",
  },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;

export async function getStaticProps() {
  const postings_res = await fetch(`https://api.sweintern.com/collections/postings?x-typesense-api-key=${process.env.TYPESENSE_API}`)
  const postings = await postings_res.json()

  const postings_companies = await fetch(`https://api.sweintern.com/collections/companies?x-typesense-api-key=${process.env.TYPESENSE_API}`)
  const companies = await postings_companies.json()

  return {
    props: {
      postings,
      companies,
    },
  }
}