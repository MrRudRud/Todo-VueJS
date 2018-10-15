<template>

    <div class="todo-item">
      <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit">

          <div v-if="!edited" @dblclick="editTodo()" :class="{ completed: completed }">
            {{title}}
          </div>
          
          <input v-else type="text" 
          v-model="title" 
          @blur="doneEdit()" 
          @keyup.enter="doneEdit()" 
          @keyup.esc="cancelEdit()"
          class="todo-input-item" v-focus>

          <div v-if="edited == true" class="escEdit">
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
      required:true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      edited: this.todo.edited,
      beforeEditCache: ''
    }
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed
    }
  },
  methods: {
    removeTodo(index){
      this.$emit('removeTodo', index)
    },
    editTodo() {
      this.beforeEditCache = this.title
      this.edited = true
    },

    doneEdit(){
      if(this.title.trim() === '') {
        this.title = this.beforeEditCache
      }
      this.edited = false

      this.$emit('finishedEdit', {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          edited: this.edited
        }
      });      

    },

    cancelEdit(){
      this.title = this.beforeEditCache
      this.edited = false
    },    
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  },  
};
</script>
