<template>
  <div>
   <input type="text" v-model="newTodoList" @keyup.enter="addTodoList" class="todo-input" placeholder="What's your plan?">

   <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item">

    <div class="todo-item">
      <input type="checkbox" v-model="todo.completed">

        <div v-if="!todo.edited" @dblclick="editTodo(todo)" :class="{ completed: todo.completed }">
          {{todo.title}}
        </div>
        
        <input v-else type="text" 
        v-model="todo.title" 
        @blur="doneEdit(todo)" 
        @keyup.enter="doneEdit(todo)" 
        @keyup.esc="cancelEdit(todo)"
        class="todo-input-item" v-focus>

        <div v-if="todo.edited == true" class="escEdit">
          <p><i>[ <b> esc </b> to cancel edit ]</i></p> 
        </div>
      
    </div>
      <div @click="removeTodo(index)" class="remove-item">
        &times;
      </div>
   </div>

  <div class="extra-container">
    <label for="">
      <input type="checkbox"> Check All
    </label>
  </div> 

  </div>
</template>

<script>
export default {
  name: "todo-list",
  data() {
    return {
      newTodoList: "",
      beforeEditCache:"",
      completed: false,
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
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  },
  methods: {
    addTodoList() {
      //if it has an empty string
      if (this.newTodoList.length == 0) {
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

    editTodo(todo) {
      this.beforeEditCache = todo.title
      todo.edited = true
    },

    doneEdit(todo){
      if(todo.title.trim() == '') {
        todo.title = this.beforeEditCache
      }
      todo.edited = false
    },

    cancelEdit(todo){
      todo.title = this.beforeEditCache
      todo.edited = false
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
  font-size:25px;
  cursor: pointer;
  margin-top: -8px;
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

.completed {
  text-decoration: line-through;
  color: grey;
}

</style>
