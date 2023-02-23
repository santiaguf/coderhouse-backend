import { addUser, getUsers } from "../services/htmlWire.service.js";

export async function getHtml(req, res) {
    const users = await getUsers();
    res.status(200).json(users);
}

export async function postHtml(req, res) {
    const user = req.body;
    await addUser(user);
    res.redirect("/html-onwire");
}