export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} float-right text-green-400 text-xl`;

    // arg 是 directive 的 property
    if (binding.arg == 'full') {
      iconClass = binding.value;
    }
    // 綁定的元素有 'full' 字串關鍵字，iconClass 才會改變
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
