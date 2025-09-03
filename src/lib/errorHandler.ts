// Error handling utilities

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (error: unknown): { message: string; statusCode: number } => {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500
    };
  }

  return {
    message: 'خطای ناشناخته رخ داده است',
    statusCode: 500
  };
};

export const logError = (error: unknown, context?: string): void => {
  const errorInfo = handleError(error);
  
  console.error('Error occurred:', {
    message: errorInfo.message,
    statusCode: errorInfo.statusCode,
    context,
    timestamp: new Date().toISOString(),
    stack: error instanceof Error ? error.stack : undefined
  });
};

export const createErrorResponse = (message: string, statusCode: number = 500) => {
  return {
    success: false,
    error: {
      message,
      statusCode
    }
  };
};

export const createSuccessResponse = <T>(data: T, message?: string) => {
  return {
    success: true,
    data,
    message
  };
};
