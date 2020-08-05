<template>
  <div class="add-juice container">
    <h2 class="center-align blue-text">Add New Juice</h2>
    <form>
      <div class="field title">
        <label for="title">Juice Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div class="field add-ingedient">
        <label for="title">Add Ingredient</label>
        <input type="text" name="add-ingredient" v-model="ingredient" />
      </div>
      <div class="field center-align">
        <button class="btn green">Add Juice</button>
        <button class="btn blue">Add Ingredient</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddJuice",
  data() {
    return {
      news: "was",
      title:'',
      ingredient:'',
    };
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

div.add-juice .field{
  margin: 20px auto;
}
</style>
