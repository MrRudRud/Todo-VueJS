<template>
  <div>
   <input type="text" v-model="newTodoList" @keyup.enter="addTodoList" class="todo-input" placeholder="What's your plan?">

   <todo-item v-for="(todo, index) in todosFiltered" 
    :key="todo.id"
    :todo="todo" 
    :index="index" 
    @removeTodo="removeTodo"
    @finishedEdit="finishedEdit"
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
      <button :class="{ active: filter == 'all' }" @click="filter = 'all'">All</button>
      <button :class="{ active: filter == 'active' }" @click="filter = 'active'">Active</button>
      <button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed</button>            
    </div>
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
  data() {
    return {
      newTodoList: "",
      beforeEditCache:"",
      completed: false,
      filter: 'all',
      idTodoList: 4,
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
    };
  },

  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length
    },
    anyRemaining() {
      return this.remaining !== 0
    },
    todosFiltered() {
      if(this.filter === 'all') {
        return this.todos
      }else if (this.filter === 'active') {
        return this.todos.filter(todo => !todo.completed)
      }else if (this.filter === 'completed') {
        return this.todos.filter(todo => todo.completed)
      }

      return this.todos
    }
  },
  methods: {
    addTodoList() {
      //if it has an empty string
      if (this.newTodoList.length === 0) {
        return;
      }

      this.todos.push({
        id: this.idTodoList,
        title: this.newTodoList,
        completed: false,
        edited: false
      });

      this.idTodoList++;
      this.newTodoList = "";
    },

    removeTodo(index) {
      this.todos.splice(index, 1)
    },

    editTodo() {
      this.beforeEditCache = todo.title
      todo.edited = true
    },

    doneEdit(){
      if(todo.title.trim() === '') {
        todo.title = this.beforeEditCache
      }
      todo.edited = false
    },

    cancelEdit(todo){
      todo.title = this.beforeEditCache
      todo.edited = false
    },

    checkAllTodo() {
      this.todos.filter(todo => todo.completed = event.target.checked )
    },

    finishedEdit(data) {
      this.todos.splice(data.index, 1, data.todo)
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
