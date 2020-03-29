import React,{useState} from 'react';
import {Link , useHistory} from 'react-router-dom';
import api from '../../services/api';

//estilo
import './style.css';

//assets
import logoImg from '../../assets/logo.svg';
import {FaArrowLeft} from 'react-icons/fa';


function NewIncident(){

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');

    async function handleNewIncident(e){
        e.preventDefault();

        const data={
            title,
            description,
            value,
        };

        try{
            await api.post('incidents',data,{
                headers:{
                    Authorization:ongId,
                }
            });
            history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um novo herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                    <FaArrowLeft size={16} color="#E02041"/>
                    Voltar
                </Link>
                </section>
                <form>
                    <input 
                    placeholder="Título do caso"
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                    />
                    <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={e=>setDescription(e.target.value)}>

                    </textarea>
                    <input 
                    placeholder="Valor"
                    value={value}
                    onChange={e=>setValue(e.target.value)}
                    />
                    <button onClick={handleNewIncident} className="button">Cadastrar</button>
                </form>
            </div>
        </div>

    );
}



export default NewIncident;