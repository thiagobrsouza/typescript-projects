import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import ResetPasswordService from "../services/ResetPasswordService";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";

export default class ResetPasswordController {

    public async create(request: Request, response: Response): Promise<Response> {
        const {token, password} = request.body;
        const resetPassword = new ResetPasswordService();
        await resetPassword.execute({password, token});
        return response.status(204).json();
    }

}
