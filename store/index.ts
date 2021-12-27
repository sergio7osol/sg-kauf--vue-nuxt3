import SgKaufState from '~/types/SgKaufState';

export const state = reactive<SgKaufState>({
  isLoading: false,
  shoppingDates: []
});
export const methods = {
  setLoadingStatus (value: boolean) {
    state.isLoading = value;
  },
  // fetchTodos({ state: {}, commit }, increment: number) {
  //   commit('SET_TODOS', ['111'])
  //   state.isLoading = !state.isLoading;
  // }
}
export const getters = {
  fn() {
    state.isLoading = !state.isLoading;
  }
}
// export const mutations = {
//   SET_TODOS(state: State, todos: []) {
//     state.todos = todos;
//   }
// }
// export const getters = {
//   myGetter(state: State) { },
//   doneTodos(state: any) {
//     return state.todos.filter((todo: any) => todo.done);
//   }
// }
// export const modules = {}

// state: {
//   emptyBuy: {
//     date: "",
//     time: "00:00",
//     currency: "EUR",
//     country: "Germany",
//     address: {
//       city: "",
//       index: "",
//       street: "",
//       houseNumber: ""
//     },
//     payMethod: "EC card",
//     shopName: "REWE",
//     products: []
//   }
// },
// mutations: {},
// actions: {},
// modules: {}

