<template>
  <div>
   <input type="text" v-model="newTodoList" @keyup.enter="addTodoList" class="todo-input" placeholder="What's your plan?">

   <todo-item v-for="(todo, index) in todosFiltered" 
    :key="todo.id"
    :todo="todo" 
    :index="index" 
    :checkAll="!anyRemaining"
    >
   </todo-item>

  <div class="extra-container">
    <label>
      <input type="checkbox" :checked="!anyRemaining" @change="checkAllTodo"> Check All
    </label>
      <div>{{ remaining }} item left</div>
  </div> 
  <div class="extra-container">
    <div>
      <button :class="{ active: filter == 'all' }" @click="changeFilter('all')">All</button>
      <button :class="{ active: filter == 'active' }" @click="changeFilter('active')">Active</button>
      <button :class="{ active: filter == 'completed' }" @click="changeFilter('completed')">Completed</button>            
    </div>
    <div>
    <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
    </div>
  </div>
  <div>
  </div>

  </div>
</template>

<script>
import TodoItem from './TodoItem';

export default {
  name: "todo-list",
  components: {
    TodoItem
  },
  data () {
    return {
      newTodoList: '',
      idForTodo: 4,
      beforeEditCache: '',
    }
  },  
  computed: {
    filter() {
      return this.$store.state.filter
    },
    remaining() {
      return this.$store.getters.remaining
    },
    anyRemaining() {
      return this.$store.getters.anyRemaining
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered
    },
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton
    }
  },
  methods: {
    addTodoList() {
      //if it has an empty string
      if (this.newTodoList.length == 0) {
        return;
      }
      
      this.$store.commit('addTodos', {
        id: this.idForTodo,
        title: this.newTodoList,
      })

      this.idForTodo++;
      this.newTodoList = "";
    },
    changeFilter(filter){
      this.$store.commit('updatedFilter', filter)
    },

    checkAllTodo() {
      this.$store.commit('checkAll', event.target.checked)
    },

    clearCompleted(){
      this.$store.commit('clearCompleted')
    }

  }
};
</script>

<style class="sass">

.todo-input {
  width: 100%;
  padding: 10px 10px;
  font-size: 18px;
  margin-bottom: 16px;
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align:center;
  justify-content: space-between;
}

.todo-input-item {
  padding: 10px 10px;
  font-size: 15px;
}

.remove-item {
  font-size: 25px;
  cursor: pointer;
  margin-left: 14px;
  &:hover{
    color: black;
  }
}

.escEdit {
  font-size: 12px;
  color:grey;
  // display: flex;
  margin: 0 5px 0 20px;
  // padding: 0 10px 0 10px;
 
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content:space-between;
  font-size: 16px;
  border-top: 1px solid lightgreen;
  padding-top: 14px;
  margin-bottom: 14px;
}

.todo-item-edit .focus {
    outline: none;
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.active {
  background-color: lightgreen;
}
</style>
