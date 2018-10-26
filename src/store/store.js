import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    filter: "all",
    todos: [
      {
        id: 1,
        title: "Learn PHP",
        completed: false,
        edited: false
      },
      {
        id: 2,
        title: "Learn Jquery",
        completed: false,
        edited: false
      },
      {
        id: 3,
        title: "Learn Javascript",
        completed: false,
        edited: false
      }
    ]
  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining !== 0;
    },
    todosFiltered(state) {
      if (state.filter === "all") {
        return state.todos;
      } else if (state.filter === "active") {
        return state.todos.filter(todo => !todo.completed);
      } else if (state.filter === "completed") {
        return state.todos.filter(todo => todo.completed);
      }

      return state.todos;
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    }
  },
  mutations: {
    addTodos(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        edited: false
      });
    },
    updatedFilter(state, filter) {
      state.filter = filter;
    },
    removeTodo(state, id) {
      let index = state.todos.findIndex(todo => todo.id == id);
      state.todos.splice(index, 1);
    },
    finishedEdit(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id);
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        edited: todo.edited
      });
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked));
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    }
  }
});
