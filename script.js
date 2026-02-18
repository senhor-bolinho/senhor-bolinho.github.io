const SERVER_IP = "jogar.pancakesmc.fun";

/* STATUS (só executa se existir os elementos) */
if(document.getElementById("server-status")){
  fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`)
    .then(res=>res.json())
    .then(data=>{
      if(data.online){
        document.getElementById("server-status").innerText="Online";
        document.getElementById("server-status").className="online";
        document.getElementById("players").innerText=data.players.online+"/"+data.players.max;
        document.getElementById("version").innerText=data.version;

        if(data.players.list){
          document.getElementById("player-list").innerHTML=
            "<br><b>Jogadores Online:</b><br>"+data.players.list.join("<br>");
        }
      }else{
        document.getElementById("server-status").innerText="Offline";
        document.getElementById("server-status").className="offline";
      }
    })
    .catch(err => {
      console.error("Erro ao buscar status:", err);
      document.getElementById("server-status").innerText="Erro ao conectar";
      document.getElementById("server-status").className="offline";
    });
}

/* ANÚNCIOS DINÂMICOS */
if(document.getElementById("announcement")){
  const anuncios = [
    "🔥 Bem-vindo ao PancakesMC!",
    "💬 Entre no nosso Discord para novidades!",
    "🎉 Eventos exclusivos com alefftdl!",
    "🌟 Jogue agora em jogar.pancakesmc.fun!",
    "🏗️ Survival com economia equilibrada!",
    "🎮 Participe dos eventos ao vivo!",
    "⭐ Siga Alefftdl no YouTube e TikTok!"
  ];

  let index = 0;
  setInterval(()=>{
    index = (index + 1) % anuncios.length;
    document.getElementById("announcement").innerText = anuncios[index];
  }, 5000);
}

/* COPIAR IP COM FEEDBACK CORRIGIDO */
function copiarIP(btn){
  navigator.clipboard.writeText(SERVER_IP).then(() => {
    // Se o botão não for passado (chamada antiga), tenta encontrar o botão clicado
    const targetBtn = btn || event.currentTarget || event.target;
    
    if (targetBtn && targetBtn.innerHTML) {
      const originalText = targetBtn.innerHTML;
      targetBtn.innerHTML = "✓ IP Copiado!";
      const originalBackground = targetBtn.style.background;
      targetBtn.style.background = "linear-gradient(135deg, #00ff00 0%, #00cc00 100%)";
      
      setTimeout(() => {
        targetBtn.innerHTML = originalText;
        targetBtn.style.background = originalBackground;
      }, 2000);
    } else {
      alert("IP copiado: " + SERVER_IP);
    }
  }).catch(err => {
    alert("Erro ao copiar IP: " + err);
  });
}

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ANIMAÇÃO DE ENTRADA PARA CARDS */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});
