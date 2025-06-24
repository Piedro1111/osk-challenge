<script setup lang="ts">
import { ref } from 'vue'
import { VSelect, VTextField, VBtn } from 'vuetify/components'

const currencies = [
    { code: 'EUR', name: 'Euro' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'CZK', name: 'Czech Koruna' },
    { code: 'PLN', name: 'Polish Zloty' }
]

const amount = ref(1)
const from = ref('EUR')
const to = ref('USD')
const result = ref('')
const rates = ref<Record<string, number>>({})
const loading = ref(false)
const error = ref('')

const fetchRates = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await fetch(`https://api.frankfurter.app/latest?from=${from.value}`)
        const data = await res.json()
        rates.value = data.rates
        convert()
    } catch (e) {
        error.value = 'Chyba pri načítaní kurzov.'
    } finally {
        loading.value = false
    }
}

const convert = () => {
    if (from.value === to.value) {
        result.value = amount.value.toString()
        return
    }
    const rate = rates.value[to.value]
    if (rate) {
        result.value = (amount.value * rate).toFixed(2)
    } else {
        result.value = ''
    }
}

const swap = () => {
    const tmp = from.value
    from.value = to.value
    to.value = tmp
    amount.value = result.value ? Number(result.value) : 1
    fetchRates()
}

fetchRates()
</script>

<template>
    <main>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
            <VSelect
                v-model="from"
                :items="currencies"
                item-title="name"
                item-value="code"
                label="Východzia mena"
                @update:modelValue="fetchRates"
                :disabled="loading"
                style="min-width: 200px;"
            />
            <VTextField
                v-model.number="amount"
                type="number"
                min="0"
                label="Suma"
                @input="convert"
                :disabled="loading"
                style="max-width: 120px;"
            />
            <VBtn icon rounded="false" @click="swap" :disabled="loading">
                <span>⇄</span>
            </VBtn>
            <VSelect
                v-model="to"
                :items="currencies"
                item-title="name"
                item-value="code"
                label="Cieľová mena"
                @update:modelValue="convert"
                :disabled="loading"
                style="min-width: 200px;"
            />
        </div>
        <div v-if="loading" style="margin-top: 1rem;">Načítavam kurzy...</div>
        <div v-if="error" style="color:red; margin-top: 1rem;">{{ error }}</div>
        <div v-if="result && !loading && !error" style="margin-top: 1rem;">
            <strong>Výsledok:</strong> {{ amount }} {{ from }} = {{ result }} {{ to }}
        </div>
    </main>
</template>
