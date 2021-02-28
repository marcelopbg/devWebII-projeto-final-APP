import React, { useEffect, useState } from 'react';
import authHeader from '../services/auth.header';
import backendURL from '../services/backend.url';
import axios from 'axios';
import HousesListFilter from './HousesListFilter'

const dateFormat = (input) => {
    const date = input;
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
}

function HousesList() {
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    const [stateFilter, setStateFilter] = useState(null);
    const [cityFilter, setCityFilter] = useState(null);
    const [districtFilter, setDistrictFilter] = useState(null);
    const [priceFromFilter, setPriceFromFilter] = useState(null);
    const [priceToFilter, setPriceToFilter] = useState(null);
    const [bathroomQuantityFilter, setBathroomQuantityFilter] = useState(null);
    const [roomQuantityFilter, setRoomQuantityFilter] = useState(null);
    const [balconyQuantityFilter, setBalconyQuantityFilter] = useState(null);
    const [carSpotQuantityFilter, setCarSpotQuantityFilter] = useState(null);
    const [dateFromFilter, setDateFromFilter] = useState(null);
    const [dateToFilter, setdateToFilter] = useState(null);


    const judgeAvailability = (houses) => {
        let isAvailable = true;
        const today = new Date(new Date().setUTCHours(0, 0, 0));
        const availableForRentEndDate = new Date(houses.availableForRentEndDate)
        const availableForRentStartDate = new Date(houses.availableForRentStartDate)
        if (houses.rents.length > 0) {
            const rentStartDate = new Date(houses.rents[houses.rents.length -1].rentStartDate);
            if (rentStartDate >= today) {
                isAvailable = false
            }
        }
        if (availableForRentEndDate <= today) {
            isAvailable = false;
        }

        if (isAvailable) {
            return `${dateFormat(availableForRentStartDate)} até ${dateFormat(availableForRentEndDate)}`
        }
        else {
            return 'Não disponível'
        }
    }

    const moneyFormat = (doubleInput) => {
        return new Number(doubleInput).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
    const handleSearch = () => {
        setIsLoading(true);
        let params = {}
        if (cityFilter) {
            params.city = cityFilter;
        }
        if (stateFilter) {
            params.state = stateFilter
        }
        if (districtFilter) {
            params.district = districtFilter;
        }
        if (priceFromFilter && priceToFilter) {
            params.price = ['between', priceFromFilter, priceToFilter]
        }
        if (bathroomQuantityFilter) {
            params.bathroomQuantity = bathroomQuantityFilter;
        }
        if (roomQuantityFilter) {
            params.roomQuantity = roomQuantityFilter;
        }
        if (balconyQuantityFilter) {
            params.balconyQuantity = balconyQuantityFilter;
        }
        if (carSpotQuantityFilter) {
            params.carSpotQuantity = carSpotQuantityFilter;
        }
        if (dateFromFilter && dateToFilter) {
            params.date = ['dateRangeBetween', dateFromFilter, dateToFilter]
        }
        axios(backendURL + "/api/house", { params: params, headers: authHeader() }).then(response => {
            setIsEmpty(false);
            setContent(response.data);
            setIsLoading(false);
            if (response.data.length == 0) {
                setIsEmpty(true);
            }
        })
        setIsLoading(false);
    }

    useEffect(() => {
        axios(backendURL + "/api/house", { headers: authHeader() }).then(response => {
            setIsEmpty(false);
            setContent(response.data);
            setIsLoading(false);
            if (response.data.length == 0) {
                setIsEmpty(true);
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

            <HousesListFilter
                stateFilterSetter={setStateFilter}
                cityFilterSetter={setCityFilter}
                districtFilterSetter={setDistrictFilter}
                priceFromFilterSetter={setPriceFromFilter}
                priceToFilterSetter={setPriceToFilter}
                bathroomQuantityFilterSetter={setBathroomQuantityFilter}
                roomQuantityFilterSetter={setRoomQuantityFilter}
                balconyQuantityFilterSetter={setBalconyQuantityFilter}
                carSpotQuantityFilterSetter={setCarSpotQuantityFilter}
                dateToFilterSetter={setdateToFilter}
                dateFromFilterSetter={setDateFromFilter}
                searchAction={handleSearch}
            />
            {isLoading && (
                <React.Fragment>
                    <h1 className="text-center"> Carregando... </h1>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        <div className="loader"></div>
                    </div>
                </React.Fragment>
            )}
            {isEmpty && (
                <h1 className="text-center"> Nenhum resultado encontrado </h1>
            )}
            {!isLoading && content.length > 0 && (
                <div className="table-responsive-xl">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Foto</th>
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
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.map((values, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td> <img style={{ maxWidth: 100 }} src={values.imageUrl}></img></td>
                                        <td>{values.description} </td>
                                        <td>{values.state} </td>
                                        <td>{values.city} </td>
                                        <td>{values.district} </td>
                                        <td>{values.address} </td>
                                        <td>{moneyFormat(values.price)} </td>
                                        <td>{values.owner} </td>
                                        <td>{values.roomQuantity} </td>
                                        <td>{values.bathroomQuantity} </td>
                                        <td>{values.balconyQuantity} </td>
                                        <td>{values.carSpotQuantity} </td>
                                        <td>{judgeAvailability(values)} </td>
                                        <td><a href={`createRent/${values.id}`}> Cadastrar Aluguel </a> </td>
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