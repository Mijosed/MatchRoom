<script setup>
    const client = useSupabaseClient();
    const email = ref('');
    const password = ref(null);
    const errorMsg = ref(null);
    const successMsg = ref(null);

    async function signUp(){
        try {
            const  {data, error} = await client.auth.signUp({
                email: email.value,
                password: password.value,
            });
            if(error) throw error;
            successMsg.value = "Check your email for the confirmation link.";
        }catch (error) {
            errorMsg.value = error.message;
        }
    }

</script>
<template>
    <div class="h-screen flex">
        <div class="m-auto w-96 p-4 bg-white rounded shadow-md">
            <h1 class="text-2xl font-bold mb-4">Register</h1>
            <form @submit.prevent="signup">
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" v-model="email" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" v-model="password" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
                <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">Register</button>
            </form>
            <p v-if="errorMsg" class="text-red-500 mt-2">{{ errorMsg }}</p>
            <p v-if="successMsg" class="text-green-500 mt-2">{{ successMsg }}</p>
        </div>
        
    </div>
</template>