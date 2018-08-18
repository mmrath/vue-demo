<template>
    <div>
        <h1>Activate Your Account</h1>
        <p>
            Hello {{user.firstName}},
            We just need to validate your email address to activate your account. We sent you an email with instructions
            to activate your account.
        </p>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { UserModel } from "@/models/core";

@Component({})
export default class PreActivation extends Vue {
  @Prop() user!: UserModel;
}
</script>
