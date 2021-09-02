# Vue3

Vue3のtipsを記載しておく。


## refとreactive

リアクティブなオブジェクトの作成には、ref reactive toRef readonlyを使う。
(他に、shallowReactive shallowReadonlyなどあるが、当面使わなそう。)
```js
<template>
  <div>
    <!-- val1 val4 は書き換わらない -->
    <div>{{ val1 }}</div>
    <div>{{ val2 }}</div>
    <div>{{ val3.p1 }}</div>
    <div>{{ val4 }}</div>
    <div>{{ val5 }}</div>
    <div>{{ val6.p1.value }}</div>
    <div>{{ val7.p1 }}</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, readonly, ref, toRef, toRefs } from "vue";

  export default defineComponent({
    setup: () => {
      //　リアクティブではない
      let val1 = 0;

      //　リアクティブ
      let val2 = ref(0);

      //　リアクティブ
      let val3 = reactive({ p1: 0 });

      //　リアクティブではない
      let tmp4 = reactive({ p1: 0 });
      let val4 = tmp4.p1;

      //　リアクティブ
      let tmp5 = reactive({ p1: 0 });
      let val5 = toRef(tmp5, "p1");

      //　リアクティブ
      let tmp6 = reactive({ p1: 0 });
      let val6 = toRefs(tmp6);

      let tmp7 = reactive({ p1: 0 });
      const val7 = readonly(tmp7);

      setInterval(() => {
        // toRef toRefsで作ったものは .value が必要
        val1++;
        val2.value++;
        val3.p1++;
        val4++;
        val5.value++;
        val6.p1.value++;
        // readonly を使うと直接書き換えできなくなる
        // val7.p1++
        // 元のオブジェクトで書き換える
        tmp7.p1++;
      }, 1000);

      return { val1, val2, val3, val4, val5, val6, val7 };
    },
  });
</script>
```
