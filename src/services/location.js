const fetchStates = async () => {
    try {
        let response = await fetch('estados-cidades2.json')
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}
export {fetchStates}

