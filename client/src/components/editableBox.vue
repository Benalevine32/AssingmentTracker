<template>
    <p>
        <span @click="editing=true" v-show="!editing">
          {{value}}
        </span>
        <span v-show="editing" >
          <input :value="value"
                 @input="$emit('input', $event.target.value)"
                 @keydown.enter="editing=false"
                 type="text" 
                 class="form-control" >
        </span>
    </p>
</template>

<script>
    export default{
        name: "editableBox",
        props:["value"],
        data(){
            return {
            editing: false,
            }
        }
    }
</script>