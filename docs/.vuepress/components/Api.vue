<template>
  <div class="api">
    <code>
      <span :class="method.toLowerCase()">{{ method.toUpperCase() }}</span>
      <span>{{ path }}</span>
    </code>
  </div>
</template>

<script>
export default {
  props: ['method', 'path'],
  name: 'Api',
};
</script>

<style lang="stylus">
.api {
  margin: 10px 0;

  code {
    font-size: 16px;
    background: none;
    padding: 0;
  }

  .get {
    color: #08B162;
  }

  .post {
    color: #DABC2F;
  }

  .patch {
    color: #DABC2F;
  }

  .put {
    color: #3479E7;
  }

  .delete {
    color: #E13928;
  }
}
</style>
