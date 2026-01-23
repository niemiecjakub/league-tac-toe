import axios from "@/lib/axios";
import { FeedbackRequest } from "@/models/Feedback";

export const submitFeedback = async (request: FeedbackRequest): Promise<boolean> => {
    try {
        const response = await axios.post("/Feedback", {
            sender: request.sender || null,
            message: request.message,
        });
        
        return response.status === 201;
    } catch (error) {
        return false;
    }
};
