<template>
  <div>
   <input type="text" v-model="newTodoList" @keyup.enter="addTodoList" class="todo-input" placeholder="What's your plan?">
   <div v-for="todo in todos" :key="todo.id" class="todo-item">
    {{todo.title}}
    <div @click="removeTodo(index)" class="remove-item">
    &times;
    </div>
   </div>
  </div>
</template>

<script>
export default {
  name: "todo-list",
  data() {
    return {
      newTodoList: "",
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

.remove-item {
  font-size:25px;
  cursor: pointer;
  margin-left: 14px;
  &:hover{
    color: black;
  }
}
</style>
