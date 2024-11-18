<template>
  <div class="min-h-screen w-full fixed inset-0 flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
    <div class="w-full mx-6 my-8 sm:my-8 sm:mx-8 md:mx-auto flex flex-col sm:flex-row max-w-3xl lg:max-w-4xl shadow-2xl rounded-xl relative">
      <!-- Close Button -->
      <button @click="handleClose" class="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="w-full sm:w-1/2 bg-white p-8 sm:p-10 md:p-12 lg:p-14 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none backdrop-blur-lg bg-opacity-95">
        <div class="space-y-6">
          <div class="text-center sm:text-left">
            <h1 class="text-2xl font-bold mb-2 md:text-3xl lg:text-4xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Welcome Back</h1>
            <p class="text-gray-500">Sign in to your account</p>
          </div>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Email Field -->
            <div class="space-y-2">
              <label for="email" class="block text-gray-700 font-medium text-sm uppercase tracking-wide">Email</label>
              <div class="relative">
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  :class="[
                    'w-full border-2 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300',
                    errors.email ? 'border-red-300' : 'border-gray-200 hover:border-gray-300'
                  ]"
                  placeholder="Enter your email"
                  @blur="validateField('email')"
                />
                <div v-if="formData.email" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg v-if="!errors.email" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <p v-if="errors.email" class="text-red-500 text-sm mt-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                {{ errors.email }}
              </p>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label for="password" class="block text-gray-700 font-medium text-sm uppercase tracking-wide">Password</label>
              <div class="relative">
                <input
                  type="password"
                  id="password"
                  v-model="formData.password"
                  :class="[
                    'w-full border-2 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300',
                    errors.password ? 'border-red-300' : 'border-gray-200 hover:border-gray-300'
                  ]"
                  placeholder="Enter your password"
                  @blur="validateField('password')"
                />
                <div v-if="formData.password" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg v-if="!errors.password" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <p v-if="errors.password" class="text-red-500 text-sm mt-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                {{ errors.password }}
              </p>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="text-red-500 text-sm p-4 bg-red-50 rounded-lg border border-red-100 flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {{ error }}
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading || hasErrors"
              class="w-full bg-gradient-to-r from-gray-800 to-gray-600 text-white py-3 px-4 rounded-lg transition-all duration-300 hover:from-gray-700 hover:to-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
              <span v-else>Sign In</span>
            </button>
          </form>
        </div>
      </div>

      <div class="w-full sm:w-1/2 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 p-8 sm:p-10 md:p-12 lg:p-14 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none flex items-center justify-center">
        <div class="text-center space-y-6">
          <div class="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <h2 class="text-3xl font-bold mb-4 sm:text-4xl md:text-5xl lg:text-6xl text-white">EventSync</h2>
            <p class="text-gray-200 text-lg sm:text-xl md:text-2xl">Your Events, Simplified</p>
          </div>
          <div class="text-gray-300 text-sm">
            Don't have an account? 
            <a href="#" class="text-white underline hover:text-gray-200 transition-colors duration-300">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from 'vue';
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';

export default {
  name: 'LoginScreen',
  setup() {
    const router = useRouter();

    const formData = reactive({
      email: '',
      password: '',
    });

    const errors = reactive({});

    const loading = ref(false);
    const error = ref('');

    const validateField = (fieldName) => {
      const value = formData[fieldName];
      errors[fieldName] = '';

      switch (fieldName) {
        case 'email':
          if (!value) errors[fieldName] = 'Email is required';
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errors[fieldName] = 'Please enter a valid email address';
          }
          break;

        case 'password':
          if (!value) errors[fieldName] = 'Password is required';
          else if (value.length < 6) {
            errors[fieldName] = 'Password must be at least 6 characters';
          }
          break;
      }
    };

    const hasErrors = computed(() => Object.keys(errors).some(field => errors[field]));

    const handleClose = () => {
      // Your logic to navigate away or close the component
      router.push({name:'home'})
    };

    const handleSubmit = async () => {
      if (!validateForm()) {
        return;
      }

      try {
        loading.value = true;
        error.value = '';

        const response = await fetch('https://kucu-database.onrender.com/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.token){
          localStorage.setItem('token', JSON.stringify(data.token));
          // Your logic to store the token and navigate to the home page or dashboard
          handleClose();
          console.log('Login successful:', data);
        // Your logic to handle successful login

        handleClose();
        }
        if (!data.token) {
          throw new Error(data.message || 'Login failed');
        }

      } catch (err) {
        error.value = err.message || 'An error occurred during login';
        console.error('Login error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.value,
        });
      } finally {
        loading.value = false;
      }
    };

    const validateForm = () => {
      ['email', 'password'].forEach(field => validateField(field));
      return !hasErrors.value;
    };

    return {
      formData,
      errors,
      loading,
      error,
      validateField,
      hasErrors,
      handleClose,
      handleSubmit,
    };
  },
};
</script>