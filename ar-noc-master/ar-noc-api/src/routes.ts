import { Router } from "express";
import { customerRoute } from "./controller/customerController";
import { groupRoute } from "./controller/groupController";

export const routes = Router();

routes.use('/groups', groupRoute);
routes.use('/customers', customerRoute);