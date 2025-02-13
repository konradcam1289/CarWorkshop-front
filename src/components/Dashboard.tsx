import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Witaj w panelu użytkownika!</h1>
            <p>Jesteś zalogowany do systemu warsztatu.</p>
            
            <button onClick={() => navigate('/services')}>Zobacz dostępne usługi</button>
            <button onClick={() => navigate('/')}>Wyloguj</button>
        </div>
    );
};

export default Dashboard;
