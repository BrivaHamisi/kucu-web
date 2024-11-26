<template>
    <div 
      class="min-h-screen bg-cover bg-center flex" 
      :style="{
        // backgroundImage: `linear-gradient(rgba(64, 224, 208, 0.8), rgba(64, 224, 208, 0.8)), url('https://picsum.photos/1600/900')`,
        backgroundBlendMode: 'multiply'
      }"
    >
      <!-- Sidebar Title -->
      <div class="w-1/5 bg-[#1B365D] text-white p-8 flex items-center">
        
        <div class="transform -rotate-90 whitespace-nowrap text-4xl font-bold tracking-wide">
          Our Vision
        </div>
      </div>
  
      <!-- Main Content Area -->
      <div class="w-4/5 p-12 flex flex-col justify-center">
        <ContentSection 
          v-for="section in sections" 
          :key="section.title"
          :title="section.title"
          :content="section.content"
          :icon-name="section.iconName"
          :icon-color="section.iconColor"
          @update:content="(newContent) => updateContent(section.key, newContent)"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, h } from 'vue'
  
  // Custom Icon Component
  const IconComponent = defineComponent({
    props: {
      name: {
        type: String,
        required: true
      },
      size: {
        type: Number,
        default: 24
      }
    },
    render() {
      // SVG paths for icons
      const iconPaths = {
        target: 'M22 12h-4l-3 9L9 3l-3 9H2',
        goal: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
        eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'
      }
  
      return h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: this.size,
        height: this.size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': 2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      }, [
        h('path', { d: iconPaths[this.name] || iconPaths.target })
      ])
    }
  })
  
  export default defineComponent({
    name: 'CorporatePresentation',
    components: {
      IconComponent,
      ContentSection: defineComponent({
        props: {
          title: String,
          content: String,
          iconName: String,
          iconColor: String
        },
        emits: ['update:content'],
        setup(props, { emit }) {
          const isEditing = ref(false)
          const editedContent = ref(props.content || '')
  
          const startEditing = () => {
            editedContent.value = props.content || ''
            isEditing.value = true
          }
  
          const saveContent = () => {
            emit('update:content', editedContent.value)
            isEditing.value = false
          }
  
          const cancelEditing = () => {
            isEditing.value = false
          }
  
          return () => h('div', { class: 'flex items-start space-x-6 mb-8 w-full max-w-2xl' }, [
            // Icon Circle
            h('div', { 
              class: `w-20 h-20 rounded-full flex items-center justify-center ${props.iconColor} text-white shadow-lg`
            }, [
              h(IconComponent, { 
                name: props.iconName, 
                size: 40 
              })
            ]),
  
            // Content Area
            h('div', { class: 'flex-1' }, [
              h('h2', { class: 'text-2xl font-bold mb-4 text-gray-800' }, props.title),
              
              isEditing.value ? h('div', { class: 'flex flex-col space-y-2' }, [
                h('textarea', {
                  class: 'w-full p-2 border rounded bg-white text-gray-800',
                  value: editedContent.value,
                  rows: 4,
                  onInput: (e) => {
                    editedContent.value = e.target.value
                  }
                }),
                h('div', { class: 'flex space-x-2' }, [
                  h('button', {
                    onClick: saveContent,
                    class: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                  }, 'Save'),
                  h('button', {
                    onClick: cancelEditing,
                    class: 'bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300'
                  }, 'Cancel')
                ])
              ]) : h('div', {
                onClick: startEditing,
                class: 'cursor-pointer p-2 hover:bg-gray-50 rounded transition-colors'
              }, props.content)
            ])
          ])
        }
      })
    },
    setup() {
      const sections = ref([
        {
          key: 'vision',
          title: 'Vision',
          content: "To be the global leader in innovative technology solutions that transform businesses and improve lives.",
          iconName: 'eye',
          iconColor: 'bg-[#3498DB]'
        },
        {
          key: 'mission',
          title: 'Mission',
          content: "Empowering organizations through cutting-edge technology, exceptional service, and a commitment to sustainable growth.",
          iconName: 'goal',
          iconColor: 'bg-[#E74C3C]'
        },
        {
          key: 'goals',
          title: 'Goals',
          content: "1. Expand market presence in emerging tech sectors\n2. Achieve 25% year-over-year revenue growth\n3. Develop breakthrough AI and machine learning solutions",
          iconName: 'target',
          iconColor: 'bg-[#1B365D]'
        }
      ])
  
      const updateContent = (key, newContent) => {
        const section = sections.value.find(s => s.key === key)
        if (section) {
          section.content = newContent
        }
      }
  
      return {
        sections,
        updateContent
      }
    }
  })
  </script>