import axiosInstance from './config';

export const orderService = {
    getAllOrders: () => axiosInstance.get('/orders/'),

    getOrderById: (id) => axiosInstance.get(`/orders/${id}/`),

    purchaseBook: (bookId) => axiosInstance.post(`/orders/${bookId}/purchase/`),

    borrowBook: (bookId) => axiosInstance.post(`/orders/${bookId}/borrow/`),

    returnBook: (bookId) => axiosInstance.post(`/orders/${bookId}/return_book/`),

    getBorrowedBooks: () => axiosInstance.get('/orders/borrowed/'),

    getPurchasedBooks: () => axiosInstance.get('/orders/purchased/'),

    handleApiError: (error) => {
        if (error.response) {
            throw new Error(error.response.data.message || 'Server error occurred');
        } else if (error.request) {
            throw new Error('No response from server. Please check your connection.');
        } else {
            throw new Error('Error making request. Please try again.');
        }
    }
};