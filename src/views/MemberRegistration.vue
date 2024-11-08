<template>
    <div class="min-h-screen w-full fixed inset-0 flex justify-center items-center bg-black overflow-y-auto">
      <div class="w-full mx-6 my-8 sm:my-8 sm:mx-8 md:mx-auto flex flex-col sm:flex-row max-w-3xl lg:max-w-4xl shadow-2xl rounded-lg relative">
        <!-- Close Button -->
        <button 
          @click="handleClose"
          class="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
  
        <div class="w-full sm:w-1/2 bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-l-lg max-h-[80vh] overflow-y-auto">
          <h1 class="text-xl font-bold mb-4 md:text-2xl lg:text-3xl">Create Account</h1>
          
          <!-- Tab Headers -->
          <div class="flex mb-6 border-b sticky top-0 bg-white">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              class="py-2 px-4 focus:outline-none"
              :class="activeTab === index ? 'border-b-2 border-gray-800 text-gray-800' : 'text-gray-500'"
              @click="activeTab = index"
            >
              {{ tab.title }}
            </button>
          </div>
  
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Form Fields -->
            <div 
              v-for="field in tabs[activeTab].fields" 
              :key="field.name"
              class="space-y-1"
            >
              <label :for="field.name" class="block text-gray-700 font-medium">
                {{ field.label }} <span class="text-red-500">*</span>
              </label>
              <input
                :type="field.type"
                :id="field.name"
                v-model="formData[field.name]"
                :class="[
                  'w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:ring-gray-900',
                  errors[field.name] ? 'border-red-500' : 'border-gray-300'
                ]"
                :placeholder="`Enter your ${field.label.toLowerCase()}`"
                @blur="validateField(field.name)"
              />
              <p v-if="errors[field.name]" class="text-red-500 text-sm mt-1">
                {{ errors[field.name] }}
              </p>
            </div>
  
            <!-- Error Message -->
            <div v-if="error" class="text-red-500 text-sm p-3 bg-red-50 rounded-lg">
              {{ error }}
            </div>
  
            <!-- Navigation Buttons -->
            <div class="flex justify-between pt-4">
              <button
                v-if="activeTab > 0"
                type="button"
                @click="handlePrevious"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition duration-300"
              >
                Back
              </button>
              <button
                v-if="activeTab < tabs.length - 1"
                type="button"
                @click="handleNext"
                class="ml-auto bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition duration-300"
              >
                Next
              </button>
              <button
                v-if="activeTab === tabs.length - 1"
                type="submit"
                :disabled="loading || hasErrors"
                class="ml-auto bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50"
              >
                {{ loading ? 'Creating Account...' : 'Create Account' }}
              </button>
            </div>
          </form>
        </div>
  
        <div class="w-full sm:w-1/2 bg-gray-800 p-6 sm:p-8 md:p-10 lg:p-12 flex items-center justify-center rounded-r-lg">
          <div class="text-white text-center">
            <h2 class="text-3xl font-bold mb-3 sm:text-4xl md:text-5xl lg:text-6xl">Join Us Today.</h2>
            <p class="text-base sm:text-lg md:text-xl lg:text-2xl">Start your journey with EventSync.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignUpScreen',
    data() {
      return {
        activeTab: 0,
        loading: false,
        error: '',
        errors: {},
        formData: {
          username: '',
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          surname: '',
          phoneNumber: '',
          regNo: '',
          residence: '',
          yoStudy: ''
        },
        tabs: [
          {
            title: "Personal Info",
            fields: [
              { name: "username", label: "Username", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "password", label: "Password", type: "password" },
              { name: "firstName", label: "First Name", type: "text" },
              { name: "lastName", label: "Last Name", type: "text" },
            ]
          },
          {
            title: "Additional Info",
            fields: [
              { name: "surname", label: "Surname", type: "text" },
              { name: "phoneNumber", label: "Phone Number", type: "tel" },
              { name: "regNo", label: "Registration Number", type: "text" },
              { name: "residence", label: "Residence", type: "text" },
              { name: "yoStudy", label: "Year of Study", type: "number" },
            ]
          }
        ]
      }
    },
    computed: {
      hasErrors() {
        return Object.keys(this.errors).length > 0;
      }
    },
    methods: {
      validateField(fieldName) {
        const value = this.formData[fieldName];
        const errors = {};
  
        switch (fieldName) {
          case 'username':
            if (!value) errors[fieldName] = 'Username is required';
            else if (value.length < 3) errors[fieldName] = 'Username must be at least 3 characters';
            break;
          
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
          
          case 'phoneNumber':
            if (!value) errors[fieldName] = 'Phone number is required';
            else if (!/^\d{10}$/.test(value)) {
              errors[fieldName] = 'Please enter a valid 10-digit phone number';
            }
            break;
          
          case 'yoStudy':
            if (!value) errors[fieldName] = 'Year of study is required';
            else if (value < 1 || value > 6) {
              errors[fieldName] = 'Year of study must be between 1 and 6';
            }
            break;
          
          default:
            if (!value) errors[fieldName] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        }
  
        if (errors[fieldName]) {
          this.$set(this.errors, fieldName, errors[fieldName]);
        } else {
          this.$delete(this.errors, fieldName);
        }
      },
  
      validateCurrentTab() {
        const currentFields = this.tabs[this.activeTab].fields;
        let isValid = true;
  
        currentFields.forEach(field => {
          this.validateField(field.name);
          if (this.errors[field.name]) {
            isValid = false;
          }
        });
  
        return isValid;
      },
  
      handleNext() {
        if (this.validateCurrentTab()) {
          this.activeTab++;
        }
      },
  
      handlePrevious() {
        this.activeTab--;
      },
  
      handleClose() {
        // If using Vue Router
        this.$router.push('/');
        // Or emit event to parent
        this.$emit('close');
      },
  
      async handleSubmit() {
        if (!this.validateCurrentTab()) {
          return;
        }
  
        try {
          this.loading = true;
          this.error = '';
  
          // Log form data to console
          console.log('Form Data:', this.formData);
  
          const formattedData = {
            ...this.formData,
            phoneNumber: parseInt(this.formData.phoneNumber),
            yoStudy: parseInt(this.formData.yoStudy)
          };
  
          const response = await fetch('https://kucu-database.onrender.com/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedData)
          });
  
          const data = await response.json();
  
          if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
          }
  
          console.log('Registration successful:', data);
          this.$emit('registration-success');
          this.handleClose();
  
        } catch (err) {
          this.error = err.message || 'An error occurred during registration';
          console.error('Registration error:', err);
        } finally {
          this.loading = false;
        }
      }
    }
  }
  </script>