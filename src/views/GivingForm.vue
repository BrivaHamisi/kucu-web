<template>
    <div class="min-h-screen w-full fixed inset-0 flex justify-center items-center bg-black">
      <div class="w-full mx-6 my-8 sm:my-0 sm:mx-8 md:mx-auto flex flex-col sm:flex-row max-w-3xl lg:max-w-4xl">
        <div class="w-full sm:w-1/2 bg-white p-6 sm:p-8 md:p-10 lg:p-12">
          <div class="flex items-center mb-6">
            <!-- MPesa Logo SVG -->
            <svg class="w-12 h-12 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#374151"/>
              <path d="M16.5 8.5h-9a1 1 0 00-1 1v5a1 1 0 001 1h9a1 1 0 001-1v-5a1 1 0 00-1-1zm-4.5 5.5h-4v-4h4v4z" fill="white"/>
            </svg>
            <h1 class="text-xl font-bold md:text-2xl lg:text-3xl">MPesa Payment</h1>
          </div>
  
          <div class="space-y-4 sm:space-y-5 md:space-y-6">
            <!-- Amount Input -->
            <div>
              <label for="amount" class="block text-gray-700 font-medium mb-1 sm:mb-2">Amount (KES)</label>
              <input
                type="text"
                id="amount"
                v-model="amount"
                @input="validateAmount"
                class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:ring-gray-800 text-gray-900 text-base"
                placeholder="Enter amount"
              />
            </div>
  
            <!-- Amount Display -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-600">Amount to Pay</div>
              <div class="text-2xl font-bold text-gray-800">KES {{ formattedAmount }}</div>
            </div>
  
            <!-- Phone Number Input -->
            <div>
              <label for="phone" class="block text-gray-700 font-medium mb-1 sm:mb-2">MPesa Phone Number</label>
              <div class="relative">
                <div class="absolute left-3 top-2 text-gray-500 bg-white px-1 py-0.5 text-base">
                  +254
                </div>
                <input 
                  type="tel"
                  id="phone" 
                  v-model="phoneNumber"
                  @input="formatPhoneNumber"
                  class="w-full border border-gray-300 rounded-lg py-2 pl-14 pr-3 focus:outline-none focus:ring focus:ring-gray-800 text-gray-900 text-base" 
                  placeholder="7XX XXX XXX"
                  maxlength="9"
                />
              </div>
              <p class="mt-1 text-sm text-gray-500">Enter the phone number registered with MPesa</p>
            </div>
  
            <!-- Payment Button -->
            <button 
              @click="initiatePayment"
              :disabled="!isValidPhoneNumber || !isValidAmount || isLoading"
              :class="{
                'opacity-50 cursor-not-allowed': !isValidPhoneNumber || !isValidAmount || isLoading,
                'hover:bg-gray-700': isValidPhoneNumber && isValidAmount && !isLoading
              }"
              class="w-full bg-gray-600 text-white py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Processing...' : 'Pay with MPesa' }}
            </button>
  
            <!-- Payment Instructions -->
            <div class="bg-gray-50 p-4 rounded-lg text-sm">
              <h3 class="font-medium text-gray-700 mb-2">Payment Instructions:</h3>
              <ol class="list-decimal list-inside space-y-1 text-gray-600">
                <li>Enter the amount you wish to pay</li>
                <li>Enter your MPesa registered phone number</li>
                <li>Click "Pay with MPesa" button</li>
                <li>Wait for the MPesa prompt on your phone</li>
                <li>Enter your MPesa PIN to complete payment</li>
              </ol>
            </div>
  
            <!-- Transaction Status -->
            <div v-if="transactionStatus" 
                 :class="`p-4 rounded-lg flex items-start ${
                   transactionStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                 }`">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <span>{{ transactionStatus.message }}</span>
            </div>
          </div>
        </div>
  
        <!-- Right Panel -->
        <div class="w-full sm:w-1/2 bg-gray-800 p-6 sm:p-8 md:p-10 lg:p-12 flex items-center justify-center">
          <div class="text-white text-center">
            <h2 class="text-3xl font-bold mb-3 sm:text-4xl md:text-5xl lg:text-6xl">Secure Payment</h2>
            <p class="text-base sm:text-lg md:text-xl lg:text-2xl">Fast and secure way to pay with MPesa</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MpesaPaymentForm',
    data() {
      return {
        phoneNumber: '',
        amount: '',
        isLoading: false,
        transactionStatus: null
      }
    },
    computed: {
      isValidPhoneNumber() {
        return this.phoneNumber.length === 9 && /^7\d{8}$/.test(this.phoneNumber)
      },
      isValidAmount() {
        const numAmount = parseFloat(this.amount)
        return !isNaN(numAmount) && numAmount > 0
      },
      formattedAmount() {
        const numAmount = parseFloat(this.amount)
        if (isNaN(numAmount)) return '0.00'
        return numAmount.toLocaleString('en-KE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      }
    },
    methods: {
      formatPhoneNumber() {
        // Remove any non-digit characters
        let cleaned = this.phoneNumber.replace(/\D/g, '')
        
        // Ensure the number starts with 7
        if (cleaned && cleaned[0] !== '7') {
          cleaned = '7'
        }
        
        // Limit to 9 digits
        if (cleaned.length > 9) {
          cleaned = cleaned.slice(0, 9)
        }
  
        this.phoneNumber = cleaned
      },
      validateAmount() {
        // Allow only numbers and up to 2 decimal places
        this.amount = this.amount.replace(/[^\d.]/g, '')
        const parts = this.amount.split('.')
        if (parts.length > 2) {
          this.amount = parts[0] + '.' + parts.slice(1).join('')
        }
        if (parts.length === 2 && parts[1].length > 2) {
          this.amount = parts[0] + '.' + parts[1].slice(0, 2)
        }
      },
      async initiatePayment() {
        if (!this.isValidPhoneNumber || !this.isValidAmount) return
  
        this.isLoading = true
        this.transactionStatus = null
  
        try {
          const response = await fetch('https://kucu-database.onrender.com/giving', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              phoneNumber: `254${this.phoneNumber}`,
              amount: parseFloat(this.amount)
            })
          })
  
          const data = await response.json()
          console.log(data)
  
          if (data.transactionStatus.ResultCode === '0') {
            this.transactionStatus = {
              type: 'success',
              message: 'Giving Succesful'
            }
          } else {
            throw new Error(data.message || 'Request Cancelled by User')
          }
        } catch (error) {
          this.transactionStatus = {
            type: 'error',
            message: `Giving failed: ${error.message}`
          }
        } finally {
          this.isLoading = false
        }
      }
    }
  }
  </script>