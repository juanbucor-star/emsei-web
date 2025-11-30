fetch('/site_data/informacion.json')
  .then(r=>r.json()).then(data=>{
    document.getElementById('hero-title').innerText=data.hero_title||"";
});