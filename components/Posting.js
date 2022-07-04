import Tag from './Tag'
import Link from 'next/link'
import styles from './styles/Posting.module.css'
import { connectInfiniteHits } from 'react-instantsearch-dom';

const InfiniteHits = ({ hits, hasMore, refineNext }) => (
    <div className={styles.results}>
        <ul className={styles.lists}>
            {hits.map((hit, index) => (
                <li key={index} className={styles.listing}>
                    <a target="_blank" rel="noopener noreferrer" href={hit.postURL} key={hit.name}>
                        <div className={styles.posting} key={hit.name}>
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
                                {hit.locations.map(location => (
                                    <Tag value={location} which="location" />
                                ))}
                                <Tag value={hit.payhour} which="payhour" />
                                {hit.timeframe.split(",").map(time => (
                                    <Tag value={time} which="time" />
                                ))}
                            </div>
                            <div className={styles.content}>
                            The following posting is a pipeline requisition, meant to accumulate candidates for Software Engineer in Houston and/or Fort Collins. Qualified applicants will be contacted i...
                            </div>
                        </div>
                    </a>
                </li>
            ))}
        </ul>
        {hasMore && <div className={styles.buttonwrap}>
            <button className={styles.buttonMore} onClick={refineNext} >
                Show more
            </button>
        </div>}
    </div>
);

const CustomPostInfiniteHits = connectInfiniteHits(InfiniteHits);

export default CustomPostInfiniteHits;
