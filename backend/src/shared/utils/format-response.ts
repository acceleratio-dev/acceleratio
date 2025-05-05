import { AppErrors } from "../errors/app-errors"

export type FormatedResponse<T> = {
    data: T,
    success: boolean,
    error?: {
        message: string | undefined,
        code: AppErrors | undefined
    }
}

export const formatResponse = <T>(data: T, error?: Error, error_code?: AppErrors): FormatedResponse<T> => {
    return {
        data: data,
        success: error ? false : true,
        error: error ? {
            message: error?.message,
            code: error_code || AppErrors.INTERNAL_SERVER_ERROR
        } : undefined
    }
}