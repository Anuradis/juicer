<template>
  <div class="add-juice container">
    <h2 class="center-align blue-text">Add New Juice</h2>
    <form @submit.prevent="addJuice">
      <div class="field title">
        <label for="title">Juice Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div
        class="field add-ingedient"
        v-for="(ing, index) in ingredientsList"
        :key="index"
      >
        <label for="title">Add Ingredient</label>
        <i class="material-icons delete-ing" @click="deleteIngredient(ing)"
          >delete</i
        >
        <input
          type="text"
          name="ingredient-list"
          v-model="ingredientsList[index]"
        />
      </div>
      <div class="field add-ingedient">
        <label for="title">Add Ingredient</label>
        <input
          @keydown.tab.prevent="addIng"
          type="text"
          ref="addIngredient"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <p class="red-text" v-if="feedback">{{ feedback }}</p>
        <button class="btn green">Add Juice</button>
        <button class="btn blue" @click.prevent="addIng">
          Add Ingredient
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddJuice",
  data() {
    return {
      news: "was",
      title: "",
      val: "",
      slug: "",
      feedback: null,
      ingredientsList: [],
      another: null
    };
  },
  methods: {
    addJuice() {
      if (this.title) {
        this.feedback = null;
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@] /g,
          lower: true
        });
        db.collection("juices")
          .add({
            title: this.title,
            ingredients: this.ingredientsList,
            slug: this.slug
          })
          .then(() => {
            this.$router.push("/").catch(() => {});
          })
          .catch(err => console.log(err));
      } else {
        this.feedback = "You must enter juice title";
      }
    },
    addIng() {
      if (this.another) {
        this.ingredientsList.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter the value to add a ingredient";
      }
      this.$refs.addIngredient.focus();
    },
    deleteIngredient(ing) {
      this.ingredientsList = this.ingredientsList.filter(element => {
        return element != ing;
      });
    }
  }
};
</script>

<style>
.btn {
  margin: 20px;
}

div.add-juice {
  margin-top: 60px;
  max-width: 600px;
  padding: 20px;
}

div.add-juice .field {
  margin: 20px auto;
}

.delete-ing {
  position: relative;
  left: 30rem;
  top: 5px;
  color: red;
}
</style>
