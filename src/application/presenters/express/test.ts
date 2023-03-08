import { Response } from "express";
import User from "../../../domain/entities/User";
import RegisterResponseDTO from "../../../interfaces/dtos/auth/RegisterResponseDTO";

export function registerSuccessReponse(res: Response, data: RegisterResponseDTO): Response {
    return res.status(200).json({
        status: "success",
        data: data
    })
}