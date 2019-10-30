<template>
  <div>
    <div class="px-3 m-0">
      <div
        :class="'text-center p-3 border ' + list.name.toLowerCase()"
        data-toggle="collapse"
        :data-target="'#' + list.name"
      >
        <h3>{{ list.name }}</h3>
      </div>
      <div :id="list.name">
        <todo
          v-for="item in list.data"
          :key="item.id"
          :user="user"
          :item="item"
          >{{ item.taskName }}</todo
        >
      </div>
    </div>
  </div>
</template>

<script>
import todo from "@/components/itemKanban.vue";
export default {
  name: "kanbanBoard",
  components: {
    todo
  },
  props: ["list", "user"],
  data: function() {
    return {
      color: ""
    };
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
.wacana {
  background-color: aquamarine;
}
.rencana {
  background-color: rgb(255, 134, 255);
}
.on-going {
  background-color: greenyellow;
}
.selesai {
  background-color: gold;
}

.col-sm-12 .col-md-12 {
  margin-bottom: 0.5rem !important;
}
</style>
