const operations = [];

const save = (obj) => operations.push(obj);

const getAll = () =>  operations;

export {
    save,
    getAll
};