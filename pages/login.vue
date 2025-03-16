<template>
  <main>
    <section>
      <BaseContainer class="flex flex-col items-center">
        <div class="bg-gray-100 bg-opacity-80  border-2 p-20 rounded-md">
          <div class="flex flex-col items-center justify-center gap-3">
            <BaseHeadline type="h2" element="h1" class="mb-8" text="Login" />
            <button @click="signInWithOAuth" class="hover:bg-text hover:text-gray-90 transition bg-gray-90 text-gray-20 py-4 px-14 flex gap-3 items-center rounded-md">
              <Icon name="logos:google-icon" />
              <span>Log In with Google</span>
            </button>
<!--            <button @click="signInWithOAuth" class="hover:bg-text hover:text-gray-90 transition bg-gray-90 text-gray-20 py-4 px-14 flex gap-3 items-center rounded-md">-->
<!--              <Icon class="invert" name="logos:github-icon" />-->
<!--              <span>Log In with GitHub</span>-->
<!--            </button>-->
<!--            <button @click="signInWithOAuth" class="hover:bg-text hover:text-gray-90 transition bg-gray-90 text-gray-20 py-4 px-14 flex gap-3 items-center rounded-md">-->
<!--              <Icon name="logos:spotify-icon" />-->
<!--              <span>Log In with Spotify</span>-->
<!--            </button>-->
          </div>
        </div>
      </BaseContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

const signInWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/confirm',
    },
  })
  if (error) console.log(error)
}



const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.error(error)
}
</script>