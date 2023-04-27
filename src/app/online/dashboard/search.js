import { useState } from 'react';
import styles from './Search.module.css';

export default function Search({ setSearchResults }) {
  const [query, setQuery] = useState('');
  

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/users?q=${query}`);
    const data = await response.json();
    setSearchResults(data.items);;
  };

  return (
    <div className={styles.searchFrame}>
      <form onSubmit={handleSubmit}>
        <div className={styles.txt}>
          <input type="text" placeholder="Search users" value={query} onChange={handleQueryChange} />
          <button type="submit" className={styles.submitBtn}>Search</button>
        </div>
      </form>
    </div>
  );
}
