import React, { useEffect, useState } from 'react';
import authHeader from '../services/auth.header';
import backendURL from '../services/backend.url';
import axios from 'axios';

const dateFormat = (input) => {
    const date = new Date(input);
    return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
function HousesList() {
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsempty] = useState(false);

    useEffect(() => {
        axios(backendURL + "/api/house", { headers: authHeader() }).then(response => {
            setContent(response.data);
            setIsLoading(false);
            if (!response.data) {
                setIsempty(true);
            }
        })
    }, []);

    return (
        <div>

            <div className="d-flex m-2">
                <h4> Listagem de Imóveis </h4>
                <div className="ml-auto">
                    <button type="button" className="btn btn-outline-primary btn-sm ml-2" data-toggle="modal" data-target="#myModal">
                        <i className="fa fa-search mr-1"></i>
                        Pesquisar
                    </button>
                </div>
            </div>
            <div className="modal" id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title"> Filtrar imóveis </h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body ml-4 mr-4">
                            <form>
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Estado: </b> </label>
                                <input type="text" className="form-control form-control-sm" id="colFormLabelSm" />
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Cidade: </b> </label>
                                <input type="text" className="form-control form-control-sm" id="colFormLabelSm" />
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Bairro: </b> </label>
                                <input type="text" className="form-control form-control-sm" id="colFormLabelSm" />
                                <div className="row">
                                <div className="col-sm-3">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Preço de:</b> </label>
                                        <input type="number" className="form-control form-control-sm" id="colFormLabelSm" />
                                    </div>
                                    <div className="col-sm-3">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Até: </b> </label>
                                        <input type="number" className="form-control form-control-sm" id="colFormLabelSm" />
                                    </div>
                                </div>
                                <div className="row">
                                <div className="col-sm-3">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Qtd de Quartos:</b> </label>
                                        <input type="number" className="form-control form-control-sm" id="colFormLabelSm" />
                                    </div>
                                    <div className="col-sm-3">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Qtd de Banheiros: </b> </label>
                                        <input type="number" className="form-control form-control-sm" id="colFormLabelSm" />
                                    </div>
                                    <div className="col-sm-3">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Qtd de Sacadas: </b> </label>
                                        <input type="number" className="form-control form-control-sm" id="colFormLabelSm" />
                                    </div>
                                    <div className="col-sm-3">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Qtd de Vagas: </b> </label>
                                        <input type="number" className="form-control form-control-sm" id="colFormLabelSm" />
                                    </div>
                                </div>
                                <div className="row">
                                <div className="col-sm-5">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Date de:</b> </label>
                                        <input type="date" className="form-control form-control-sm" id="colFormLabelSm" />
                                    </div>
                                    <div className="col-sm-5">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Até: </b> </label>
                                        <input type="date" className="form-control form-control-sm" id="colFormLabelSm" />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button> */}
                            <button type="button" className="btn btn-success" data-dismiss="modal"> Pesquisar </button>
                        </div>
                    </div>
                </div>
            </div>

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
                                <th scope="col">Disponibilidade</th>
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