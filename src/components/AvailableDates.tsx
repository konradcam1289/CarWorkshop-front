import React, { useEffect, useState } from 'react';
import appointmentsService from '../services/appointmentService';

const AvailableDates: React.FC = () => {
    const [dates, setDates] = useState<string[]>([]);

    useEffect(() => {
        appointmentsService.getAvailableDates().then(setDates);
    }, []);

    return (
        <ul>
            {dates.map((date, index) => (
                <li key={index}>{date}</li>
            ))}
        </ul>
    );
};

export default AvailableDates;
