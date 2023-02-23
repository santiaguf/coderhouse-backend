import { addUser, getUsers } from "../services/htmlWire.service.js";

export async function getHtml(req, res) {
    const users = await getUsers();
    res.render("html-onwire", { users });
}

export async function postHtml(req, res) {
    const user = req.body;
    await addUser(user);
    res.redirect("/html-onwire");
}