<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div id="landing-page">
        <v-container grid-list-xl>
          <v-flex xs7 offset-xs5 offset-md4 offset-lg8>
            <div id="bigText">
              <h1>HACKANBAN</h1>
              <p>The Kanban board gives you an excellent overview of your current work situation. Visualizing work in a team environment simplifies communication and leads to improved productivity.</p>
            <v-btn router-link to="/kanban" color="yellow" style="margin-top:-10px;margin-left:-2px">Get Started</v-btn>
            </div>
          </v-flex>
        </v-container>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
export default {};
</script>


<style scoped>
#bigText h1 {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: yellow;
  font-family: "Rubik Mono One", sans-serif;
  font-size: 55px;
  margin-top: 80%;
  margin-bottom: -10px;
}
#bigText p {
  font-family:sans-serif;
  color: rgb(255, 255, 255);
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 16px;
  font-weight:bold;
}
#landing-page {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1507415492521-917f60c93bfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80");
  /* background-color: #8f2c2c; */
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
</style>