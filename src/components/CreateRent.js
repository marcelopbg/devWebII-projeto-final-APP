import React, { useEffect, useState } from "react";
import authHeader from "../services/auth.header";
import backendURL from "../services/backend.url";
import axios from "axios";

function CreateRent(props) {
  const [houses, setHouses] = useState(undefined);
  const [houseId, setHouseId] = useState(undefined);

  const [tenant, setTenant] = useState(null);
  const [tenantPhone, setTenantPhone] = useState(null);
  const [tenantDocument, setTenantDocument] = useState(null);
  const [tenantEmail, setTenantEmail] = useState(null);
  const [rentStartDate, setRentStartDate] = useState(null);
  const [rentEndDate, setRentEndDate] = useState(null);

  useEffect(() => {
    axios(backendURL + "/api/house", {
      method: "get",
      headers: authHeader(),
    }).then((response) => {
      if (response.data.length == 0) {
      } else {
        setHouses(response.data.map(e => {
          return {
            value: e.id,
            label: e.description
          }
        }))
      }
    });
  }, []);

  const handleStateChange = (event) => {
    setHouseId(houses.find(e => e.value == event.target.value))
  };

  const handleClick = (event) => {
    event.preventDefault();
    axios(backendURL + "/api/rent", {
      method: "post",
      data: {
        house_id: houseId.value,
        tenant,
        tenantPhone,
        tenantDocument,
        tenantEmail,
        rentStartDate,
        rentEndDate,
      },
      headers: authHeader(),
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
          <b> Imóvel: </b>
        </label>
        <select
          className="ol-form-label col-form-label-sm form-control"
          onChange={handleStateChange}
          required
        >
          <option selected disabled>
            Selecione um Estado
          </option>
          {houses &&
            Object.values(houses).map((house, index) => {
              return (
                <option key={index} value={house.value}>
                  {house.label}
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
              <b> Nome do locatário: </b>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              placeholder="Digite o nome do locatário"
              onChange={(event) => setTenant(event.target.value)}
              required
            />
          </div>
          <div className="col-sm-6">
            <label
              htmlFor="colFormLabelSm"
              className="ol-form-label col-form-label-sm"
            >
              <b>Telefone do locatário: </b>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              placeholder="Digite o telefone do locatário"
              onChange={(event) => setTenantPhone(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label
              htmlFor="colFormLabelSm"
              className="ol-form-label col-form-label-sm"
            >
              <b>Documento do locatário:</b>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              placeholder="Digite o documento do locatário"
              onChange={(event) => setTenantDocument(event.target.value)}
              required
            />
          </div>
          <div className="col-sm-6">
            <label
              htmlFor="colFormLabelSm"
              className="ol-form-label col-form-label-sm"
            >
              <b>Email do locatário:</b>
            </label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              placeholder="Digite o email do locatário"
              onChange={(event) => setTenantEmail(event.target.value)}
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
              <b> Alugado de:</b>
            </label>
            <input
              type="date"
              className="form-control form-control-sm"
              id="colFormLabelSm"
              onChange={(event) =>
                setRentStartDate(event.target.value)
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
                setRentEndDate(event.target.value)
              }
              required
            />
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

export default CreateRent;
