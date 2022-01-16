import { reactive, readonly } from 'vue';
import { fetchWeatherForecast } from '@/services/ShoppingDateService';
import WeatherState from '@/types/WeatherState';
import WeatherInfo from "@/types/WeatherInfo";
import WeatherError from "@/types/WeatherError";

const state = reactive<WeatherState>({
    weatherData: {} as WeatherInfo
});

const methods = {
    getWeatherForecast(address: string): void {
        fetchWeatherForecast(address)
            .then((weatherData) => {
                methods._setWeather(weatherData);
            })
            .catch(function(err) {
                console.log('getWeatherForecast. ', 'Fetch Error :-S', err);
            });
    },
    _setWeather(newWeatherData: WeatherInfo | WeatherError) {
        console.log('newWeatherData >> ', newWeatherData);
        if ('error' in newWeatherData) {
            return console.error('Weather data can not be set: ', newWeatherData.error);
        }
        state.weatherData = newWeatherData;
    }
};

export default {
    state: readonly(state),
    methods
}


