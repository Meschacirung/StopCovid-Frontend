var SMOOTH_SCROLL_DURATION = 700;
$('.smooth-scroll').on('click', 'a', function () {
  var elAttr = $(this).attr('href');

  if (typeof elAttr !== typeof undefined && elAttr.indexOf('#') === 0) {
    var offset = $(this).attr('data-offset') ? $(this).attr('data-offset') : 0;
    var setHash = $(this).parentsUntil('.smooth-scroll').last().parent().attr('data-allow-hashes');
    $('body,html').animate({
      scrollTop: $(elAttr).offset().top - offset
    }, SMOOTH_SCROLL_DURATION);

    if (typeof setHash !== typeof undefined && setHash !== false) {
      history.replaceState(null, null, elAttr);
    }

    return false;
  }
});

const form = document.querySelector("#submit");
const message =  document.querySelector("#message");
const post =  document.querySelector("#post");

const BOT_MSGS = [
  "Bonjour, j'espère que vous prennez bien soins de vous.",
  "Qu'est-ce que je peux faire pour vous ?",
  "Aidez moi à vous aider",
  "Voulez vous que j'envoie vos résultats à un médecin ?",
  "Je suis ravis de l'attendre :("
];


form.addEventListener('submit', (e)=>{
  e.preventDefault();
  botResponse();
  apppendMessage("right", message.value)
  message.value = "";
})

function apppendMessage(side, text){
  const msgHTML = `
  <div class="msg">
      <div class="text-${side}">
          <div class="text-${side}">
              <img src="images/icon.png" width="20" alt="" class="img-fluid"> <br class="mb-2">
              </div>
              <div class=" msg-${side} mt-2" id="question">
              ${text}
          </div>
      </div>
  </div>`;

  post.insertAdjacentHTML("beforeend", msgHTML);
  post.scrollTop += 500;
}
function botResponse(){
  const r = random(BOT_MSGS.length - 1,0);
  const msgText = BOT_MSGS[r];
  const delay = msgText.split(" ").length * 100;
  setTimeout(()=> {
    apppendMessage('left', msgText)
  },delay);
}
function get(selector, root = document){
  return root.querySelector(selector);
}

function formatDate(date){
  const h = "0" + date.getHours();
  const m = "0" + date.getMinute();

  return '${(h.slice(-2)}:${m.slice(-2)}';
}

function random (min, max){
  return Math.floor(Math.random() * (max - min) + min );
}