<template>
    <div class="admin-left">
        <div class="admin-name">
            <span>
                <img src="@/assets/icons/user.svg" class="dark-th" alt="" />
                <img src="@/assets/icons/user-icon-gray.svg" class="light-th" alt="" />
            </span>
            <h4>Admin name</h4>
        </div>
        <div class="admin-txt">
            <p><span><span class="blue"></span></span> Message Text Message Text Message Text Message Text Message Text Message Text Message Text </p>
        </div>
    </div>
    <div class="admin-right">
        <div class="date">
            <span>June 10. 2021 </span>
            <span>11:00</span>
        </div>
        <a href="#" class="delete">
            <img src="@/assets/icons/delete.svg" class="dark-th" alt="" />
            <img src="@/assets/icons/delete-blk.svg" class="light-th" alt="" />
        </a>
    </div>
</template>

<script>
    export default {
        name: 'MessageCardTwo',
    }
</script>