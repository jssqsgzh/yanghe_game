<!-- 着陆页 - 已废弃 -->
<template>
    <div>
    </div>
</template>

<script setup>
    import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
    import {wxOpenid} from '@/api/base'
    import { useRouter, useRoute } from 'vue-router'
    import {enter} from '@/api/base'
    const router = useRouter()
    const route = useRoute()
    const enterGame = async() => {
        let userId = localStorage.getItem('userId')
        let res = await enter({userId:userId})
        if(res){
            if(res.data == 0){
                showMessage('您已无次数啦！')
            }else if(res.data > 0 && res.data <=3){
                router.push(`/egg/${userId}`)
            }
        }
    }
    onMounted(() => {
        enterGame()
    })

</script>
<style scoped>
</style>