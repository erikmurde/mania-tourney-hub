import { useContext, useEffect } from 'react';
import { AuthContext } from './Root';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/authService';

const Callback = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const service = new AuthService();

    useEffect(() => {
        service.getUser('0')
            .then(user => setUser(user))
            .then(() => navigate('/'));
    });

    return (<></>);
}

export default Callback;