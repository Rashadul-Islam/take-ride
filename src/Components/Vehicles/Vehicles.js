import React from 'react';
import { Link } from 'react-router-dom';
import "./Vehicles.css";

const Vehicles = (props) => {
    const { name, img } = props.Vehicles;
    return (
        <div className="d-flex justify-content-center col mt-4">
            <Link className="link-style" to={`/book-ride/${name}`}>
                <div className="card" style={{ width: '18rem', borderRadius: '10px' }}>
                    <img className="vehicles-img" src={img} alt="" />
                    <div className="card-body text-center">
                        <p>{name}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Vehicles;