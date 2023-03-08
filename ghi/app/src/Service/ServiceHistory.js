import React, { useEffect, useState } from 'react';


function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [vinSearch, setVin] = useState('');

    const fetchAppointments = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    }

    const handleSearch = (event) => {
        if (vinSearch.length !== 0) {
            event.preventDefault();
        }
        const filteredAppointments = appointments.filter((appointment) =>
            appointment.vin.includes(vinSearch)
        );
        setAppointments(filteredAppointments)
        }

    useEffect(() => {
        fetchAppointments();
    }, []);


    return (
        <>
            <form onSubmit={handleSearch} className="input-group mb-3 mt-4">
                <input onChange={(e) => setVin(e.target.value)} type="search" className="form-control rounded" placeholder="Search by VIN" aria-label="Search" aria-describedby="search-addon" />
                <button type="submit" className="btn btn-outline-primary">search</button>
            </form>
            <h1 className="text-center mb-3 mt-3">Service History</h1>
            <table className="table table-striped">
                <thead>
                    <tr className="text-center">
                        <th>VIP</th>
                        <th>Automobile VIN</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Technician</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        return (
                        <tr key={appointment.id}>
                            {  appointment.vip ?
                                <td>VIP</td>:
                                <td></td>
                            }
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.customer_name }</td>
                            <td>{ new Date(appointment.date_time).toLocaleDateString("en-US") }</td>
                            <td>{ new Date(appointment.date_time).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            }) }</td>
                            <td>{ appointment.reason }</td>
                            <td>{ appointment.technician_name.technician_name }</td>
                            { appointment.finished ?
                                <td>Completed</td>:
                                <td></td>
                            }
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}
export default ServiceHistory;
