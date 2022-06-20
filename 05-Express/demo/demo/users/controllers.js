let users = [
    {id: 1, name: 'Dario'},
    {id: 2, name: 'Juan'},
    {id: 3, name: 'Pedro'},
    {id: 4, name: 'Pablo'},
    {id: 5, name: 'Jorge'},
];
let previusId = 5;

const getAllUsers=((req, res) => {
    res.json(users);
});
const getUserById= ((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res
        .status(404)
        .send(`Usuario con id ${id} no encontrado`);
    }
    res.json(user);
});
const createUser=(
    (req, res) => {
        const {name} = req.body;
        const user=
        {
            id : ++previusId,
            name : name
        }
        users.push(user);
        res.json(user);
    }
);
const updateUser=((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res
        .status(404)
        .send(`Usuario con id ${id} no encontrado`);
    }
    const { lastName } = req.body;
    user.lastName = lastName;
    res.json(user);
}
)
const deleteUser=(
    (req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (!user) {
            return res
            .status(404)
            .send(`Usuario con id ${id} no encontrado`);
        }
    users = users.filter((user) => user.id !== id);
    res.json(user);
    }
)
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}