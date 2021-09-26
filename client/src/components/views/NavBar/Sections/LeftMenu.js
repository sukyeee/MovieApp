import React, { useEffect, useState } from 'react';
import { Menu, Input } from 'antd';
import { API_KEY, API_URL } from '../../../Config';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {

  const [Movies, setMovies] = useState([]);
  
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint)
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
    .then(response => response.json())
    .then(response => {
      console.log(response.results)
      setMovies([...Movies,...response.results])
    })
  }


  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="favorite">
      <a href="/favorite">Favorite</a>
    </Menu.Item>
    <Menu.Item key="booking">
      <a href="/booking">Booking</a>
    </Menu.Item>
  </Menu>

  
  )
}

export default LeftMenu