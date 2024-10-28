import { addUser, deleteUser as _deleteUser, getUserById, getUsers, updateUser as _updateUser } from '../sql3-data';

class UserController {

    async createUser(req, res) {
        try { 
            const name = req.body.name;
            const age = req.body.age;
    
            if (name && age) {
                const user = {name, age: parseInt(age)};
                res.status(201).json(await addUser(user));
            }
            else {
                res.status(400).json({message: 'Name and age are required'});
            }
        } catch(e){
            res.status(500).json(e);
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const success = await _deleteUser(id);
    
            if (success) {
                res.status(204).end();
            } else {
                res.status(404).json({message: 'User not found'});
            }
        } catch(e){
            res.status(500).json(e);
        }
    }

    async getUser(req, res) {
        try {
            const {id} = req.params.id;
            const user = await getUserById(id);
    
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({message: "User not found"});
            }
        } catch(e){
            res.status(500).json(e);
        }
    }
 
    async listOfUsers(req, res) {
        try {
            res.status(200).json(await getUsers());
        } catch(e){
            res.status(500).json(e);
        }
    }

    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const updatedData = {};
    
            for (let key in req.body) {
                updatedData[key] = key === 'age' ? parseInt(req.body[key]) : req.body[key];
            }
    
            const updatedUser = await _updateUser(id, updatedData);
    
            if (updatedUser) {
                res.status(200).json(updatedUser);
            }
            else {
                res.status(404).json({message: 'User not found'});
            }
    
        } catch(e){
            res.status(500).json(e);
            console.log(e);
        }
    }
};


export default new UserController();
