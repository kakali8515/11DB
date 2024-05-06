<template>
    <div class="login-wrap">
        <div class="small-container">
            <div class="box">
                <h2>{{ $t("forgotPassword.title") }}</h2>
                <p>{{ $t("forgotPassword.desc") }}</p>
                <form>
                    <div class="form-group">
                        <div class="group">
                            <input type="email" value="email@email.com" class="form-control" />
                            <a href="#" class="btn verify-btn resend">{{ $t("button.resend") }}</a>
                        </div>
                        <!-- <span class="error-txt">This is a required field.</span> -->
                    </div>
                    <div class="form-group">
                        <div class="group">
                            <div class="time-group">
                                <input type="text" :placeholder="$t('placeholder.verfiycode')" class="form-control" />
                                <span class="time">2:59</span>
                            </div>
                            <a href="#" class="btn verify-btn resend">{{ $t("button.check") }}</a>
                        </div>
                    </div>
                    <div class="btn-innr">
                        <input type="submit" class="btn" value="Check" />
                    </div>
                    <div class="btm-txt">  {{ $t("register.account") }} <a href="#" class="frgt-txt">{{ $t("register.loginHere")}}</a></div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ForgotPasswordResend',
    }
</script>