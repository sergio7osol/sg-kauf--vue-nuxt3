<template>
    <div class="card border-primary mb-3 sum-calc" style="max-width: 18rem;">
        <!-- <div class="card-header">{{dateRange.start}} - {{dateRange.end}}</div> -->
        <div class="card-body text-info">
            <h5 class="card-title sum-calc__title">{{roundedSum}}</h5> 
            <span class="sum-calc__currency">{{currency}}</span>
            <div class="sum-calc__payment mt-2">
                <div class="sum-calc__cost-col">
                    <span class="sum-calc__payment-name">Cost: </span>
                    <span class="sum-calc__payment-value">{{roundedCost}}</span>
                </div>
                <div class="sum-calc__cost-col">
                    <span class="sum-calc__payment-name">Discount: </span>
                    <span class="sum-calc__payment-value">{{roundedDiscount}}</span>
                </div>
            </div>
            <div class="card-body">
                <div class="sum-calc__set-range">
                    <datepicker 
                        v-model="from" 
                        inputFormat="dd.MM.yyyy"
                    />
                    <!--
                        :upperLimit="to"
                        :locale="locale"
                        :lowerLimit="from"
                        :startingView="to.toString()"
                    -->
                     <datepicker 
                        v-model="to" 
                        :upperLimit="to"
                        inputFormat="dd.MM.yyyy"
                    />
                </div>
                <button class="btn btn-success mt-4 sum-calc__submit" @click="sendCalcSum">Calculate Sum</button>
                <button class="btn btn-info mt-3 sum-calc__submit" @click="sendGetWholeSum">Get whole Sum</button>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vue3-datepicker';

export default {
  name: 'sum-calc', 
  data() {
    return { 
        from: new Date(2021, 0, 15),
        to: new Date()
    }
  }, 
  props: {
    dateRange: Object, // {start: String, end: String}
    amount: Object,
    currency: String
  }, 
  computed: {
      roundedCost() {
          return this.amount.cost ? this.amount.cost.toFixed(2) : 0;
      }, 
      roundedDiscount() {
          return this.amount.discount ? this.amount.discount.toFixed(2) : 0;
      },
      roundedSum() {
          const cost = this.amount.cost || 0;
          const discount = this.amount.discount || 0;

          return (cost - discount).toFixed(2);
      }
  },
  emits: ['get-whole-sum', 'get-calc-sum'],
  methods: {
      sendCalcSum() {
          const from = getDateString(this.from);
          const to = getDateString(this.to);

          this.$emit('get-calc-sum', {from, to});

          function getDateString(dateString) {
              const date = new Date(dateString);
              const day = String(date.getDate());
              const dayNormalized = day.length < 2 ? '0' + day : day;
              const month = String(date.getMonth() + 1);
              const monthNormalized = month.length < 2 ? '0' + month : month;
              const year = date.getFullYear();
    
              const dateNormalized = dayNormalized + '.' + monthNormalized + '.' + year;

              return dateNormalized;
          }
      },
      sendGetWholeSum() {
          this.$emit('get-whole-sum', {from: this.from, to: this.to});
      }
  }, 
  components: {
    Datepicker 
  }
}
</script>

<style scoped lang="scss">
    .sum-calc {
        &__title {
            display: inline-block;
            font-size: 2rem;
        }
        &__currency {
            color: #ccc;
            font-size: 1.4rem;
            margin-left: .3rem;
            font-style: italic;
        }
    } 
</style>
