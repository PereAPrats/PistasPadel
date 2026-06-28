import { useEffect } from 'react';
import api from './api'; // Ajusta la ruta si cal

const ApiTest = () => {
    useEffect(() => {
        console.log("--- El component s'ha muntat ---");
        
        api.get('/prova')
            .then(res => console.log('✅ Resposta rebuda:', res.data))
            .catch(err => console.error('❌ Error de connexió:', err));
    }, []);

    return <div>Estic provant la connexió...</div>;
};

export default ApiTest;