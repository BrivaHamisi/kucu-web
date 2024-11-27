<template>
  <div 
    class="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-[#E8EAF6] flex flex-col lg:flex-row"
  >
    <!-- Sidebar Title -->
    <div class="lg:w-1/5 bg-[#1B365D] text-white p-6 lg:p-8 flex items-center justify-center lg:justify-start">
      <div class="transform text-2xl lg:text-4xl font-extrabold tracking-wide text-center lg:text-left">
        Our Vision
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="lg:w-4/5 p-6 lg:p-12 flex flex-col justify-center space-y-8">
      <ContentSection 
        v-for="section in sections" 
        :key="section.title"
        :title="section.title"
        :content="section.content"
        :icon-name="section.iconName"
        :icon-color="section.iconColor"
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
      default: 40
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
      setup(props) {
        return () => h('div', { 
          class: 'flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 bg-white rounded-xl shadow-lg p-6'
        }, [
          // Icon Circle
          h('div', { 
            class: `w-24 h-24 md:w-20 md:h-20 rounded-full flex items-center justify-center ${props.iconColor} text-white shadow-md mx-auto md:mx-0`
          }, [
            h(IconComponent, { 
              name: props.iconName, 
              size: 48 
            })
          ]),

          // Content Area
          h('div', { class: 'flex-1 text-center md:text-left space-y-3' }, [
            h('h2', { class: 'text-3xl md:text-2xl font-bold text-gray-800 mb-2' }, props.title),
            h('div', { 
              class: 'text-gray-600 text-base leading-relaxed whitespace-pre-line' 
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
        iconColor: 'bg-gradient-to-br from-[#3498DB] to-[#5DADE2]'
      },
      {
        key: 'mission',
        title: 'Mission',
        content: "Empowering organizations through cutting-edge technology, exceptional service, and a commitment to sustainable growth.",
        iconName: 'goal',
        iconColor: 'bg-gradient-to-br from-[#E74C3C] to-[#EC7063]'
      },
      {
        key: 'goals',
        title: 'Goals',
        content: "1. Expand market presence in emerging tech sectors\n2. Achieve 25% year-over-year revenue growth\n3. Develop breakthrough AI and machine learning solutions",
        iconName: 'target',
        iconColor: 'bg-gradient-to-br from-[#1B365D] to-[#34495E]'
      }
    ])

    return {
      sections
    }
  }
})
</script>