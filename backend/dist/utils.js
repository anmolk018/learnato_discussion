"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.now = exports.id = void 0;
const nanoid_1 = require("nanoid");
const id = () => (0, nanoid_1.nanoid)(10);
exports.id = id;
const now = () => new Date().toISOString();
exports.now = now;
