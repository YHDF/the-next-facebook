import { useState } from 'react';
import { useCookies } from 'react-cookie';


import styles from './Search.module.css';


const USER_TOKEN_COOKIE_NAME = 'userToken';
const USER_NAME_COOKIE_NAME = 'userName';
const USER_ID_COOKIE_NAME = 'userId';

export default function Search({ setSearchResults }) {
  const [query, setQuery] = useState('');

  const [cookies, setCookie, removeCookie] = useCookies([USER_TOKEN_COOKIE_NAME, USER_NAME_COOKIE_NAME, USER_ID_COOKIE_NAME]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/users?q=${query}&noteq=${cookies.userName}`);
    const data = await response.json();
    setSearchResults(data.items);
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
