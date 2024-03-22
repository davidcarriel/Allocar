import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Requests = () => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = Cookies.get('user');

        if (storedUser) {
            try {
                const userObject = JSON.parse(storedUser);
                setUser(userObject);
            } catch (error) {
                console.error('Erro ao fazer parse do JSON:', error);
            }
        }
    }, []);

    const [request, setRequest] = useState(null);
    useEffect(() => {
        const fetchRequest = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/requests/list/${user.id}`, user.id);
            setRequest(response.data);
          } catch (error) {
            console.error('Erro ao buscar requisições:', error);
          }
        };
        fetchRequest();
      }, []);

    return (
        <div>
            <h1>Requests</h1>
            {user ? (
                <div>Olá, {user.name}</div>
            ) : (
                <div>
                    <h2>Você não está logado.</h2>
                    <h2><Link to="/signin">Fazer login</Link></h2>
                </div>
            )}
        </div>
    );
}

export default Requests