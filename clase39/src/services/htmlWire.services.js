import usersModel from '../model/users.model.js';

export async function addUser(user) {
    await usersModel.addUser(user);
}

export async function getUsers() {
    return await usersModel.getUsers();
}