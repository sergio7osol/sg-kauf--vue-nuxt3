<script setup lang="ts">
	import type { ShallowUnwrapRef } from 'vue';
	import type { ProductWithDate } from '~~/types/Product';
	import type { ProductTimelineRequestInfo } from '~~/types/ProductTimelineInfo';
	import type SgKaufState from '~~/types/SgKaufState';
	import type { Measure, ShopName } from '../../types/StaticBuyInfoTypes';

	const props = defineProps<{
		showDialog: boolean,
		productName: string,
		measure: Measure,
		shopName: ShopName
	}>();
	defineEmits<{
		(e: '@close-dialog'): void;
	}>();

	const store = inject("store") as {
		state: ShallowUnwrapRef<SgKaufState>;
		methods: {
			getProductTimelineInfo: (
				productRequestInfo: ProductTimelineRequestInfo
			) => Promise<ProductWithDate[]>;
		};
	}; // TODO: set correct type

	const priceTimeline = ref<[number, number][]>([]);
    
	const showComparisonGraph = (productTimelineRequest: ProductTimelineRequestInfo) => {
		if (!props.showDialog) {
			return false;
		}

		let { name, measure, shopName: shopNameUsed } = productTimelineRequest;
		if (!(name && measure && shopNameUsed)) {
			console.log("Not enough data provided for requesting product timeline.");
			console.log(`Provided data: name: ${name}, measure: ${measure}, shopName: ${shopNameUsed}`);
			return false;
		}

		store.methods
			.getProductTimelineInfo(productTimelineRequest)
			.then((result: ProductWithDate[]) => {
				if (!result.length) return false;

				const datePriceChartData = result.reduce((acc: Array<[number, number]>, v: ProductWithDate): Array<[number, number]> => {
					const dateArr = v.date.split('.');
					const year = Number(dateArr[2]);
					const month = Number(dateArr[1]) - 1;
					const day = Number(dateArr[0]);
					const date = Date.UTC(year, month, day);
					const price = v.price;

					return [...acc, [date, price]];
				}, []);
				if (datePriceChartData?.length) { 
					priceTimeline.value = datePriceChartData.sort((a, b) => a[0] - b[0]);
				}
			})
			.catch((err) => {
				console.log("Product timeline view error: ", err);
			});
	};

	watch(props, (newValue, oldValue) => {
		const { productName: oldName, measure: oldMeasure, shopName: oldShopName } = oldValue;
		const { productName, measure, shopName } = newValue;
		console.log('name, measure, shopName: ', productName, measure, shopName);
		console.log('OLD name, measure, shopName: ', oldName, oldMeasure, oldShopName);
		showComparisonGraph({ name: props.productName, measure: props.measure, shopName: props.shopName });
	});
</script>

<template>
	<Dialog v-model:visible="showDialog" :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '50vw' }"
		:maximizable="true" :modal="true">
		<template #header>
			<h3>Header</h3>
		</template>

		<h5>
			Graphic timeline: {{ store.state.activeDate.date }}
			<h1 style="display: inline-block; margin-left: 1rem">
				<b>{{ priceTimeline.length }}</b>
			</h1>
		</h5>
		<ol>
			<li v-for="buy in priceTimeline" :key="Date.now()">{{ new Date(buy[0]).toDateString() }}</li>
		</ol>
		<ProductPriceChart :chart-data="priceTimeline" :product-name="productName" :shop-name="props.shopName" />

		<template #footer>
			<Button label="Close" icon="pi pi-times" @click="$emit('@close-dialog')" autofocus />
			<!-- <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="" /> -->
		</template>
	</Dialog>
</template>