<template>
  <div class="container weather-header">
    <h1 class="weather-header__title">Weather forecast</h1>
    <div class="weather-header__content">
      <div class="weather-header__body">{{ currentDate() }}</div>
      <div class="weather-header__footer">{{ weatherInfo.observationTime }}</div>
    </div>
  </div>
  <div class="container weather-card__table-wrapper">
    <table class="table weather-card__table">
      <thead class="weather-card__table-header">
      <tr>
        <th scope="col" class="weather-card__table-col">Location</th>
        <th scope="col" class="weather-card__table-col">Temperature</th>
        <th scope="col" class="weather-card__table-col">Feels like</th>
        <th scope="col" class="weather-card__table-col">Wind speed</th>
        <th scope="col" class="weather-card__table-col">Humidity</th>
        <th scope="col" class="weather-card__table-col">Precipitation</th>
        <th scope="col" class="weather-card__table-col">Description</th>
      </tr>
      </thead>
      <tbody class="weather-card__table-body">
      <tr>
        <th scope="row" class="weather-card__table-col weather-card__table-col--f-weight-normal">
          {{ weatherInfo.location }}
        </th>
        <td class="weather-card__table-col">
          {{ weatherInfo.temperature }}
          <span class="weather-card__measure">°C</span>
        </td>
        <td class="weather-card__table-col">
          {{ weatherInfo.feelslike }}
          <span class="weather-card__measure">°C</span>
        </td>
        <td class="weather-card__table-col">
          {{ weatherInfo.wind_speed }}
        </td>
        <td class="weather-card__table-col">
          {{ weatherInfo.humidity }}
        </td>
        <td class="weather-card__table-col">
          {{ weatherInfo.precip }}
        </td>
        <td class="weather-card__table-col">
          {{ weatherInfo.description }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>`

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted
} from 'vue';
import weatherStore from '@/store/weather';
import WeatherInfo from '@/types/WeatherInfo';

export default defineComponent({
  name: 'Forecast',
  components: {},
  layout: 'weather',
  setup() {
    provide('weatherStore', weatherStore);
    const currentDate = () => {
      const newDate = new Date();
      const localDate = newDate.toDateString();
      // const localDate = newDate.toLocaleDateString();
      return localDate;
    };
    const { getWeatherForecast } = weatherStore.methods;
    // const getUserRepositories = async () => {
    //   repositories.value = await fetchUserRepositories(props.user)
    // }
    const weatherInfo = computed<WeatherInfo>(() => weatherStore.state.weatherData);

    onMounted(getWeatherForecast('Saransk') as any);

    return {
      weatherInfo,
      currentDate
    }
  }
})
</script>

<style scoped lang="scss">
@use '../../assets/styles/variables' as *;

@mixin cell-light-gradient {
  background: linear-gradient(to bottom,  #fdfefe 0%,#c8cbe2 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
}

.weather-header {
  margin-top: 2rem;
  &__title {
    font-size: 1.5rem;
    color: $weather-title-line-color;
    text-transform: uppercase;
    text-align: center;
    background-color: $weather-title-line-bg;
    margin-bottom: 0;
    padding-bottom: .05rem;
  }
  &__content {
    background: url("/assets/images/weather-header-body-bg.jpg") no-repeat left center $weather-header-body-bg-color;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      width: .9rem;
      height: 100%;
      top: 0;
      left: 0;
      background-color: $weather-header-body-side-color;
    }
  }
  &__body {
    color: $weather-header-body-color;
    font-size: 3.5rem;
    text-transform: uppercase;
    text-align: center;
    background-size: cover;
    line-height: 1;
    padding: .3rem 0 0.2rem;
  }
  &__footer {
    font-size: 2rem;
    color: $weather-header-body-color;
    text-align: center;
    font-weight: 600;
    line-height: 1.2;
    padding-bottom: .4rem;
  }
}
.weather-card {
  text-align: center;
  &__table {
    border-collapse: separate;
    border-spacing: .5rem;
    //width: auto;
    margin-top: 2.5rem;
    &-wrapper {
      display: flex;
      justify-content: center;
      padding: 1.5rem 2rem;
    }
    &-header {
      background-color: $weather-title-line-bg;
    }
    &-col {
      padding: .5rem 1rem;
      text-align: center;
      &:first-child, &:last-child {
        text-align: left;
      }
      .weather-card__table-header & {
        color: $weather-title-line-color;
        border-width: .1876rem .1876rem .0625rem .1876rem;
        border-color: $weather-header-cell-border-light-color;
      }
      .weather-card__table-body & {
        @include cell-light-gradient;
        font-size: 1.5rem;
        border-width: .1876rem;
        border-top-color: $weather-body-cell-top-border-light-color;
      }
      &--f-weight-normal {
        font-weight: normal;
      }
    }
  }
  &__measure {
    color: $weather-title-line-bg;
    font-size: 1.5rem;
  }
}
</style>
