<template>

    <div class="todo-item">
      <div class="todo-item-left">
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
        
        <div @click="removeTodo(index)" class="remove-item">
          &times;
        </div>        
      </div>
    </div>

</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
};
</script>
