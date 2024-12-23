<template>
  <v-container>
    <v-form
      v-model="valid"
      @submit.prevent="register"
    >
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          class="text-center"
        >
          <div class="d-flex justify-space-between">
            <v-btn
            :disabled="!valid"
            color="primary"
            @click="register"
          >
            Register
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="secondary"
            class="ms-6"
            @click="login"
          >
            Enter
          </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { registerUser, loginUser } from "../authService";

// Поля ввода
const email = ref("");
const password = ref("");

// Валидация формы
const valid = ref(false);

// Правила для email
const emailRules = [
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

// Правила для пароля
const passwordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) => v.length >= 6 || "Password must be at least 6 characters",
];

// Метод для регистрации
const register = async () => {
  try {
    await registerUser(email.value, password.value);
    alert("Registration successful!");
    // Дополнительная логика (например, переход на другую страницу)
  } catch (error) {
    console.error("Error registering:", error);
    alert("Registration failed. Please try again.");
  }
};

// Метод для авторизации
const login = async () => {
  try {
    await loginUser(email.value, password.value);
    alert("Login successful!");
    
    // Дополнительная логика (например, переход на страницу профиля)
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Login failed. Please check your credentials and try again.");
  }
};
</script>
