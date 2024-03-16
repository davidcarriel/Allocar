import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

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

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, password);

        try {
            const response = await axios.post(
                'http://localhost:3000/users/signin',
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            console.log(response.data);
            setUser(response.data);
            console.log(user);
            toast.success('Login efetuado com sucesso!');
            Cookies.set('user', JSON.stringify(response.data));
            navigate('/home');
        } catch (error) {
            if (!error?.response) {
                toast.error('Erro ao acessar o servidor');
            } else if (error.response.status === 401) {
                toast.error('Usuário ou senha inválidos');
            }
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    }

    return (
        <div className="login-form-wrap">
            <div>
                <h2><u>Allocar 🚗</u></h2>
                <h2>Faça seu login </h2>
                <form className="login-form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="btn-login"
                        onClick={(e) => handleLogin(e)}
                    >
                        INICIAR SESSÃO
                    </button>
                    <button
                        type="submit"
                        className="btn-login"
                        onClick={(e) => handleSignUp(e)}
                    >
                        CRIAR CONTA
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
