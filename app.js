const eheader = document.createElement('e-header');
document.body.appendChild(eheader);

const script = document.createElement('script');
script.src = './components/header.js';
document.head.appendChild(script);

const style = document.createElement('link');
style.rel = 'stylesheet';
style.href = './css/master.css';
document.head.appendChild(style);