import styles from './Result.module.css';
import { useRouter } from 'next/navigation';


export default function Result({ searchResults }) {

  const router = useRouter();

  return (
    <div className={styles.resultFrame}>
      <h1>Results</h1>
      <ul className={styles.userList}>
        {searchResults.map((user) => (
          <li key={user.id}>
            <h3>{user.username}</h3>
            <p>{user.email}</p>
            <button onClick={() => router.push(`online/chat?uid=${user.id}&&uname=${user.username}`)} >Ouvrir la discussion</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
