<script>
export default {
  name: 'HttpStatus',
  functional: true,
  props: {
    code: {
      type: String,
    },
  },
  render(h, { props }) {
    const { code: text } = props;
    let color = 'none';
    if (text.startsWith('2')) {
      color = '#08B162AA';
    } else if (text.startsWith('3')) {
      color = '#E8B62DAA';
    } else if (text.startsWith('4')) {
      color = '#E13928AA';
    } else if (text.startsWith('5')) {
      color = '#E13928AA';
    } else {
      color = '#E8B62DAA';
    }
    return h(
      'span',
      {
        class: 'httpstatus',
        style: {
          backgroundColor: color,
        },
      },
      text,
    );
  },
};
</script>

<style lang="stylus" scoped>
.httpstatus {
  display: inline-block;
  border-radius: 4px;
  padding: 0 6px;
  color: white;
}
</style>
