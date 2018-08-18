<template>
    <v-form @submit.prevent="handleSubmit">
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <span class="title">
                        Sign Up
                    </span>
                </v-flex>
                <v-flex xs12>
                    <ul>
                        <li v-bind:key="error" v-for="error in errors.collect('_backend')">{{ error }}</li>
                    </ul>
                </v-flex>
                <v-flex xs12 sm6 md3 lg2>
                    <v-text-field
                            v-model="vm.firstName"
                            label="First Name"
                            v-validate="'required|alpha'"
                            :error-messages="errors.collect('firstName')"
                            name="firstName"
                            required>
                    </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md3 lg2>
                    <v-text-field
                            v-model="vm.lastName"
                            label="Last Name"
                            v-validate="'required|alpha'"
                            :error-messages="errors.collect('lastName')"
                            name="lastName"
                            required>
                    </v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex sm12 md6 lg4>
                    <v-text-field
                            v-model="vm.email"
                            label="E-mail"
                            :error-messages="errors.collect('email')"
                            name="email"
                            type="email"
                            required>
                    </v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex sm12 md6 lg4>
                    <v-text-field
                            v-model="vm.password"
                            label="Password"
                            v-validate="'required|min:6|max:20'"
                            type="password"
                            :error-messages="errors.collect('password')"
                            name="password"
                            required>
                    </v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs12 sm6 md3 lg2 align-content-start>
                    <v-btn class="ml-0" color="primary" type="submit">Sign Up</v-btn>
                </v-flex>
                <v-flex xs12 sm6 md3 lg2 align-content-end justify-end>
                    <v-btn class="mr-0" flat color="primary">Sign in instead</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        <p>Model is {{vm}}</p>
    </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { SignUpModel } from "@/models/core";
import router from "@/router";

@Component({})
export default class SignUp extends Vue {
  vm!: SignUpModel;
  submitting = false;
  signUpSuccess = false;

  handleSubmit() {
    this.$validator.validate().then(valid => {
      if (valid) {
        this.submitting = true;
        axios
          .post("/api/user/signup", this.vm)
          .then(resp => {
            console.log("response:", resp);
            this.signUpSuccess = true;
            router.push({
              path: "/user/pre-activation",
              params: { user: resp.data }
            });
          })
          .catch(err => {
            console.log("Error", err);
            if (err.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
              const data = err.response.data;
              if (data.hasOwnProperty("error") && data.hasOwnProperty("kind")) {
                this.errors.add({
                  scope: null,
                  field: "_backend",
                  msg: data.error + "." + data.kind
                });
              }
            } else if (err.request) {
              console.log(err.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", err.message);
            }
            console.log(err.config);
          })
          .finally(() => (this.submitting = false));
      }
    });
  }
}
</script>
