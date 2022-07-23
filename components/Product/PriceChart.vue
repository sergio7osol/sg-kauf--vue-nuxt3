<script setup lang="ts">
  import { ShopName } from '~~/types/StaticBuyInfoTypes';

  const props = defineProps<{
    productName: string,
    shopName: ShopName,
		chartData: Array<[number, number]>
	}>();

  const chartOptions = computed(() => {
    return {
        chart: {
        type: "spline",
      },
      title: {
        text: props.productName,
      },
      subtitle: {
        text: '',
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Date",
          style: {
            fontSize: '1.2rem',
            transform: 'translateY(.7rem)'
          },
        },
        labels: {
          format: '{value: %b %Y}',
          padding: 40,
          style: {
            transform: 'translateY(.3rem)'
          }
        }
      },
      yAxis: {
        title: {
          text: "<span class='highcharts__axis highcharts__axis--y'>Price €</span>", // TODO: make dynamic
          style: {
            fontSize: '1.2rem'
          }
        },
        min: 0,
      },
      tooltip: {
        headerFormat: `<div class='highcharts__tooltip-header'>
          <b>{props.shopName}</b>
          <span class='highcharts__tooltip-date'>{point.x:%e.%b %Y}</span>
          &nbsp;
          <span class='highcharts__tooltip-week-day'>{point.x:%a}</span>
        </div><br /><br />`,
        pointFormat: `<div class='highcharts__tooltip-body'>{point.y:.2f} €</div>`,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: true,
          },
        },
      },
      // colors: ["#6CF", "#39F", "#06C", "#036", "#000"],
      series: [
        {
          name: props.shopName,
          data: props.chartData || [],
        },
      ],
      legend: {
        align: 'left',
        y: 22
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              plotOptions: {
                series: {
                  marker: {
                    radius: 2.5,
                  },
                },
              },
            },
          },
        ],
      },
    }
  }); 
</script>

<template>
  <div>
    <highchart :options="chartOptions" :update="['options.title', 'options.series']" />
  </div>
</template>

<style lang="scss">

  .highcharts-credits {
    display: none;
  }
  .highcharts {
    &__axis {
      font-size: 1.1rem;
    }
  }
  .highcharts {
    &__tooltip {
      &-header {
        display: block;
      }
      &-body {
        display: inline-block;
        margin-top: .5rem;
        font-weight: bold;
        font-size: 1.1rem;
      }
      &-date {
        font-size: .9rem;
      }
      &-week-day {
        font-size: .75rem;
        font-style: italic;
      }
    }
  } 
</style>
