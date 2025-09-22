
export interface ApiSuccess {
    message: string;
    status: number;
    success: boolean,
    data?: any;
}

export const formatSuccess = (response: any): ApiSuccess => {
    if (response.data) {
        return {
            message: response.data?.message || '=== data received from server ===',
            status: response.status,
            success: response.data?.success || (response.status === 200) || false,
            data: response.data,
        };
    }
    return {
        message: response.message || 'Unknown error',
        status: -1,
        success: false,
    };
};
