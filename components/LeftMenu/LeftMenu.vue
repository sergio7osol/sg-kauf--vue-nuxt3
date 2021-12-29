<template>
  <nav id="sidebarMenu" class="d-md-block sidebar collapse vertical-menu">
    <div class="pt-3 pb-3">
      <SortBox :active-sort-order="sortOrder" @sort-order="changeSortOrder($event)" />
      <ul class="nav flex-column vertical-menu__list">
        <li class="nav-item vertical-menu__item" v-for="item in sortedShoppingDates" :key="item.date">
          <!-- <span v-if="item.year" class="vertical-menu__item-year">{{ item.year }}</span> -->
          <!-- <span v-if="item.month" class="vertical-menu__item-_month">{{ getMonthString(item.month) }}</span> -->
          <a v-if="item.date"
             class="nav-link vertical-menu__item-link"
             :class="{
                'vertical-menu__item-link--active': item.date === activeDate.date,
                'vertical-menu__item--loading': item.date === loadingDate
             }"
             aria-current="page"
             href="#"
             @click.prevent="chooseDate(item.date)"
          >
            <span class="vertical-menu__count-icon">{{ item.count }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="feather feather-shopping-cart vertical-menu__item-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span class="vertical-menu__item-text">{{ item.date }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import {
  defineComponent,
  inject
} from 'vue';
import SortBox from '@/components/LeftMenu/SortBox';
import useShoppingDates from '@/composables/useShoppingDates';
import useSortShoppingDates from '@/composables/useSortShoppingDates';
import useActiveDateBuys from '@/composables/useActiveDateBuys';

export default defineComponent({
  name: 'LeftMenu',
  components: { SortBox },
  setup() {
    const { shoppingDates } = useShoppingDates();
    const { sortOrder, sortedShoppingDates, changeSortOrder } = useSortShoppingDates(shoppingDates);
    const { activeDate, setActiveDate, loadingDate, setLoadingDate } = useActiveDateBuys();
    const chooseDate = (date: string) => {
      setLoadingDate(date);
      setActiveDate(date);
    }

    return {
      sortedShoppingDates,
      sortOrder,
      changeSortOrder,
      loadingDate,
      chooseDate,
      activeDate,
      setActiveDate
    };
  },
  props: {},
  // emits: {
  //   TODO: to vadidate using ts
  //   'date-selected' (payload: string) {
  //     const ddMmYyyy = payload.split('.');
  //     const isValid = ddMmYyyy && ddMmYyyy.length === 3;
  //
  //     return isValid;
  //   }
  // }
  // methods: {
  //   getMonthString(monthNumber: number) {
  //     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //     monthNumber = Number(monthNumber) - 1;
  //
  //     return monthNames[monthNumber];
  //   }
  // }
});
</script>

<style scoped lang="scss">
@use '../../assets/styles/variables' as *;

.vertical-menu {
  padding: 0;
  &__item {
    &--active {
      background-color: #dde;
      border: 1px solid $default-menu-separator-color;
    }
    &--loading {
      &:before {
        content: " ";
        position: absolute;
        right: .07rem;
        border-radius: 50%;
        width: 0;
        height: 0;
        margin: .2rem;
        box-sizing: border-box;
        border: .7rem solid currentColor;
        border-color: currentColor transparent currentColor transparent;
        animation: lds-hourglass 1.2s infinite;
      }
    }
    &-link {
      display: flex;
      align-items: center;
      height: 61px;
      position: relative;
      z-index: 2;
      padding: 20px 30px 19px 70px;
      font-size: 18px;
      font-family: UniversLT-Condensed, "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
      font-weight: normal;
      font-style: normal;
      color: #fff;
      text-decoration: none;
      text-transform: uppercase;
      border-bottom: 1px solid #777;
      transition: background-color 0.3s, color 0.3s;
      &::after {
        //content: "";
        position: absolute;
        right: 0;
        border-color: transparent;
        border-width: 30px 0 30px 17px;
        border-style: solid;
        transition: right 0.3s 0.3s, border-color 0.3s;
      }
      &:hover {
        background: #232323;
        color: #0070BA;
      }
      &--active {
        background: #0070BA !important;
        color: #fff !important;
        &::after {
          border-color: #0000 #0000 #0000 #0070BA;
          right: -17px;
        }
      }
    }
    &-year, &-month {
      display: block;
      background-color: #dedede;
      color: #777;
      position: relative;
      z-index: 2;
      padding: .3rem 1rem;
      line-height: 1;
      border-bottom: 1px solid #fff;
      cursor: pointer;
    }
    &-year {
      font-size: .8rem;
    }
    &-month {
      font-size: 1rem;
    }
    &-icon {
      position: absolute;
      left: 1rem;
    }
  }
  &__count-icon {
    position: absolute;
    top: 0;
    bottom: 1.6rem;
    left: 1.8rem;
    margin-top: auto;
    margin-bottom: auto;
    height: 1.3rem;
    min-width: 1.3rem;
    border-radius: 1rem;
    background-color: #c92f2f;
    color: #fff;
    font-size: .7rem;
    line-height: 1.3rem;
    text-align: center;
    vertical-align: middle;
    z-index: 1;
  }
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>
