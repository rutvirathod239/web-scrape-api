export const successResponse = (res, statusCode = 200, message, data = {}) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    })
}

export const errorResponse = (res, statusCode = 500, error) => {
    const errorMessage =  error instanceof Error ? error.message : error || "An error occurred";
    return res.status(statusCode).json({
        success: false,
        message: errorMessage
    })
}