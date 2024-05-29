import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { useParams } from 'react-router-dom'

const Home = ({SetCurrentId}) => {
    const [category,setCategory] = useState("All")
    const {massId} = useParams();
    
  useEffect(() => {
    SetCurrentId(massId);
  }, [massId, SetCurrentId]);
  
  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <AppDownload/>
    </div>
  )
}

export default Home;