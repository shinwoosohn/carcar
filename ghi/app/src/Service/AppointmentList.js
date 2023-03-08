import React, { useEffect, useState } from 'react';

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [complete, setComplete] = useState(false);
    const [cancel, setCancel] = useState(false);

    const fetchAppointments = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    }

    const cancelAppointment = async (appointment) => {
        const url = `http://localhost:8080/api/appointments/${appointment.id}/`
        const fetchConfig = {
            method: "delete",
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setCancel(true);
            setComplete(false);
            fetchAppointments();
        } else {
            setCancel(false);
            setComplete(false);
        }
    }

    const completeAppointment = async (appointment) => {
        const url = `http://localhost:8080/api/appointments/${appointment.id}/`
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({ finished: true }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setCancel(false);
            setComplete(true);
            fetchAppointments();
        } else {
            setCancel(false);
            setComplete(false);
        }
    }


    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIP</th>
                        <th>Automobile VIN</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Technician</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        if (appointment.finished === false)
                        return (
                            <tr key={appointment.id}>
                                {appointment.vip === false &&
                                <td></td>
                                }
                                {appointment.vip === true &&
                                <td>VIP</td>
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
                                <td>
                                    <button id={ appointment.id } onClick={() => cancelAppointment(appointment)}
                                    type="button" className="btn btn-danger">
                                        Cancel
                                    </button>
                                    {"   "}
                                    <button id={ appointment.id } onClick={() => completeAppointment(appointment)}
                                    type="button" className="btn btn-success">
                                        Completed
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default AppointmentList;
