import React, { useEffect, useState } from 'react';
import authHeader from '../services/auth.header';
import backendURL from '../services/backend.url';
import axios from 'axios';

const dateFormat = (input) => {
    const date = new Date(input);
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
}

function HousesList() {
    const [content, setContent] = useState(null);

    useEffect(() => {
        axios(backendURL+"/api/house", { headers: authHeader() }).then(response => {
            setContent(response.data);
        })
    }, []);

    return (
        <div>
            <h4> Listagem de Imóveis </h4>
            {content && (
                <div className="table-responsive-xl">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Cidade</th>
                                <th scope="col">Bairro</th>
                                <th scope="col">Endereço</th>
                                <th scope="col">Aluguel</th>
                                <th scope="col">Responsável</th>
                                <th scope="col">Qtd de Quartos</th>
                                <th scope="col">Qtd de Banheiros</th>
                                <th scope="col">Qtd de Sacadas</th>
                                <th scope="col">Qtd de Vagas</th>
                                <th scope="col">Disponibílidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.map((values, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{values.description} </td>
                                        <td>{values.state} </td>
                                        <td>{values.city} </td>
                                        <td>{values.district} </td>
                                        <td>{values.address} </td>
                                        <td>{values.price} </td>
                                        <td>{values.owner} </td>
                                        <td>{values.roomQuantity} </td>
                                        <td>{values.bathroomQuantity} </td>
                                        <td>{values.balconyQuantity} </td>
                                        <td>{values.carSpotQuantity} </td>
                                        <td>{`${dateFormat(values.availableForRentStartDate)} até ${dateFormat(values.availableForRentEndDate)} `} </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default HousesList;