<script setup lang="ts">
import { ref } from 'vue'
import { VSelect, VTextField, VBtn, VCard, VCardTitle, VCardText } from 'vuetify/components'

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
        <VCard outlined class="mb-4">
            <VCardTitle>
                Konvertor mien
            </VCardTitle>
            <VCardText>
                Vyberte východziu a cieľovú menu a zadajte sumu.
            </VCardText>
        </VCard>
        <div class="main-container">
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
            <VBtn icon rounded="0" @click="swap" :disabled="loading" style="height: 56px; margin-top: -20px;">
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
        <div v-if="loading" class="loading-text">Načítavam kurzy...</div>
        <div v-if="error" class="error-text">{{ error }}</div>
        <div v-if="result && !loading && !error">
            <VCard outlined color="success" class="result-card">
                <VCardTitle>
                    Výsledok
                </VCardTitle>
                <VCardText>
                    {{ amount }} {{ from }} = {{ result }} {{ to }}
                </VCardText>
            </VCard>
        </div>
    </main>
</template>

<style scoped>
.main-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    margin-top: 2.5rem;
}
.loading-text {
    margin-top: 1rem;
}
.error-text {
    color: red;
    margin-top: 1rem;
}
.result-card {
    padding: 1rem;
}
</style>
