import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigator = useNavigate();

  const [userCurrent, setUserCurrent] = useState(null);

  useEffect(() => {const check = JSON.parse(localStorage.getItem('user'))
    const user = check? JSON.parse(localStorage.getItem('user')).data:null;
    setUserCurrent(user);
    //console.log(user);
  }, []); // Chỉ chạy một lần khi component được mount

  function handlerLogout(){
    localStorage.removeItem('user')
    navigator('/login');

  }

  return (
    <div className="header">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
      <div className="user-info">
        {userCurrent ? (
          <>
            <span>{userCurrent.username}</span>
            <button onClick={handlerLogout}>Logout</button>
          </>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </div>
  );
}

export default Header;
