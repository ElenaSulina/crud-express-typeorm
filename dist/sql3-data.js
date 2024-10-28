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
exports.getUserById = exports.deleteUser = exports.updateUser = exports.addUser = exports.getUsers = void 0;
const data_source_1 = require("./data-source");
const User_1 = require("./User");
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userRepository.find();
        return users;
    }
    catch (err) {
        return null;
    }
});
exports.getUsers = getUsers;
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = userRepository.create(user);
    yield userRepository.save(newUser);
    return newUser;
});
exports.addUser = addUser;
const updateUser = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findOneBy({ id });
    if (!user) {
        return null;
    }
    userRepository.merge(user, updatedData);
    yield userRepository.save(user);
    return user;
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield userRepository.delete(id);
    return ((_a = result.affected) !== null && _a !== void 0 ? _a : 0) > 0;
});
exports.deleteUser = deleteUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findOneBy({ id });
    return user;
});
exports.getUserById = getUserById;
