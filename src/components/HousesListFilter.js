import React, { useEffect, useState } from 'react';
import { fetchStates } from '../services/location'

// import { Container } from './styles';


function HousesListFilter(props) {


    const [states, setStates] = useState(undefined);
    const [cities, setCities] = useState(undefined);

    useEffect(() => {
        fetchStates().then(response => {
            setStates(response.states);
        })
    }, [])

    const handleStateChange = (event) => {
        const stateKey = Object.entries(states).filter(value => value[1] == event.target.value)[0][0];
        fetchStates().then(response => {
            setCities(response.cities.filter(cities => cities.state_id == stateKey));
        })
        props.stateFilterSetter(event.target.value);
    }

    const handleCityChange = (event) => {
        props.cityFilterSetter(event.target.value)
    }

    
    
        return <div className="modal" id="myModal">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title"> Filtrar imóveis </h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>

                <div className="modal-body ml-4 mr-4">
                    <form>
                        <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Estado: </b> </label>
                        <select className="ol-form-label col-form-label-sm form-control" onChange={handleStateChange}>
                            <option selected disabled> Selecione um Estado </option>
                            {states && Object.values(states).map((value, index) => {
                                return <option key={index} value={value}> {value} </option>;
                            })}
                        </select>
                        <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Cidade: </b> </label>
                        <select className="ol-form-label col-form-label-sm form-control" onChange={handleCityChange}>
                            <option selected disabled> Selecione uma Cidade </option>
                            {cities && cities.map((value, index) => {
                                return <option key={index} value={value.name}> {value.name} </option>;
                            })}
                        </select>
                        <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Bairro: </b> </label>
                        <input type="text" className="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => props.districtFilterSetter(event.target.value)}/>
                        <div className="row">
                            <div className="col-sm-3">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Preço de:</b> </label>
                                <input type="number" className="form-control form-control-sm" id="colFormLabelSm"     onChange={(event) => props.priceFromFilterSetter(event.target.value)}/>
                            </div>
                            <div className="col-sm-3">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Até: </b> </label>
                                <input type="number" className="form-control form-control-sm" id="colFormLabelSm"     onChange={(event) => props.priceToFilterSetter(event.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Qtd de Quartos:</b> </label>
                                <input type="number" className="form-control form-control-sm" id="colFormLabelSm"     onChange={(event) => props.roomQuantityFilterSetter(event.target.value)}/>
                            </div>
                            <div className="col-sm-3">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Qtd de Banheiros: </b> </label>
                                <input type="number" className="form-control form-control-sm" id="colFormLabelSm"     onChange={(event) => props.bathroomQuantityFilterSetter(event.target.value)}/>
                            </div>
                            <div className="col-sm-3">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Qtd de Sacadas: </b> </label>
                                <input type="number" className="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => props.balconyQuantityFilterSetter(event.target.value)}/>
                            </div>
                            <div className="col-sm-3">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Qtd de Vagas: </b> </label>
                                <input type="number" className="form-control form-control-sm" id="colFormLabelSm"     onChange={(event) => props.carSpotQuantityFilterSetter(event.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-5">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Date de:</b> </label>
                                <input type="date" className="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => props.dateFromFilterSetter(event.target.value)} />
                            </div>
                            <div className="col-sm-5">
                                <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Até: </b> </label>
                                <input type="date" className="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => props.dateToFilterSetter(event.target.value)}/>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="modal-footer">
                    {/* <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button> */}
                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => props.searchAction()}> Pesquisar </button>
                </div>
            </div>
        </div>
    </div>;
}

export default HousesListFilter;