<template>
  <div>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input v-model="newItem" @keydown.enter="addToItem" class="new-todo" placeholder="What needs to be done?"
               autofocus>
      </header>
      <!-- This section should be hidden by default and shown when there are todos -->
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <!-- These are here just to show the structure of the list items -->
          <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
          <li v-for="(item,index) in filteredItems" :key="index"
              :class="{completed:item.completed,editing:item==editedItem}">
            <div class="view">
              <input class="toggle" type="checkbox" v-model="item.completed">
              <label @dblclick="editItem(item)">{{ item.title }}</label>
              <button class="destroy" @click="removeItem(item)"></button>
            </div>
            <input
                @keydown.enter="doneEdit(item)"
                v-model="item.title"
                class="edit"
                @blur="doneEdit(item)"
                value="">
          </li>
        </ul>
      </section>
      <!-- This footer should hidden by default and shown when there are todos -->
      <footer class="footer">
        <!-- This should be `0 items left` by default -->
        <span class="todo-count"><strong>{{ itemCount | activeItems }}</strong></span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
          <li>
            <a :class="{selected:this.visibility == 'all'}" @click="visibility='all'">All</a>
          </li>
          <li>
            <a :class="{selected:this.visibility == 'active'}" @click="visibility='active'">Active</a>
          </li>
          <li>
            <a :class="{selected:this.visibility == 'completed'}" @click="visibility='completed'">Completed</a>
          </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed" @click="removeCompletedItems()">Clear completed</button>
      </footer>
    </section>
  </div>
</template>

<script>

let filters = {
  all: (items) => {
    return items;
  },
  active: (items) => {
    return items.filter((item) => {
      return !item.completed
    })
  },
  completed: (items) => {
    return items.filter((item) => {
      return item.completed
    })
  }
}

export default {
  name: "todo",
  data() {
    return {
      newItem: '',
      items: [],
      editedItem: null,
      visibility: 'all'
    }
  },
  methods: {
    addToItem() {
      let subject = this.newItem.trim();
      if (!subject) {
        return;
      }
      this.items.push({
        title: subject,
        completed: false
      });
      this.newItem = "";
    },
    removeItem(item) {
      this.items.splice(this.items.indexOf(item), 1);
    },
    removeCompletedItems() {
      this.items = this.items.filter(item => !item.completed);
    },
    editItem(item) {
      this.editedItem = item;
    },
    doneEdit(item) {
      if (!this.editedItem) {
        return;
      }
      this.editedItem = null;
      if (!item.title) {
        this.removeItem(item);
      }
    }
  },
  computed: {
    itemCount() {
      return filters.active(this.items).length;
    },
    filteredItems() {
      return filters[this.visibility](this.items);
    }
  },
  filters: {
    activeItems(value) {
      return value + ' item left';
    }
  }
}
</script>

<style scoped>

</style>