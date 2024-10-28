"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql3_data_1 = require("../sql3-data");
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.body.name;
                const age = req.body.age;
                if (name && age) {
                    const user = { name, age: parseInt(age) };
                    res.status(201).json(yield (0, sql3_data_1.addUser)(user));
                }
                else {
                    res.status(400).json({ message: 'Name and age are required' });
                }
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const success = yield (0, sql3_data_1.deleteUser)(id);
                if (success) {
                    res.status(204).end();
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield (0, sql3_data_1.getUserById)(id);
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ message: "User not found" });
                }
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
    listOfUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield (0, sql3_data_1.getUsers)());
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updatedData = {};
                for (let key in req.body) {
                    updatedData[key] = key === 'age' ? parseInt(req.body[key]) : req.body[key];
                }
                const updatedUser = yield (0, sql3_data_1.updateUser)(id, updatedData);
                if (updatedUser) {
                    res.status(200).json(updatedUser);
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            catch (e) {
                res.status(500).json(e);
                console.log(e);
            }
        });
    }
}
;
exports.default = new UserController();
