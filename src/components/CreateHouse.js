import React, { useEffect, useState } from 'react';
import { fetchStates } from '../services/location'

function CreateHouse() {

    const [states, setStates] = useState(undefined);
    const [cities, setCities] = useState(undefined);
    const [city, setCity] = useState(undefined);
    const [state, setState] = useState(undefined);

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
        setState(event.target.value);
    }

    const handleCityChange = (event) => {
        setCity(event.target.value)
    }

    return (
        <div className="container">
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
                <input type="text" className="form-control form-control-sm" id="colFormLabelSm" placeholder="Digite o nome do Bairro" />
                <div className="row">
                    <div className="col-sm-3">
                        <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Valor do Aluguel:</b> </label>
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
                        <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Disponível de:</b> </label>
                        <input type="date" className="form-control form-control-sm" id="colFormLabelSm" />
                    </div>
                    <div className="col-sm-5">
                        <label htmlFor="colFormLabelSm" className="ol-form-label col-form-label-sm"> <b> Até: </b> </label>
                        <input type="date" className="form-control form-control-sm" id="colFormLabelSm" />
                    </div>
                </div>
            </form>
        </div>);
}

export default CreateHouse;