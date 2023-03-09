import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ManufacturerList() {

    const [manufacturers, setManufacturers] = useState([]);

    const fetchManufacturers = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/');

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        fetchManufacturers();
    },[])

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Manufacturers</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map(manufacturer => {
                        return (
                            <tr key={ manufacturer.id }>
                                <td>{ manufacturer.name }</td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-left">
            <Link to="/manufacturers/new" className="btn btn-primary">Create a manufacturer</Link>
            </div>
        </>
    );
}

export default ManufacturerList;
