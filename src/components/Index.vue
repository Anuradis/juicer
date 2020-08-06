<template>
  <div class="index container">
    <div class="card" v-for="(juice, index) in juices" :key="index">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteJuice(juice.id)"
          >delete</i
        >
        <h2 class="indigo-text">{{ juice.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, i) in juice.ingredients" :key="i">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab indygo">
        <router-link
          :to="{ name: 'EditJuice', params: { juice_slug: juice.slug } }"
        >
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  created() {
    db.collection("juices")
      .get()
      .then(snapshot => {
        snapshot.forEach(element => {
          let juice = element.data();
          juice.id = element.id;
          this.juices.push(juice);
        });
      });
  },
  data() {
    return {
      db,
      juices: []
    };
  },
  methods: {
    deleteJuice(id) {
      db.collection("juices")
        .doc(id)
        .delete()
        .then(
          (this.juices = this.juices.filter(juice => {
            return juice.id !== id;
          }))
        );
    }
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.index h2 {
  font-size: 1.2rem;
  text-align: center;
  margin-top: 0;
}

.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}

.index .delete {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  color: darkred;
}
.chip {
  margin-right: 0px;
}
</style>
