<template>
  <div>
    <div :id="weSelect" class="relative" v-click-outside="close">
      <div>
        <!-- Select -->
        <div
          :class="{ 'border-red-500': error }"
          class="rounded-md shadow-sm bg-white border p-2"
        >
          <!-- selectList -->
          <div class="flex flex-wrap -mx-2">
            <div
              v-for="(row, index) in selectList"
              :key="index"
              class="flex mb-2 justify-between w-auto items-center border rounded-full pl-2 pr-1 py-1 mx-2"
            >
              <p class="mr-1">{{ row.name }}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                class="fill-current cursor-pointer text-red-500"
                @click="remove(index)"
                height="20"
              >
                <path
                  class="heroicon-ui"
                  d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
                />
              </svg>
            </div>
          </div>
          <div @click="show" class="flex items-center">
            <input
              type="text"
              @keyup="doFilter"
              class="focus:outline-none bg-transparent w-full cursor-pointer"
              autocomplete="off"
              :placeholder="placeholder"
            />
            <span>
              <svg
                class="h-5 w-5 text-gray-500"
                :class="{ 'text-red-500': error }"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
        <!-- Select - Error -->
        <p v-if="eMessage" class="text-red-500 text-sm pt-1 pl-1">
          {{ error }}
        </p>
      </div>
      <!-- Select - Option -->
      <div
        :id="weSelectOption"
        v-show="active"
        :class="{ active: active }"
        class="absolute border mt-1 z-40 overflow-y-auto w-full rounded-md bg-white shadow-lg we-select-options"
      >
        <ul>
          <slot></slot>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      default: null,
    },
    error: {
      default: "",
    },
    placeholder: {
      default: "",
    },
  },
  data() {
    return {
      optionsSelector: [],
      aOptions: [],
      eMessage: false,
      weInput: null,
      active: false,
      weSelectOption: `_${Math.random().toString(36).substr(2, 9)}`,
      weSelect: `_${Math.random().toString(36).substr(2, 9)}`,
      selectList: [],
    };
  },
  methods: {
    remove(index) {
      this.selectList.splice(index, 1);
      const out = this.selectList.map((e) => e.value);
      this.$emit("input", out);
      this.$emit("change", out);
    },
    blur() {
      if (this.weInput) {
        const value = this.weInput.value;
        const row = this.aOptions.find((option) => {
          const input = option.querySelector("input");
          const label = option.querySelector("p");

          if (label.innerText.toLowerCase() === value.toLowerCase()) {
            return option;
          }
        });

        if (row) {
          const input = row.querySelector("input");
          const label = row.querySelector("p");

          const data = {
            name: label.innerText,
            value: input.value,
          };

          if (this.multiple) {
            const check = this.selectList.findIndex(
              (e) => e.value === data.value
            );

            if (check === -1) {
              this.selectList.push(data);
            }

            const out = this.selectList.map((e) => e.value);
            this.weInput.value = "";
            this.$emit("input", out);
            this.$emit("change", out);
          } else {
            this.weInput.value = data.name;
            this.$emit("input", data.value);
            this.$emit("change", data.value);
          }
        } else {
          this.weInput.value = "";
        }
      }
    },
    show() {
      const weSelector = document.querySelector(`#${this.weSelect}`);
      const listSelector = weSelector.querySelector("ul");
      this.weInput = weSelector.querySelector("input");
      this.eMessage = false;

      this.optionsSelector = listSelector.querySelectorAll("li");

      this.aOptions = Array.from(this.optionsSelector);

      weSelector.setAttribute("role", "combobox");
      listSelector.setAttribute("role", "listbox");

      weSelector.addEventListener("keyup", (e) => {
        this.doKeyAction(e.key);
      });

      if (!this.active) {
        this.optionsSelector.forEach((option) => (option.style.display = ""));
      } else {
        this.weInput.blur();
        this.optionsSelector.forEach(
          (option) => (option.style.display = "none")
        );
      }

      this.active = !this.active;
    },
    close() {
      this.blur();

      const weSelector = document.querySelector(`#${this.weSelect}`);

      this.active = false;

      if (this.multiple) {
        if (weSelector) {
          this.weInput = weSelector.querySelector("input");

          this.weInput.value = "";
          this.optionsSelector.forEach(
            (option) => (option.style.display = "none")
          );
        }
      }

      if (weSelector && this.weInput) this.weInput.blur();
    },
    select() {
      const option = this.findFocus();
      const input = option.querySelector("input");
      const label = option.querySelector("p");

      const data = {
        name: label.innerText,
        value: input.value,
      };

      if (this.multiple) {
        const check = this.selectList.findIndex((e) => e.value === data.value);

        if (check === -1) {
          this.selectList.push(data);
        }

        const out = this.selectList.map((e) => e.value);
        this.$emit("input", out);
        this.$emit("change", out);
      } else {
        this.weInput.value = data.name;
        this.$emit("input", data.value);
        this.$emit("change", data.value);
      }

      this.close();
    },
    findFocus() {
      const focusPoint = document.activeElement;
      return focusPoint;
    },
    doFilter(key) {
      const weSelector = document.querySelector(`#${this.weSelect}`);
      const listSelector = weSelector.querySelector("ul");
      this.weInput = weSelector.querySelector("input");

      this.optionsSelector = listSelector.querySelectorAll("li");

      this.aOptions = Array.from(this.optionsSelector);

      weSelector.setAttribute("role", "combobox");
      listSelector.setAttribute("role", "listbox");

      weSelector.addEventListener("keyup", (e) => {
        this.doKeyAction(e.key);
      });
      
      if (
        key.code !== "ArrowUp" &&
        key.code !== "ArrowDown" &&
        key.code !== "ArrowLeft" &&
        key.code !== "ArrowRight"
      ) {
        const terms = this.weInput.value;

        const aFilteredOptions = this.aOptions.filter((option) => {
          if (
            option.innerText.toUpperCase().indexOf(terms.toUpperCase()) !== -1
          ) {
            return true;
          }
        });

        this.optionsSelector.forEach(
          (option) => (option.style.display = "none")
        );

        aFilteredOptions.forEach((option) => {
          option.style.display = "";
        });
      }
    },
    moveFocus(fromHere, toThere) {
      const currentItem = this.findFocus();
      const whichOne = this.aOptions.indexOf(currentItem);

      const aCurrentOptions = this.aOptions.filter(function (option) {
        if (option.style.display === "") {
          return true;
        }
      });

      if (aCurrentOptions.length === 0) {
        return;
      }

      if (toThere === "input") {
        this.weInput.focus();
      }

      switch (fromHere) {
        case this.weInput:
          if (toThere === "forward") {
            aCurrentOptions[0].focus();
          } else if (toThere === "back") {
            aCurrentOptions[aCurrentOptions.length - 1].focus();
          }
          break;
        case aCurrentOptions[0]:
          if (toThere === "forward") {
            aCurrentOptions[1].focus();
          } else if (toThere === "back") {
            this.weInput.focus();
          }
          break;
        case aCurrentOptions[aCurrentOptions.length - 1]:
          if (toThere === "forward") {
            aCurrentOptions[0].focus();
          } else if (toThere === "back") {
            aCurrentOptions[aCurrentOptions.length - 2].focus();
          }
          break;
        default:
          if (toThere === "forward") {
            this.moveForward(aCurrentOptions);
          } else if (toThere === "back" && whichOne > 0) {
            this.moveBackward(aCurrentOptions);
          } else {
            this.weInput.focus();
          }
          break;
      }
    },
    moveForward(aCurrentOptions) {
      const currentItem = this.findFocus();
      const whichOne = aCurrentOptions.indexOf(currentItem);
      const nextOne = aCurrentOptions[whichOne + 1];
      nextOne.focus();
    },
    moveBackward(aCurrentOptions) {
      const currentItem = this.findFocus();
      const whichOne = aCurrentOptions.indexOf(currentItem);
      const previousOne = aCurrentOptions[whichOne - 1];
      previousOne.focus();
    },
    doKeyAction(key) {
      const currentFocus = this.findFocus();

      switch (key) {
        case "Escape":
          this.close();
          break;
        case "Enter":
          this.select();
          break;
        case "ArrowDown":
          this.moveFocus(currentFocus, "forward");
          break;
        case "ArrowUp":
          this.moveFocus(currentFocus, "back");
          break;
      }
    },
    edit() {
      const weSelector = document.querySelector(`#${this.weSelect}`);
      const listSelector = weSelector.querySelector("ul");
      this.weInput = weSelector.querySelector("input");

      this.optionsSelector = listSelector.querySelectorAll("li");

      this.aOptions = Array.from(this.optionsSelector);

      if (
        typeof this.value !== "string" &&
        this.value !== "string" &&
        this.value.length > 0 &&
        this.multiple
      ) {
        this.value.forEach((e) => {
          const option = this.aOptions.find((option) => {
            const input = option.querySelector("input");
            if (input.value === e) return option;
          });

          const input = option.querySelector("input");
          const label = option.querySelector("p");

          const data = {
            name: label.innerText,
            value: input.value,
          };

          const check = this.selectList.findIndex(
            (e) => e.value === data.value
          );

          if (check === -1) {
            this.selectList.push(data);
          }
        });
      } else if (!this.multiple) {
        const option = this.aOptions.find((option) => {
          const input = option.querySelector("input");
          if (input.value === this.value) return option;
        });

        const input = option.querySelector("input");
        const label = option.querySelector("p");

        const data = {
          name: label.innerText,
          value: input.value,
        };

        this.weInput.value = data.name;
      }
    },
    errorHandler() {
      if (this.error) {
        this.eMessage = true;

        setTimeout(() => {
          this.eMessage = false;
        }, 5000);
      }
    },
  },
  watch: {
    value(data) {
      if (data) {
        this.edit();
      }
    },
    error(data) {
      if (data) {
        this.errorHandler();
      }
    },
    optionsSelector(f) {
      this.optionsSelector.forEach((option) => {
        option.setAttribute("tabindex", "0");

        option.addEventListener("click", (e) => {
          this.select(e);
        });
      });
    },
  },
  mounted() {
    if (this.value) {
      this.edit();
    }

    if (this.error) {
      this.errorHandler();
    }
  },
};
</script>
<style scoped>
.we-select-options {
  min-height: 0;
  min-width: 0;
  opacity: 0;
  transition: all 0.5s;
}

.we-select-options.active {
  max-height: 288px;
  opacity: 1;
}

.we-select-options::-webkit-scrollbar {
  width: 8px;
}

/* Track */
.we-select-options::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
.we-select-options::-webkit-scrollbar-thumb {
  background: #0099e8;
  border-radius: 10px;
}

/* Handle on hover */
.we-select-options::-webkit-scrollbar-thumb:hover {
  background: #018cd1;
}
</style>