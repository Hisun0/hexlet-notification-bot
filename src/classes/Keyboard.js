export class Keyboard {
  constructor(buttons, options = {}) {
    this.reply_markup = {
        keyboard: [buttons],
        resize_keyboard: options.resizeKeyboard || true,
        one_time_keyboard: options.oneTimeKeyboard || true,
    };
    
    Object.assign(this, options);
  }
};
