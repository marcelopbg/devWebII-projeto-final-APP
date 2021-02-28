import React, { useEffect, useState } from "react";
import authHeader from "../services/auth.header";
import backendURL from "../services/backend.url";
import axios from "axios";
import { redirectIfUnauthenticated } from "../services/auth.service";

function CreateRent(props) {

  const [house, setHouse] = useState(undefined);
  const [houseId, setHouseId] = useState(undefined);
  const [tenant, setTenant] = useState(null);
  const [tenantPhone, setTenantPhone] = useState(null);
  const [tenantDocument, setTenantDocument] = useState(null);
  const [tenantEmail, setTenantEmail] = useState(null);
  const [rentStartDate, setRentStartDate] = useState(null);
  const [rentEndDate, setRentEndDate] = useState(null);

  useEffect(() => {
    redirectIfUnauthenticated(props);
    setHouseId(props.match.params.id);
    axios(backendURL + "/api/house", {
      method: "get",
      headers: authHeader(),
    })
      .then(response => {
        if (response.data.length > 0) {
          const filteredHouse = response.data.filter(val => val.id == props.match.params.id);
          setHouse(filteredHouse[0]);
          if(!isHouseAvailable(filteredHouse[0]))
          {
            alert('O imóvel não está disponível!')
            props.history.push("/houses")
          }
        }
      })
  }, []);

  const isHouseAvailable = (houses) => {
    let isAvailable = true;
    const today = new Date(new Date().toISOString().slice(0, 10));
    const availableForRentEndDate = new Date(houses.availableForRentEndDate)
    if (houses.rents.length > 0) {
        const rentStartDate = new Date(houses.rents[houses.rents.length -1].rentStartDate);
        if (rentStartDate <= today) {
            isAvailable = false
        }
    }
    if (availableForRentEndDate <= today) {
        isAvailable = false;
    }
        return isAvailable; 
}

  const handleClick = (event) => {
    event.preventDefault();
    axios(backendURL + "/api/rent", {
      method: "post",
      data: {
        house_id: houseId,
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
      {house && (

        <form onSubmit={handleClick} className="pb-5">
          <div class="jumbotron d-flex">
            <div class="">
              <h5> Imóvel: </h5>
              <b> Descrição:  </b> {house.description}  <br />
              <b> Localidade:  </b> {house.state}, {house.city}, {house.district} <br />
              <b> Endereço:  </b> {house.address} <br />
            </div>
            <div class="ml-auto">
              {house.imageUrl && (
                <img src={house.imageUrl} style={{ maxWidth: 300 }} />
              )}
            </div>
          </div>
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
                min={new Date(house.availableForRentStartDate).toISOString().slice(0, 10)}
                max={new Date(house.availableForRentEndDate).toISOString().slice(0, 10)}
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
                min={new Date(house.availableForRentStartDate).toISOString().slice(0, 10)}
                max={new Date(house.availableForRentEndDate).toISOString().slice(0, 10)}
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
      )}
    </div>
  );
}

export default CreateRent;
