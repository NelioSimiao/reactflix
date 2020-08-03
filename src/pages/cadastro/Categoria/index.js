import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/pageDefault';
import FormField from '../../../components/Fields/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };
  const [categorias, setCategorias] = useState([]);
  const [values, setValuesStates] = useState(valoresIniciais);

  function setValue(chave, valor) {
    // chave: nome,descricao
    setValuesStates({
      ...values,
      [chave]: valor, // nome: 'valor'
    });
  }

  function handleChange(infosDoEvento) {
    setValue(
      infosDoEvento.target.getAttribute('name'),
      infosDoEvento.target.value,
    );
  }

  useEffect(() => {
    const URL_TOP = window.location.hostname.includes('localhost')
      ? 'http://localhost:3004/categorias'
      : 'https://devnelioflix.herokuapp.com/categorias';
    fetch(URL_TOP)
      .then(async (responseServer) => {
        const resposta = await responseServer.json();
        setCategorias([...resposta]);
        console.log(categorias);
      });
  }, []);

  return (
    <PageDefault>
      <h1>
        {' '}
        Cadastro de Categoria
        {' '}
        {values.nome}
      </h1>

      <form
        onSubmit={function handleSubmit(event) {
          event.preventDefault();
          setCategorias([...categorias, values]);
          setValuesStates(valoresIniciais);
        }}
      >
        <FormField
          label="Nome da Categoria"
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>Cadastrar</Button>
      </form>
      {categorias.length === 0 && (

        <div>
          Loading.....
        </div>
      )}

      <ul>
        {categorias.map((categoria, indice) => <li key={`${categoria}${indice}`}>{categoria.nome}</li>)}
      </ul>

      <Link to="/">Ir para Home</Link>
    </PageDefault>
  );
}
export default CadastroCategoria;
