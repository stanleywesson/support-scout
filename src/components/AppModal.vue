<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])
</script>

<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-40 bg-gray-900 bg-opacity-75"
      @click="emit('close')"
    ></div>
  </Transition>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click.self="emit('close')"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div class="p-6">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
