// eslint-disable-next-line no-undef
Component({
  properties: {
    value: {
      type: String,
      value: '',
    },
    classnames: {
      type: String,
      value: '',
    },
    disableDefaultPadding: {
      type: Boolean,
      value: true,
    },
    showConfirmBar: {
      type: Boolean,
      value: true,
    },
    adjustPosition: {
      type: Boolean,
      value: true,
    },
    focus: {
      type: Boolean,
      value: true,
    },
    placeholder: {
      type: String,
      value: '请输入内容',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    maxLength: {
      type: Number,
      value: 140,
    },
    maxlength: {
      type: Number,
      value: 140,
    },
    cursorSpacing: {
      type: Number,
      value: 32,
    },
    placeholderClass: {
      type: String,
      value: '',
    },
    autoFocus: {
      type: Boolean,
      value: false,
    },
    cursor: {
      type: Number,
      value: 0,
    },
    holdKeyboard: {
      type: Boolean,
      value: false,
    },
    confirmType: {
      type: String,
      value: 'return',
    },
    adjustKeyboardTo: {
      type: String,
      value: 'cursor',
    },
    style: {
      type: String,
      value: '',
    },
  },
  methods: {
    handleFocus(e) {
      this.triggerEvent('focus', { value: e.detail.value })
    },
    handleBlur(e) {
      this.triggerEvent('blur', { value: e.detail.value })
    },
    handleInput(e) {
      this.triggerEvent('input', { value: e.detail.value })
    },
    handleLineChange(e) {
      this.triggerEvent('linechange', e)
    },
    handleConfirm(e) {
      this.triggerEvent('confirm', { value: e.detail.value })
    },
    keyboardHeightChange(e) {
      this.triggerEvent('keyboardheightchange', { value: e.detail.value })
    },
  },
})
