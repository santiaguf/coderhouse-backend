function palabraDTO(palabr, _id, timestamp) {
    return {
        ...palabr,
        _id,
        timestamp
    }
}

export default palabraDTO;