<template>
  <div class="min-h-screen w-full fixed inset-0 flex justify-center items-center bg-gray-900 overflow-y-auto">
    <div class="w-full mx-6 my-8 sm:my-8 sm:mx-8 md:mx-auto flex flex-col sm:flex-row max-w-3xl lg:max-w-4xl shadow-2xl rounded-lg relative">
      <!-- Close Button -->
      <button 
        @click="handleClose"
        class="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200 transition duration-300 z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="w-full sm:w-1/2 bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-l-lg max-h-[80vh] overflow-y-auto">
        <h1 class="text-2xl font-bold mb-4 md:text-3xl lg:text-4xl">Sign Up</h1>
        
        <!-- Tab Headers -->
        <div class="flex mb-6 border-b sticky top-0 bg-white">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            class="py-2 px-4 focus:outline-none transition duration-300"
            :class="activeTab === index ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-800'"
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
                'w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500',
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
              class="ml-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              Next
            </button>
            <button
              v-if="activeTab === tabs.length - 1"
              type="submit"
              :disabled="loading || hasErrors"
              class="ml-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50"
            >
              {{ loading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </div>
        </form>
      </div>

      <div class="w-full sm:w-1/2 bg-gray-800 p-6 sm:p-8 md:p-10 lg:p-12 flex items-center justify-center rounded-r-lg">
        <div class="text-white text-center">
          <h2 class="text-3xl font-bold mb-3 sm:text-4xl md:text-5xl lg:text-6xl">Sign Up Today.</h2>
          <p class="text-base sm:text-lg md:text-xl lg:text-2xl">Start your journey with EventSync.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref(0)
const loading = ref(false)
const error = ref('')
const errors = ref({})
const formData = ref({
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
})

const tabs = [
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

const hasErrors = computed(() => Object.keys(errors.value).length > 0)

const validateField = (fieldName) => {
  const value = formData.value[fieldName]
  
  switch (fieldName) {
    case 'username':
      if (!value) errors.value[fieldName] = 'Username is required'
      else if (value.length < 3) errors.value[fieldName] = 'Username must be at least 3 characters'
      else delete errors.value[fieldName]
      break
    
    case 'email':
      if (!value) errors.value[fieldName] = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.value[fieldName] = 'Please enter a valid email address'
      } else delete errors.value[fieldName]
      break
    
    case 'password':
      if (!value) errors.value[fieldName] = 'Password is required'
      else if (value.length < 6) {
        errors.value[fieldName] = 'Password must be at least 6 characters'
      } else delete errors.value[fieldName]
      break
    
    case 'phoneNumber':
      if (!value) errors.value[fieldName] = 'Phone number is required'
      else if (!/^\d{10}$/.test(value)) {
        errors.value[fieldName] = 'Please enter a valid 10-digit phone number'
      } else delete errors.value[fieldName]
      break
    
    case 'yoStudy':
      if (!value) errors.value[fieldName] = 'Year of study is required'
      else if (value < 1 || value > 6) {
        errors.value[fieldName] = 'Year of study must be between 1 and 6'
      } else delete errors.value[fieldName]
      break
    
    default:
      if (!value) {
        errors.value[fieldName] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
      } else delete errors.value[fieldName]
  }
}

const validateCurrentTab = () => {
  const currentFields = tabs[activeTab.value].fields
  let isValid = true

  currentFields.forEach(field => {
    validateField(field.name)
    if (errors.value[field.name]) {
      isValid = false
    }
  })

  return isValid
}

const handleNext = () => {
  if (validateCurrentTab()) {
    activeTab.value++
  }
}

const handlePrevious = () => {
  activeTab.value--
}

const handleClose = () => {
  router.push('/')
}

const handleSubmit = async () => {
  if (!validateCurrentTab()) {
    return
  }

  try {
    loading.value = true
    error.value = ''

    console.log('Form Data:', formData.value)

    const formattedData = {
      ...formData.value,
      phoneNumber: parseInt(formData.value.phoneNumber),
      yoStudy: parseInt(formData.value.yoStudy)
    }

    const response = await fetch('https://kucu-database.onrender.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }

    console.log('Registration successful:', data)
    handleClose()

  } catch (err) {
    error.value = err.message || 'An error occurred during registration'
    console.error('Registration error:', err)
  } finally {
    loading.value = false
  }
}
</script>