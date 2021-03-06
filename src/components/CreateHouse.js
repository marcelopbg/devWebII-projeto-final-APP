import React, { useEffect, useState } from "react";
import { fetchStates } from "../services/location";
import authHeader from "../services/auth.header";
import backendURL from "../services/backend.url";
import axios from "axios";
import { redirectIfUnauthenticated } from "../services/auth.service";

function CreateHouse(props) {
  const [states, setStates] = useState(undefined);
  const [cities, setCities] = useState(undefined);

  const [city, setCity] = useState(undefined);
  const [state, setState] = useState(undefined);
  const [district, setDistrict] = useState(null);
  const [address, setAddress] = useState(null);
  const [price, setPrice] = useState(null);
  const [owner, setOwner] = useState(null);
  const [description, setDescription] = useState(null);
  const [bathroomQuantity, setBathroomQuantity] = useState(null);
  const [roomQuantity, setRoomQuantity] = useState(null);
  const [balconyQuantity, setBalconyQuantity] = useState(null);
  const [carSpotQuantity, setCarSpotQuantity] = useState(null);
  const [availableForRentStartDate, SetAvailableForRentStartDate] = useState(
    null
  );
  const [availableForRentEndDate, SetAvailableForRentEndDate] = useState(null);
  const [file, setFile] = useState(null);
  useEffect(() => {
    redirectIfUnauthenticated(props);
    fetchStates().then((response) => {
      setStates(response.states);
    });
  }, []);

  const handleStateChange = (event) => {
    const stateKey = Object.entries(states).filter(
      (value) => value[1] === event.target.value
    )[0][0];
    fetchStates().then((response) => {
      setCities(
        response.cities.filter((cities) => cities.state_id === +stateKey)
      );
    });
    setState(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const obj = {
      city,
      state,
      district,
      address,
      price,
      owner,
      description,
      bathroomQuantity,
      roomQuantity,
      balconyQuantity,
      carSpotQuantity,
      availableForRentStartDate,
      availableForRentEndDate,
      file: file
    };

    for (var [key, value] of Object.entries(obj)) {
      formData.append(key, value);
    }

    axios(backendURL + "/api/house", {
      method: "post",
      data: formData,
      headers: authHeader(), "Content-Type": "multipart/form-data",
    }).then((response) => {
      if (response.data.length == 0) {
        console.log("algo de errado no envio do formulário");
      } else {
        props.history.push("/")
      }
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleClick} className="pb-5">
        <label
          htmlFor="colFormLabelSm"
          className="ol-form-label col-form-label-sm"
        >
          <b> Estado: </b>
        </label>
        <select
          className="ol-form-label col-form-label-sm form-control"
          onChange={handleStateChange}
          required
        >
          <option selected disabled value={null}>
            Selecione um Estado
          </option>
          {states &&
            Object.values(states).map((value, index) => {
              return (
                <option key={index} value={value}>
                  {value}
                </option>
              );
            })}
        </select>
        <label
          htmlFor="colFormLabelSm"
          className="ol-form-label col-form-label-sm"
        >
          <b> Cidade: </b>
        </label>
        <select
          className="ol-form-label col-form-label-sm form-control"
          onChange={handleCityChange}
          required
        >
          <option selected disabled value={null}>
            Selecione uma Cidade
          </option>
          {cities &&
            cities.map((value, index) => {
              return (
                <option key={index} value={value.name}>
                  {value.name}
                </option>
              );
            })}
        </select>

        <div className="row">
          <div className="col-sm-6">
            <label
              htmlFor="colFormLabelSm"
              className="ol-form-label col-form-label-sm"
            >
              <b> Bairro: </b>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              placeholder="Digite o nome do Bairro"
              onChange={(event) => setDistrict(event.target.value)}
              required
            />
          </div>
          <div className="col-sm-6">
            <label
              htmlFor="colFormLabelSm"
              className="ol-form-label col-form-label-sm"
            >
              <b>Endereço: </b>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              placeholder="Endereço"
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <label
              htmlFor="colFormLabelSm"
              className="ol-form-label col-form-label-sm"
            >
              <b> Valor do Aluguel:</b>
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              min="0"
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </div>
          <div className="col-sm-3">
            <label
              htmlFor="colFormLabelSm"
              className="ol-form-label col-form-label-sm"
            >
              <b>Proprietário:</b>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              onChange={(event) => setOwner(event.target.value)}
              required
            />
          </div>

          <div className="col-sm-6">
            <label
              htmlFor="colFormLabelSm"
              className="ol-form-label col-form-label-sm"
            >
              <b>Descrição do imóvel:</b>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Digite a descrição do imóvel"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <label
              htmlFor="colFormLabelSm"
              className="ol-form-label col-form-label-sm"
            >
              <b> Qtd de Quartos:</b>
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              onChange={(event) => setRoomQuantity(event.target.value)}
              required
            />
          </div>
          <div className="col-sm-3">
            <label
              htmlFor="colFormLabelSm"
              className="ol-form-label col-form-label-sm"
            >
              <b> Qtd de Banheiros: </b>
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              onChange={(event) => setBathroomQuantity(event.target.value)}
              required
            />
          </div>
          <div className="col-sm-3">
            <label
              htmlFor="colFormLabelSm"
              className="ol-form-label col-form-label-sm"
            >
              <b> Qtd de Sacadas: </b>
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              onChange={(event) => setBalconyQuantity(event.target.value)}
              required
            />
          </div>
          <div className="col-sm-3">
            <label
              htmlFor="colFormLabelSm"
              className="ol-form-label col-form-label-sm"
            >
              <b> Qtd de Vagas: </b>
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              onChange={(event) => setCarSpotQuantity(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-5">
            <label
              htmlFor="colFormLabelSm"
              className="ol-form-label col-form-label-sm"
            >
              <b> Disponível de:</b>
            </label>
            <input
              type="date"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              onChange={(event) =>
                SetAvailableForRentStartDate(event.target.value)
              }
              required
            />
          </div>
          <div className="col-sm-5">
            <label
              htmlFor="colFormLabelSm"
              className="ol-form-label col-form-label-sm"
            >
              <b> Até: </b>
            </label>
            <input
              type="date"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              onChange={(event) =>
                SetAvailableForRentEndDate(event.target.value)
              }
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
        <label
              htmlFor="colFormLabelSm"
              className="ol-form-label col-form-label-sm"
            >
              <b> Selecione uma foto: </b>
            </label>
          <div className="custom-file">
            <input accept="image/png, image/jpeg" type="file" className={(file != null) ? "custom-file-input  is-valid" : "custom-file-input" }  id="validatedCustomFile" onChange={(event) => { setFile(event.target.files[0]) }} required />
            <label className="custom-file-label" for="validatedCustomFile">Choose file...</label>
            <div className="valid-feedback mt-2"><i className="fa fa-check"/> Upload Realizado com sucesso</div>
          </div>
        </div>
        </div>

        <div className="d-flex container">
          <div className="row mt-4 ml-auto">
            <button className="btn btn-primary" type="submit">
              Salvar imóvel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateHouse;
