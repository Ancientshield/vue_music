export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} text-xl`;

    // arg 是 directive 的 property
    if (binding.arg == 'full') {
      iconClass = binding.value;
    }

    // modifiers 也是 directive 的 property
    // 一個包含 modifiers（修飾符）的物件。
    // 例：在 v-my-directive.foo.bar 中，modifiers（修飾符）物件為 { foo: true, bar: true }
    if (binding.modifiers.right) {
      // 記得 class 屬性字串前要加空白！
      iconClass += ' float-right';
    }

    if (binding.modifiers.yellow) {
      iconClass += ' text-yellow-400';
    } else {
      iconClass += ' text-green-400';
    }

    // 綁定的元素有 'full' 字串關鍵字，iconClass 才會改變
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
