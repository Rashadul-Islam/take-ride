import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import "./Home.css";
import fakeData from "../../Data/Data.json";
import Vehicles from '../Vehicles/Vehicles';

const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(fakeData);
    }, [])

    return (
        <div className="bg">
            <Header></Header>
            <div className="row align-card">
                {
                    data.map(info => <Vehicles Vehicles={info} key={info.id}></Vehicles>)
                }
            </div>
        </div>
    );
};

export default Home;