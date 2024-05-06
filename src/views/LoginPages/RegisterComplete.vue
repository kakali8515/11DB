<template>
    <div class="login-wrap">
        <div class="small-container">
            <div class="box">
                <h2>{{$t('register.congratulation')}}</h2>
                <p class="t-24 completed-text" v-html="$t('register.registerComplete')"></p>
                <form>
                    <div class="btn-innr">
                        <input readonly class="btn" :value="$t('button.ok')" @click="$router.push('/login')" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'RegisterComplete',
    }
</script>