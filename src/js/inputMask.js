import Inputmask from 'inputmask';

export default function() {
    const phoneNumber = document.querySelector('.js-phone-input');

  if (phoneNumber) {
      console.log('Adding mask')
    Inputmask({ mask: '+7 (999) 999-99-99' }).mask(phoneNumber);
  }
}