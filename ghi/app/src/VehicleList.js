import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function VehicleList() {

    useEffect(  () =>  {
        fetchVehicles()

    }, [] );

    const [models, setModels] = useState([]);

    const fetchVehicles = async () => {
        const response = await fetch('http://localhost:8100/api/models/');

        if (response.ok){
          let data= await response.json();
          setModels(data.models)

        }else{
          console.error(response);
        };
      };



    return(
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name:</th>
                <th>Manufacturer:</th>
                <th>Photo:</th>
              </tr>
            </thead>
            <tbody>
            { models.map( model => {
              return (

                      <tr key={model.id}>
                        <td>{ model.name }</td>
                        <td>{ model.manufacturer.name }</td>
                        <td><img src={ model.picture_url } width="100" height="100"/></td>

                      </tr>
                    );
                  })}
            </tbody>
          </table>
          <Link className="btn btn-primary" to="/models/new">Add a New Vehicle Model</Link>
        </>
        )
}

export default VehicleList;
