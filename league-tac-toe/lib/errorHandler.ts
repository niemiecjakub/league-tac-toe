import { toast } from "react-toastify";
import axios from "axios";

export const handleServiceError = (error: unknown, customMessage?: string): never => {
    let errorMessage = customMessage || "An unexpected error occurred";

    if (axios.isAxiosError(error)) {
        if (error.response) {
            errorMessage = error.response.data?.message || error.response.data || `Error: ${error.response.status}`;
        } else if (error.request) {
            errorMessage = "No response from server. Please check your connection.";
        } else {
            errorMessage = error.message;
        }
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    toast.error(errorMessage);
    throw error;
};
