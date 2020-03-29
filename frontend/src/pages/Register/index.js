import React, { useState } from 'react';

import {Link ,useHistory} from 'react-router-dom';

//estilos
import './style.css';

//assets
import logoImg from '../../assets/logo.svg';
import {FaArrowLeft} from 'react-icons/fa';

//api
import api from '../../services/api';


function Register(){

    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');


    async function handleRegister(e){
        
        e.preventDefault();
        /**console.log({

            name,
            email,
            whatsapp,
            city,
            uf,
        }); */

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        const response = await api.post('ongs',data);
        try{
            alert(`Seu ID de acesso:${response.data.id}`);
            history.push('/');
        }catch(err){
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return(
        
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e  ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                    <FaArrowLeft size={16} color="#E02041"/>
                    Já tenho cadastro
                </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <input 
                    placeholder="E-mail"
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    />
                    <input 
                    placeholder="Whatsapp"
                    value={whatsapp}
                    onChange={e=> setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                        placeholder="Cidade"
                        value={city}
                        onChange={e=>setCity(e.target.value)}
                        />
                        <input 
                        placeholder="UF" style={{width:80}}
                        value={uf}
                        onChange={e=>setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>

    );
}



export default Register;