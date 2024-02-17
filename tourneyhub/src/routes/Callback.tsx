import { useContext, useEffect } from 'react';
import { AuthContext } from './Root';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Callback = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const service = new authService();

    useEffect(() => {
        service.getUser()
            .then(user => setUser(user))
            .then(() => navigate('/'));
    });

    return (<></>);
}

export default Callback;