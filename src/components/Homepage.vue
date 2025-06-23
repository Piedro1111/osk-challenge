<script setup lang="ts">
import { ref } from 'vue'

// Meny na výber
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

async function fetchRates() {
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

function convert() {
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

function swap() {
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
        <div>
            <label>Východzia mena:
                <select v-model="from" @change="fetchRates">
                    <option v-for="c in currencies" :key="c.code" :value="c.code">{{ c.name }} ({{ c.code }})</option>
                </select>
            </label>
            <input type="number" v-model.number="amount" min="0" @input="convert" />
            <button @click="swap">⇄</button>
            <label>Cieľová mena:
                <select v-model="to" @change="convert">
                    <option v-for="c in currencies" :key="c.code" :value="c.code">{{ c.name }} ({{ c.code }})</option>
                </select>
            </label>
        </div>
        <div v-if="loading">Načítavam kurzy...</div>
        <div v-if="error" style="color:red">{{ error }}</div>
        <div v-if="result && !loading && !error">
            <strong>Výsledok:</strong> {{ amount }} {{ from }} = {{ result }} {{ to }}
        </div>
    </main>
</template>
