"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_js_1 = __importDefault(require("./userController.js"));
const userRouter = (0, express_1.Router)();
// List of users
userRouter.get('/', userController_js_1.default.listOfUsers);
// Create user
userRouter.post('/', userController_js_1.default.createUser);
//Get user
userRouter.get('/:id', userController_js_1.default.getUser);
// Update user
userRouter.put('/:id', userController_js_1.default.updateUser);
// Delete user
userRouter.delete('/:id', userController_js_1.default.deleteUser);
exports.default = userRouter;
