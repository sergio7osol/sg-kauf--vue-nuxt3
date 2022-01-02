<template>
  <tr class="buy-table__row buy-table__head-row--body buy-table__head-row--add">
    <td class="buy-table__cell"></td>
    <td class="buy-table__cell buy-table__head-cell--body">
      <input
          class="form-control product-info__name"
          v-model="newProduct.name"
          @input="productAutocomplete"
          list="product-names"
          type="text"
      />
      <datalist id="product-names">
        <option
            v-for="(nameValue, index) in ValueCollection.defaults"
            :value="nameValue.name || nameValue"
            :key="(nameValue.name || nameValue) + index"
        />
      </datalist>
    </td>
    <td class="buy-table__cell buy-table__head-cell--body">
      <input
          class="form-control product-info__price"
          v-model.number="newProduct.price"
          placeholder="Price"
          step="0.01"
          type="number"
      />
    </td>
    <td class="buy-table__cell buy-table__head-cell--body">
      <input
          class="form-control product-info__weight-amount"
          v-model.number="newProduct.weightAmount"
          placeholder="Amount"
          step="0.001"
          type="number"
      />
    </td>
    <td class="buy-table__cell buy-table__head-cell--body">
      <select
          class="form-control custom-select product-info__measure"
          v-model="newProduct.measure"
      >
        <option
            v-for="measureValue in ValueCollection.measures"
            :key="measureValue + Date.now()"
        >
          {{ measureValue }}
        </option>
      </select>
    </td>
    <td class="buy-table__cell buy-table__head-cell--body">
      <input
          class="form-control product-info__description"
          v-model.trim="newProduct.description"
          placeholder="Description"
          type="text"
      />
    </td>
    <td class="buy-table__cell buy-table__head-cell--body">
      <input
          class="form-control product-info__discount"
          v-model.number="newProduct.discount"
          placeholder="Discount"
          type="text"
      />
      <!-- pattern="d+\%?" -->
    </td>
    <td class="buy-table__cell buy-table__head-cell--body">
      <div class="product-info__buttons">
        <button
            class="btn btn-success btn-sm product-info__btn-add text-nowrap"
            type="button"
            ref="saveProductButton"
        >
          <!-- @click.prevent="sendProductToSave" -->
          Save product
        </button>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { ref } from 'vue';
import useCollectionDefaults from '@/composables/useCollectionDefaults';
import Product from '@/types/Product';

export default defineComponent({
  name: 'AddProductTableRow',
  components: {},
  setup() {
    const { ValueCollection, findDefaultValue } = useCollectionDefaults();
    const newProduct = reactive<Product>({
      name: '',
      price: 0,
      weightAmount: 0,
      measure: 'piece',
      description: '',
      discount: 0
    });
    const saveProductButton = ref<HTMLButtonElement | null>(null);
    const focusSaveProductButton = () => {
      saveProductButton?.value?.focus();
    }
    const productAutocomplete = (event: Event) => {
      const foundDefault = findDefaultValue(event);
      if (typeof foundDefault === 'object') {
        newProduct.name = foundDefault.name;
        newProduct.price = foundDefault.price || 0;
        newProduct.weightAmount = foundDefault.weightAmount || 1;
        newProduct.measure = foundDefault.measure || 'piece';
        newProduct.description = foundDefault.description || '';
        newProduct.discount = foundDefault.discount || 0;
        focusSaveProductButton();
      } else {
        newProduct.name = foundDefault;
        newProduct.price = 0;
        newProduct.weightAmount = 0;
        newProduct.measure = 'piece';
        newProduct.description = '';
        newProduct.discount = 0;
      }
    };

    return {
      newProduct,
      ValueCollection,
      productAutocomplete,
      saveProductButton
    }
  }
});
</script>

<style scoped lang="scss">
@use '../../assets/styles/variables';

.product {
  padding-left: 2rem;

  &--default {
    margin-left: 2rem;

    .product-info::before {
      content: none;
    }
  }

  &__products {
    align-items: flex-start;
    margin-top: 1rem;
    font-size: .95rem;
    color: #565;
  }

  &__badge {
    color: #fff;
    position: absolute;
    top: 18px;
    right: 12px;
  }
}
.product-info {
  // &:hover {
  //   background-color: #efefef;
  // }

  &__name {
    //width: 25rem;
    margin-right: 1.5rem;
  }
  &__price {
    width: 6rem;
  }
  &__weight-and-measure {
    display: flex;
    margin-right: 1.5rem;
  }
  &__weight-amount {
    width: 6rem;
    margin-right: 0.5rem;
  }

  &__discount {
    width: 6rem;
  }

  &__buttons {
    // width: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__btn-add {
    margin-left: 0.4rem;
  }

  th,
  td {
    vertical-align: middle;
  }
}

.product .form-control {
  height: 2rem;
  line-height: 1;
}

.btn {
  &--icon {
    &-remove {
      font-size: 2rem;
      line-height: 1.1;
      color: #f00;
      padding-top: 0;
      padding-bottom: 0;
      &:hover {
        color: lighten(#f00, 10%);
      }
      &:active {
        color: darken(#f00, 10%);
      }
      &::before {
        content: "\2718";
      }
    }
  }
}
</style>
