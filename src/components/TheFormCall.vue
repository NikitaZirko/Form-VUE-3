<script setup>
import * as z from 'zod'
import BaseLink from '@/components/base/BaseLink.vue';
import {ref, toRef, reactive} from 'vue';
import useFetch from '@/composables/useFetch.js';
import url from '@/utils/url.js'

const errors = ref(null);
const message = {
    empty: {
        message: "Необходимо заполнить"
    },
    text: {
        invalid_type_error: "Должен содержать буквы"
    },
    num: {
        invalid_type_error: "Должен содержать цифры"
    }
}

const userSchema = z.object({
    fullName: z.string(message.text).min(1, message.empty),
    phone: z.coerce.number(message.num).min(1, message.empty),
    location: z.string(message.text).min(1, message.empty),
    comment: z.string(message.text).min(1, message.empty),
});

const userData = reactive({
    fullName: null,
    phone: null,
    location: null,
    comment: null,
});

const fields = [
    {
        name: 'fullName',
        label: 'Имя',
        type: 'text',
        data: toRef(userData, 'fullName'),
        placeHolder: ''
    },
    {
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
        data: toRef(userData, 'phone'),
        placeHolder: ''
    },
    {
        name: 'location',
        label: 'Локация',
        type: 'text',
        data: toRef(userData, 'location'),
        placeHolder: ''
    },
    {
        name: 'comment',
        label: 'Комментарий',
        type: '',
        data: toRef(userData, 'comment'),
        placeHolder: 'Введите текст сообщения...'
    },
];

const fetchData = reactive({
    res: {},
    data: null,
    err: null,
    loading: null,
});

const validation = () => {
    const validSchema = userSchema.safeParse(userData);

    if (!validSchema.success) {
        errors.value = validSchema.error.format();
        return false
    } else {
        errors.value = null;
        return true
    }
}

const formHandler = () => {
    if (!validation()) return
    
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(userData)
    }
    const {res, data, err, loading} = useFetch(url.BASE_URL, config);

    fetchData.res = res;
    fetchData.data = data;
    fetchData.err = err;
    fetchData.loading = loading;
};
</script>

<template lang="pug">
form(@submit.prevent="formHandler" id="formCall" class="form" action="" method="POST" novalidate)
    label.form__label(v-for="(item, i) in fields") {{ item.label }}
        component(
            :is="item.type ? 'input' : 'textarea'"
            @input="item.data.value = $event.target.value.trim()"
            :type="item.type"
            :name="item.name"
            :id="item.name"
            :placeholder="item.placeHolder"
            :autofocus="i === 0 ? true : false"
            class="form__field"
            required)
        template(v-if="errors?.[item.name]") 
            span.form__err(v-for="err in errors?.[item.name]?._errors") {{ err }}
        
BaseLink(:button="true" :dark="true" form="formCall" class="center") Вызвать
.notify(v-if="fetchData.res.ok") Успешно
.notify(v-else-if="fetchData.err") {{ fetchData.err }}
</template>

<style lang="scss" scoped>
@import "@/assets/styles/base/vars.scss";
@import "@/assets/styles/base/mixins.scss";
.form {
    @include center;
    flex-direction: column;
    margin: 20px 0 10px;
    
    .form__label {
        height: 69px;
        margin-bottom: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 16px;
        line-height: 24px;
        color: $primaryGray;

        &:has(textarea) {
            height: 96px;
        }
    }

    .form__field {
        width: 363px;
        height: 37px;
        background-color: $primary;
        border: none;
        border-bottom: 1px solid $primaryGraySeccond;
        color: $primaryLight;
        outline: none;
        font-family: "Journal Sans New Regular", sans-serif;
        font-size: 18px;
        line-height: 25px;
        &:focus {
            border-bottom: 1px solid $primaryGraySeccond;
        }
        &::placeholder {
            color: $primaryGray;
        }
        &:-webkit-autofill,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:active {
            -webkit-text-fill-color: $primaryLight !important;
            background-color: $primary !important;
            color: $primaryLight !important;
            transition: background-color 0s 600000s, color 0s 600000s !important;
        }
    }

    textarea.form__field {
        height: 64px;
    }

    .form__err {
        font-family: "Journal Sans New Regular", sans-serif;
        font-size: 14px;
        text-align: center;
        color: $highlight;
    }
}
.center {
	margin: 0 auto;
}

.notify {
    margin: 10px;
    text-align: center;
    color: $highlight;
}
</style>
