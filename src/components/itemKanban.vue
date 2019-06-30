<template>
  <div class="pre">
    <div class="border p-3 my-2 bg-light">
      <div class="col-lg-12 col-md-12 col-sm-12 mb-2">
        <div
          :class="'container-fluid text-center border-bottom ' + item.important"
          data-toggle="modal"
          :data-target="'#detail' + item.id"
          style="word-wrap: break-word;"
        >
          <a href @click.prevent="doNothing">
            <i v-if="item.important" class="fa fa-thumb-tack"></i>
            <p v-if="item.name.length > 10">
              {{
                item.name
                  .split("")
                  .splice(0, 10)
                  .join("")
              }}...
            </p>
            <p v-if="item.name.length <= 10">{{ item.name }}</p>
          </a>
        </div>
      </div>

      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="row justify-content-around align-items-center">
          <button
            @click="moveItem(toLeft)"
            v-if="toLeft !== null"
            class="btn btn-secondary btn-sm"
          >
            <i class="fa fa-arrow-left"></i>
          </button>
          <button
            @click="moveItem(toRight)"
            v-if="toRight !== null"
            class="btn btn-secondary btn-sm"
          >
            <i class="fa fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-end">
        <small>{{ getTime(item.createdAt) }}</small>
      </div>
    </div>
    <div
      class="modal fade"
      :id="'detail' + item.id"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i
                v-if="item.important"
                :class="'fa fa-thumb-tack ' + item.important"
                >&emsp;Important</i
              ><br v-if="item.important" />
              Todo Details
              <small class="text-muted">( ID : {{ item.id }} )</small>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div>
              <h5>Task Name</h5>
              <p>{{ item.name }}</p>
            </div>
            <div class="mb-2" style="word-wrap: break-word;">
              <h5>Description</h5>
              <p>{{ item.description }}</p>
            </div>
            <div class="mb-2">
              <h5>Target Date</h5>
              <p>{{ new Date(getDate(item.targetDate)).toDateString() }}</p>
            </div>
            <div>
              <h5>Created At</h5>
              <p>{{ createdDate(item.createdAt) }}</p>
            </div>
            <div>
              <h5>Created by</h5>
              <p>{{ item.writtenBy }}</p>
            </div>
            <div v-if="item.updatedAt">
              <h5>Last Update At</h5>
              <p>{{ createdDate(item.updatedAt) }}</p>
            </div>
            <div v-if="item.updatedBy">
              <h5>Last Update</h5>
              <p>
                {{ item.updatedBy }}
                <small>({{ item.updateValue }})</small>
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-danger"
              data-dismiss="modal"
              @click.prevent="removeItem"
            >
              <i class="fa fa-trash"></i>
            </button>
            <button
              class="btn btn-warning"
              data-toggle="modal"
              data-dismiss="modal"
              :data-target="'#edit' + item.id"
              @click="setUpdateValue"
            >
              <i class="fa fa-pencil-square-o"></i>
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      :id="'edit' + item.id"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Edit Todo <small class="text-muted">( ID : {{ item.id }} )</small>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-group" @submit.prevent="updateItem">
              <label :for="'#' + item.id + 'name'">
                Name
              </label>
              <input
                :id="item.id + 'name'"
                type="text"
                placeholder="Name"
                class="form-control mb-2"
                v-model="updateValue.name"
              />
              <label :for="'#' + item.id + 'description'">
                Description
              </label>
              <textarea
                row="5"
                placeholder="Description"
                class="form-control mb-2"
                v-model="updateValue.description"
                :id="item.id + 'description'"
              ></textarea>
              <label :for="'#' + item.id + 'targetDate'">
                TargetDate
              </label>
              <input
                type="date"
                class="form-control mb-2"
                v-model="updateValue.targetDate"
                :id="item.id + 'targetDate'"
              />
              <div
                class="col-12 d-flex mt-3 justify-content-between border p-2 rounded align-items-center"
              >
                <span>Mark As Important</span>
                <input type="checkbox" v-model="updateValue.important" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-warning"
              @click="setUpdateValue"
            >
              <i class="fa fa-refresh"></i>
            </button>
            <button
              type="button"
              class="btn btn-info"
              @click="updateItem"
              data-dismiss="modal"
            >
              <i class="fa fa-paper-plane"></i>
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";
import { db } from "@/assets/dbconfig.js";
export default {
  name: "todo",
  props: ["item", "user"],
  data() {
    return {
      toRight: "",
      toLeft: "",
      updateValue: {}
    };
  },
  created() {
    if (this.item.status === "Wacana") {
      this.toRight = "Rencana";
      this.toLeft = null;
    } else if (this.item.status === "Rencana") {
      this.toRight = "On-going";
      this.toLeft = "Wacana";
    } else if (this.item.status === "On-going") {
      this.toRight = "Selesai";
      this.toLeft = "Rencana";
    } else if (this.item.status === "Selesai") {
      this.toRight = null;
      this.toLeft = "On-going";
    }
  },
  methods: {
    doNothing() {},
    // HELPERS FUNCTION
    getTime(val) {
      let createdDate = new Date(Date.UTC(1970, 0, 1));
      createdDate.setSeconds(val.seconds);
      let seconds = (new Date() - createdDate.getTime()) / 1000;
      let interval = seconds / 31536000;
      let intervalType;

      if (interval >= 1) {
        intervalType = "year";
      } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          intervalType = "month";
        } else {
          interval = Math.floor(seconds / 86400);
          if (interval >= 1) {
            intervalType = "day";
          } else {
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
              intervalType = "hour";
            } else {
              interval = Math.floor(seconds / 60);
              if (interval >= 1) {
                intervalType = "minute";
              } else {
                interval = seconds;
                intervalType = "second";
              }
            }
          }
        }
      }

      if (interval > 1 || interval === 0) {
        intervalType += "s";
      }

      return interval + " " + intervalType + " ago";
    },
    createdDate(val) {
      let createdDate = new Date(Date.UTC(1970, 0, 1));
      createdDate.setSeconds(val.seconds);
      let createdAt =
        createdDate.getFullYear() +
        "-" +
        createdDate.getMonth() +
        "-" +
        createdDate.getDate();
      return new Date(createdAt).toDateString();
    },
    getDate(val) {
      let createdDate = new Date(Date.UTC(1970, 0, 1));
      createdDate.setSeconds(val.seconds);
      let month = String(createdDate.getUTCMonth());
      let date = String(createdDate.getDate());

      if (month.length == 1) {
        month = "0" + month;
      }
      if (date.length == 1) {
        date = "0" + date;
      }
      let createdAt = createdDate.getFullYear() + "-" + month + "-" + date;
      return createdAt;
    },
    toTitleCase(str) {
      let temp = str.split("");
      temp[0] = temp[0].toUpperCase();
      for (let i = 1; i < temp.length; i++) {
        temp[i] = temp[i].toLowerCase();
      }
      str = temp.join("");
      return str;
    },

    // MOVE RIGHT AND LEFT
    moveItem(direction) {
      let updValue = {
        status: direction,
        updatedBy: this.user.email,
        updatedAt: new Date(),
        updateValue: `move from ${this.item.status} to ${direction}`
      };
      db.collection("todos")
        .doc(this.item.id)
        .update(updValue);
    },

    // DELETE
    removeItem() {
      swal
        .fire({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this task!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            db.collection("todos")
              .doc(this.item.id)
              .delete();
          }
        });
    },

    // UPDATE
    setUpdateValue() {
      this.updateValue = { ...this.item };
      this.updateValue.targetDate = this.getDate(this.item.targetDate);
    },
    updateItem() {
      let updValue = this.updateValue;
      updValue.targetDate = new Date(updValue.targetDate);
      (updValue.updatedAt = new Date()),
        (updValue.updateValue = `the item was updated by ${this.user.id} `);

      db.collection("todos")
        .doc(this.item.id)
        .update(updValue);
    }
  }
};
</script>

<style scoped>
.true {
  color: red;
}
.false {
  color: #000;
}
</style>
