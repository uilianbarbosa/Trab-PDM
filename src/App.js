import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./table.css";

const App = () => {
  const { register, handleSubmit, errors } = useForm();
  const [lista, setLista] = useState([]);
  const [cli_id, setCli_id] = useState(0);
  const [atendendo, setAtendendo] = useState("");
  const [preferencial, setPreferencial] = useState(false);

  const onSubmit = (data, e) => {
    const fila = localStorage.getItem("fila")
      ? JSON.parse(localStorage.getItem("fila"))
      : "";

    data.id = new Date().getTime();

    let preferencia = "";

    if (preferencial) {
      preferencia = "Preferencial";
    } else {
      preferencia = "Normal";
    }

    data.preferencia = preferencia;

    console.log(preferencia);

    localStorage.setItem("fila", JSON.stringify([...fila, data]));

    setLista([...lista, data]);

    setPreferencial(false);
    e.target.reset();
  };

  useEffect(() => {
    setLista(
      localStorage.getItem("fila") ? JSON.parse(localStorage.getItem("fila")) : []
    );
  }, []);

  const handleAtender = (data, e) => {
    if (lista.length === 0) {
      alert("Nenhum cliente na fila");
      setAtendendo("");
    } else {
      setAtendendo(lista[0].nome);

      const id = lista[0].id;

      const novaLista = lista.filter((el) => el.id !== id);

      localStorage.setItem("fila", JSON.stringify(novaLista));

      setLista(novaLista);
    }
  };

  const handlePreferencial = (data, e) => {
    const atender = lista.filter((el) => el.preferencia === "Preferencial");
    console.log(atender);

    if (atender.length > 0) {
      setAtendendo(atender[0].nome);

      const id = atender[0].id;

      const novaLista = lista.filter((el) => el.id !== id);

      localStorage.setItem("fila", JSON.stringify(novaLista));

      setLista(novaLista);
    } else {
      alert("Nenhum cliente na fila Preferencial");
      setAtendendo("");
    }
  };

  return (
    <div className="">
      <div className="row">
        <div className="col-sm-12 bg-primary">
          <h1 className="text-white ml-5">Banco Avenida</h1>
          <h2 className="text-white ml-5">Controle da fila e Preferenciais</h2>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <img
              src="fila.jpg"
              alt="banco avenida"
              className="img-fluid mx-auto d-block"
            />
          </div>
          <div className="col-sm-9 mt-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Nome:</span>
                </div>
                <input
                  type="text"
                  name="nome"
                  className="form-control"
                  ref={register({ required: true, maxLength: 30, minLength: 2 })}
                />
                <div className=" ml-2 input-group-prepend">
                  <span className="input-group-text">Idade:</span>
                </div>
                <input
                  type="number"
                  name="idade"
                  className="form-control"
                  ref={register({ required: true, min: 0, max: 130 })}
                />
              </div>

              <div className="input-group-append">
                <div className="form-check">
                  <label className="form-check-label mr-4">Preferêncial</label>

                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="Prioritário"
                    checked={preferencial}
                    onChange={({ target }) => setPreferencial(target.checked)}
                    id="prioritario"
                    name="prioritario"
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-success ml-3"
                  value="Adicionar Cliente"
                  onClick={() => setCli_id(cli_id + 1)}
                />
              </div>
            </form>

            <div className={(errors.nome || errors.idade) && "alert alert-danger"}>
              {errors.nome && (
                <span>Nome deve contar entre 3 e 40 caractéres; </span>
              )}
              {errors.idade && <span>Idade deve ser entre 1 à 120 anos</span>}
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-sm-12">
            <h4>
              Em atendimento: <h4 className="text-success">{atendendo}</h4>
            </h4>
          </div>
        </div>

        <div className="row mt-1">
          <div className="col-sm-12">
            <div className="input-group-append mt-5 mb-3">
              <input
                type="submit"
                className="btn btn-primary"
                value="Atendimento Normal"
                onClick={handleAtender}
              />
              <input
                type="submit"
                className="ml-3 btn btn-info"
                value="Atendimento Preferencial"
                onClick={handlePreferencial}
              />
            </div>
            <h3>Fila Normal</h3>
            <table className="table table-striped mt-4">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>Atendimento</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((fila) => {
                  return (
                    <tr key={fila.id} data-id={fila.id}>
                      <td>{fila.nome}</td>
                      <td>{fila.idade}</td>
                      <td>{fila.preferencia}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
