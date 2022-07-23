import axios, { AxiosResponse } from 'axios';
import type DetailedDateInfo from '~~/types/DetailedDateInfo';
import type BuyInfo from '~~/types/BuyInfo';
import type Product from '~~/types/Product';
import type ResponseInfo from '~~/types/ResponseInfo';
import type PriceInfo from '~~/types/PriceInfo';
import type WeatherInfo from "~~/types/WeatherInfo";
import type WeatherError from "~~/types/WeatherError";
import type { ProductWithDate } from '~~/types/Product';

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
export function getProductDescriptions(): Promise<string[]> {
    return apiClient.get('/get-product-descriptions')
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
export function getProductTimelineData(dataSuffix: string): Promise<ProductWithDate[]> {
    return apiClient.get(`/product-timeline?${dataSuffix}`)
        .then(response => {
            if (response.status !== 200) {
                throw Error('Looks like there was a problem. Status Code: ' + response.status);
            }
            return response.data;
        }) 
}
export function fetchRangeSum(dataSuffix: string): Promise<number> {
    return apiClient.get(`/get-calc-sum?${dataSuffix}`)
        .then(response => {
            if (response.status !== 200) {
                throw Error('Looks like there was a problem. Status Code: ' + response.status);
            }
            return response.data;
        })
}
export function fetchWholeSum(): Promise<{ wholeSum: PriceInfo }> {
    return apiClient.get('/get-whole-sum')
        .then(response => {
            if (response.status !== 200) {
                throw Error('Looks like there was a problem. Status Code: ' + response.status);
            }
            return response.data;
        })
}
export function fetchWeatherForecast(address: string): Promise<WeatherInfo | WeatherError> {
    const encodedUrlAddress = encodeURIComponent(address);
    return apiClient.get(`/get-weather?address=${encodedUrlAddress}`)
        .then(response => {
            if (response.status !== 200) {
                throw Error('Looks like there was a problem. Status Code: ' + response.status);
            }
            return response.data;
        });
}
