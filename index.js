function isInView(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }
  
  window.addEventListener('scroll', function() {
    const whatIs = document.querySelector('.what-is');
    const content = document.querySelector('.content');
    
    if (isInView(whatIs)) {
      whatIs.classList.add('visible');
    }
    
    if (isInView(content)) {
      content.classList.add('visible');
    }
  });
  
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show'); 
    }
  });
}, { threshold: 0.5 }); 

observer.observe(document.querySelector('.core-attributes'));

document.querySelectorAll('.box').forEach(box => {
  observer.observe(box);
});

const text = "Did you know?";
const textElement = document.getElementById("dynamic-text");
let index = 0;
let typingStarted = false;

function typeLetterByLetter() {
  if (index < text.length) {
    textElement.textContent += text.charAt(index);
    index++;
    setTimeout(typeLetterByLetter, 250); 
  }
}

function isInView(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

window.addEventListener('scroll', function() {
  const didYouKnowSection = document.querySelector(".did-you-know");

  if (isInView(didYouKnowSection) && !typingStarted) {
    typingStarted = true; 
    didYouKnowSection.classList.add("visible");
    typeLetterByLetter(); 
  }
});