import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [request, setRequest] = useState({
    user_id: null,
    admin_id: null,
    car_id: null,
    start_date: '',
    end_date: '',
  });

  const navigate = useNavigate();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cars/list');
        setCars(response.data);
      } catch (error) {
        console.error('Erro ao buscar carros:', error);
      }
    };

    fetchCars();
  }, []);

  const requestCar = async (e, carId) => {
    e.preventDefault();

    setRequest({
      user_id: user.id,
      admin_id: 1,
      car_id: carId,
      start_date: startDate,
      end_date: endDate,
    });

    try {
      await axios.post('http://localhost:3000/requests/create', request)
      toast.success('Requisição efetuada com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer requisição:', error);
    }
  }

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  }

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    setUser(null);
    Cookies.remove('user');
    navigate('/signin')
  };

  const getRequisitions = () => {
    navigate('/requests');
  }

  return (
    <div className="my-component">
      {user ? (
        <div>
          <h2>Bem-vindo de volta, {user.name}!</h2>
          <button type="submit" className='btn-logout' onClick={getRequisitions}>Suas requisições</button>

          <div className="car-list">
            <h3>Carros Disponíveis para Alocação</h3>
            
            <ul className="car-ul">
              {cars.map((car) => (
                <li key={car.car_id} className="car-item">
                  <div className="car-info">
                    <div className='car-info__photo-details'>
                      <img src={car.photo_url} alt={`Foto de ${car.brand} ${car.model}`} />
                      <div className="car-details">
                        <h3>{car.brand} {car.model}</h3>
                        <p>Ano: {car.year}</p>
                        <p>Cor: {car.color}</p>
                      </div>
                    </div>

                    <div className="date-input-container">
                      <div>
                        <label htmlFor={`start_date_${car.car_id}`}>Início:</label>
                        <input type="date" id={`start_date_${car.car_id}`} name={`start_date_${car.car_id}`} value={startDate} onChange={handleStartDateChange} />
                      </div>
                      <div>
                        <label htmlFor={`end_date_${car.car_id}`}>Fim:</label>
                        <input type="date" d={`end_date_${car.car_id}`} name={`end_date_${car.car_id}`} value={endDate} onChange={handleEndDateChange} />
                      </div>
                    </div>

                    <button type="submit" onClick={(e) => requestCar(e, car.car_id)}>Solicitar</button>
                  </div>
                </li>
              ))}
            </ul>
            <button type="submit" className='btn-logout' onClick={(e) => handleLogout(e)}>SAIR</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Você não está logado.</h2>
          <h2><Link to="/signin">Fazer login</Link></h2>
        </div>
      )}
    </div>
  );
};

export default Home;
