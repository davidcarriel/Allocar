import { toast } from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();
        console.log(name, email, password);

        try {
            const response = await axios.post('http://localhost:3000/users/signup',
                JSON.stringify({ name, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(response.data);
            toast.success('Cadastro efetuado com sucesso!');
            navigate('/signin')
        } catch (error) {
            if (!error?.response) {
                toast.error('Erro ao acessar o servidor');
            } else if (error.response.status === 401) {
                toast.error('Usuário ou senha inválidos');
            }
        }
    }

    return (
        <div className="login-form-wrap">
            <div>
                <h2><u>Allocar 🚗</u></h2>
                <h2>Faça seu cadastro</h2>
                <form className='login-form'>
                    <input type="text" name="name" placeholder="Nome" required onChange={(e) => setName(e.target.value)} />
                    <input type="email" name="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="password" placeholder="Senha" required onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="btn-login" onClick={(e) => registerUser(e)}>CADASTRAR</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;