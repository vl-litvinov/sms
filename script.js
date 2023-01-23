const input = document.querySelector('.input');
const button = document.querySelector('.button');
const smsText = document.querySelector('.sms-text');

const MAX_LENGTH = 140;
const MAX_SMS_COUNT = 9999;

const textToSMS = (text) => {
  const splittedText = text.split(' ');
  let resultSMS = [];
  let message = '';
  const testSMS = [];
  for (let i = 0; i < splittedText.length; i++) {
    message += splittedText[i];
    message += ' ';
    if (splittedText[i + 1] !== undefined && (message + splittedText[i + 1]).length > MAX_LENGTH - ` ${testSMS.length}/${testSMS.length}`.length) {
      message += `${testSMS.length}/${testSMS.length}`;
      testSMS.push(message);
      message = '';
    }
    if (i === splittedText.length - 1 && message !== '') {
      testSMS.push(message.trim());
      message = '';
    }
  };
  for (let i = 0; i < splittedText.length; i++) {
    message += splittedText[i];
    if (message.length > MAX_LENGTH) {
      smsText.innerText = 'Incorrect message';
      return;
    }
    if (splittedText[i + 1] !== undefined && message.length > MAX_LENGTH - ` ${resultSMS.length}/${testSMS.length}`.length) {
      smsText.innerText = 'Incorrect message';
      return;
    }
    message += ' ';
    if (splittedText[i + 1] !== undefined && (message + splittedText[i + 1]).length > (MAX_LENGTH - ` ${resultSMS.length}/${testSMS.length}`.length)) {
      resultSMS.push(message.trim());
      message = '';
    }
    if (i === splittedText.length - 1 && message !== '') resultSMS.push(message.trim());
  }
  if (resultSMS.length > 1) {
    resultSMS = resultSMS.map((item, i) => item + ` ${i + 1}/${resultSMS.length}`);
  }
  return resultSMS;
};

const handleButtonClick = () => {
  if (input.value?.trim() === '') {
    smsText.innerText = 'Empty field';
    return;
  }
  const sms = textToSMS(input.value?.trim());
  sms.forEach((item) => {
    if(item.length > 140) console.log(item);
  });
  if (sms.length > MAX_SMS_COUNT) {
    smsText.innerText = 'Message too big';
    return;
  }
  smsText.innerText = sms.join('\n');
}

button.addEventListener('click', handleButtonClick);