import axios, {AxiosResponse} from 'axios';
import DetailedDateInfo from '@/types/DetailedDateInfo';
import BuyInfo from "@/types/BuyInfo";
import Product from "@/types/Product";
import ResponseInfo from "@/types/ResponseInfo";

const apiClient = axios.create({
    baseURL: 'http://localhost:3030',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export function getAllDates(): Promise<DetailedDateInfo[]> {
    return apiClient.get('/list-dates')
        .then(response => {
            if (response.status !== 200) {
                throw Error('Looks like there was a problem. Status Code: ' + response.status);
            }
            return response.data;
        })
}
export function readDate(newDate: string): Promise<BuyInfo[]> {
    return apiClient.get(`/read-date?date=${newDate}`)
        .then(response => {
            if (response.status !== 200) {
                throw Error('Looks like there was a problem. Status Code: ' + response.status);
            }
            return response.data;
        })
}
export function postEvent(event: any) { // new post request
    return apiClient.post('/events', event)
        .then(response => {
            if (response.status !== 200) {
                throw Error('Looks like there was a problem. Status Code: ' + response.status);
            }
            return response.data;
        });
}
export function createBuy(dataSuffix: string): Promise<ResponseInfo> {
    return apiClient.get('/save-buy?' + dataSuffix)
        .then(response => {
            if (response.status !== 200) {
                throw Error('Looks like there was a problem. Status Code: ' + response.status);
            }
            return response.data;
        });
}
export function deleteBuy(dataSuffix: string): Promise<BuyInfo[]> {
    return apiClient.get('/remove-buy?' + dataSuffix)
        .then(response => {
            if (response.status !== 200) {
                throw Error('Looks like there was a problem. Status Code: ' + response.status);
            }
            return response.data;
        });
}
export function getProductNames(): Promise<string[]> {
    return apiClient.get('/get-product-names')
        .then(response => {
            if (response.status !== 200) {
                throw Error('Looks like there was a problem. Status Code: ' + response.status);
            }
            return response.data;
        });
}
export function getProductDefaults(): Promise<Array<string | Product>> {
    return apiClient.get('/get-product-defaults')
        .then(response => {
            if (response.status !== 200) {
                throw Error('Looks like there was a problem. Status Code: ' + response.status);
            }
            return response.data;
        });
}
export function createProduct(dataSuffix: string): Promise<Product[]> {
    return apiClient.get(`/save-product?${dataSuffix}`)
        .then(response => {
            if (response.status !== 200) {
                throw Error('Looks like there was a problem. Status Code: ' + response.status);
            }
            return response.data;
        })
}
export function removeProduct(dataSuffix: string): Promise<ResponseInfo> {
    return apiClient.get(`/remove-product?${dataSuffix}`)
        .then(response => {
            if (response.status !== 200) {
                throw Error('Looks like there was a problem. Status Code: ' + response.status);
            }
            return response.data;
        })
}
// getEvent(id) {
//     return apiClient.get('/events/' + id)
// }
