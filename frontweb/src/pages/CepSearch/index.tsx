import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

type FormData = {
  cep: string;
}

type Address = {
  logradouro: string;
  localidade: string;
}


const CepSearch = () => {

  const [address, setAddress] = useState<Address>();

  const [FormData, setFormData] = useState<FormData>({
    cep: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log("Mudou para: " + event.target.value);
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...FormData, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //console.log("Clicou no botão!");

    axios.get(`https://viacep.com.br/ws/${FormData.cep}/json/`)
      .then((response) => {
        setAddress(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setAddress(undefined);
        console.log(error);
      });
  }

  return (
    <div className="cep-search-container">
      <h1 className="text-primary">Busca CEP</h1>
      <div className="container search-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="cep"
              value={FormData.cep}
              className="search-input"
              placeholder="CEP (somente números)"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Buscar
            </button>
          </div>
        </form>
        {address &&
          <>
            <ResultCard title="Logradouro" description={address.logradouro} />
            <ResultCard title="Localidade" description={address.localidade} />
          </>
        }
      </div>
    </div>
  );
};

export default CepSearch;
