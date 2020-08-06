<template>
  <div v-if="juice" class="edit-juice container">
    <h2>Edit Juice {{ this.$route.params.juice_slug }}</h2>
    <div>
      <form v-if="juice" @submit.prevent="updateJuice">
        <div class="field title">
          <label for="title">Juice Title:</label>
          <input type="text" name="title" v-model="juice.title" />
        </div>
        <div
          class="field edit-ingedient"
          v-for="(ing, index) in juice.ingredients"
          :key="index"
        >
          <label for="title">Edit Ingredient</label>
          <i class="material-icons delete-ing" @click="deleteIngredient(ing)"
            >delete</i
          >
          <input
            type="text"
            name="edit-ingredient"
            v-model="juice.ingredients[index]"
          />
        </div>
        <div class="field edit-ingedient">
          <label for="title">Add Ingredient</label>
          <input
            type="text"
            name="edit-ingredient"
            ref="addIngredient"
            @keydown.tab.prevent="addIng"
            v-model="another"
          />
        </div>
        <div class="field center-align">
          <p class="red-text" v-if="feedback">{{ feedback }}</p>
          <button class="btn green">Update Juice</button>
          <button
            class="btn blue"
            @click.prevent="addIng"
            @keydown.prevent.tab="addIng"
          >
            Add Ingredient
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditJuice",
  data() {
    return {
      juice: null,
      another: null,
      feedback: null
    };
  },
  created() {
    let ref = db
      .collection("juices")
      .where("slug", "==", this.$route.params.juice_slug);
    ref.get().then(snapshot =>
      snapshot.forEach(doc => {
        (this.juice = doc.data()), (this.juice.id = doc.id);
      })
    );
  },
  methods: {
    updateJuice() {
      if (this.juice.title) {
        this.feedback = null;
        this.juice.slug = slugify(this.juice.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@] /g,
          lower: true
        });
        db.collection("juices")
          .doc(this.juice.id)
          .update({
            title: this.juice.title,
            ingredients: this.juice.ingredients,
            slug: this.juice.slug
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
        this.juice.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
        this.$refs.addIngredient.focus();
      } else {
        this.feedback = "You must enter the value to add a ingredient";
      }
      this.$refs.addIngredient.focus();
    },
    deleteIngredient(ing) {
      this.juice.ingredients = this.juice.ingredients.filter(element => {
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

div.edit-juice {
  margin-top: 60px;
  max-width: 600px;
  padding: 20px;
}

div.edit-juice .field {
  margin: 20px auto;
}

.delete-ing {
  position: relative;
  left: 30rem;
  top: 5px;
  color: red;
  cursor: pointer;
}
</style>
