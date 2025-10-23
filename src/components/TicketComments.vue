<script setup lang="ts">
import { ref, type PropType } from 'vue';
import type { Ticket } from '@/api/mockApi';
import { useTicketsStore } from '@/stores/tickets';
import { toShortDate } from '@/utils/date';

const props = defineProps({
    ticket: {
        type: Object as PropType<Ticket>,
        required: true
    }
});

const ticketsStore = useTicketsStore();
const newComment = ref('');

const addComment = () => {
    if (newComment.value.trim() === '' || !props.ticket)
        return;

    ticketsStore.addComment(props.ticket.id, newComment.value);
    newComment.value = '';
}

</script>

<template>
    <div class="mt-6">
        <h4 class="text-lg font-medium text-gray-900">Comments</h4>
        <div class="mt-4 space-y-4">
            <div v-if="!ticket.comments || ticket.comments.length === 0" class="text-sm text-gray-500">
                No Comments yet.
            </div>
            <div v-else v-for="comment in ticket.comments" :key="comment.id" class="flex space-x-3">
                <div class="flex-shrink-0">
                    <img src="https://www.gravatar.com/avatar/"></img>
                </div>
                <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                        <h3 class="text-sm font-medium">{{ comment.author }}</h3>
                        <p class="text-sm text-gray-500">{{ toShortDate(comment.createdAt) }}</p>
                    </div>
                    <p class="text-sm text-gray-500">{{ comment.text }}</p>
                </div>
            </div>
        </div>
        <div class="mt-6">
            <form @submit.prevent="addComment">
                <div>
                    <label for="comment" class="sr-only">Add a comment</label>
                    <textarea v-model="newComment" id="comment" name="comment" rows="3"
                        class="p-1 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Add a comment"></textarea>
                </div>
                <div>
                    <button type="submit"
                        class="mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Comment</button>
                </div>
            </form>
        </div>
    </div>
</template>