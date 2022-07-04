import Link from 'next/link'
import styles from './styles/Posting.module.css'
import { connectInfiniteHits } from 'react-instantsearch-dom';

const InfiniteHits = ({ hits, hasMore, refineNext }) => (
    <div className={styles.results}>
        <div className={styles.lists}>
            {hits.map((hit) => (
                <div key={hit.id} className={styles.listing}>
                    <a target="_blank" rel="noopener noreferrer" href={hit.postURL} >
                        <div className={styles.posting} >
                            <div className={styles.header}>
                                <div className={styles.company}>
                                    {hit.foundLogo && <img src={`./images/logos/${hit.companyShort}.png`} alt={hit.companyShort} className={styles.logo} />}
                                    {hit.company}
                                </div>
                                <div className={styles.posted}>
                                    {hit.posted}
                                </div>
                            </div>
                            <div className={styles.name}>
                                {hit.name}
                            </div>
                            <div className={styles.tag}>
                                {hit.locations.map((location, index) => (
                                    location !== '' && <div key={location + hit.id + index} className={`${styles.which} ${styles.location}`} >
                                        {location}
                                    </div>
                                ))}
                                {hit.payhour !== 0 && <div key={hit.payhour + hit.id} className={`${styles.which} ${styles.payhour}`} >
                                    {`$${hit.payhour}/hr`}
                                </div>}
                                {hit.timeframe.split(",").map((time, index) => (
                                    time !== '' && <div key={time + hit.id + index} className={`${styles.which} ${styles.time}`} >
                                        {time}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.content}>
                            The following posting is a pipeline requisition, meant to accumulate candidates for Software Engineer in Houston and/or Fort Collins. Qualified applicants will be contacted i...
                            </div>
                        </div>
                    </a>
                </div>
            ))}
        </div>
        {hasMore && <div className={styles.buttonwrap}>
            <button className={styles.buttonMore} onClick={refineNext} >
                Show more
            </button>
        </div>}
    </div>
);

const CustomPostInfiniteHits = connectInfiniteHits(InfiniteHits);

export default CustomPostInfiniteHits;