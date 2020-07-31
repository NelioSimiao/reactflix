import React, { useState } from "react";
import PageDefault from "../../../components/pageDefault";
import { Link } from "react-router-dom";
import FormField from "../../../components/Fields/FormField";

function CadastroCategoria() {
  const valoresIniciais = {
    nome: "",
    descricao: "",
    cor: ""
  };
  const [categorias, setCategorias] = useState([]);
  const [values, setValuesStates] = useState(valoresIniciais);

  function setValue(chave, valor) {
    //chave: nome,descricao
    setValuesStates({
      ...values,
      [chave]: valor // nome: 'valor'
    });
  }

  function handleChange(infosDoEvento) {
    setValue(
      infosDoEvento.target.getAttribute("name"),
      infosDoEvento.target.value
    );
  }
  return (
    <PageDefault>
      <h1> Cadastro de Categoria {values.nome}</h1>

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
          type="?????"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        {/*<div>
          <label>
            Nome da Categoria:
            <input
              type="text"
              value={nomeCategoria}
              onChange={function(event) {
                setNomeCategoria(event.target.value);
              }}
            />
          </label>
            </div>*/}

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <button>Cadastrar</button>
      </form>
      <ul>
        {categorias.map((categoria, indice) => {
          return <li key={`${categoria}${indice}`}>{categoria.nome}</li>;
        })}
      </ul>

      <Link to="/">Ir para Home</Link>
    </PageDefault>
  );
}
export default CadastroCategoria;
