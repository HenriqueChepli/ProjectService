<template>
  <main>
    <div id="banner">
      <video src=""></video>
    </div>
    <div class="mainHome">
      <div class="titleHome">
        <h1>Bensa StreetWear Vai Se Fuder Alessandra</h1>
      </div>
      <div class="descriptionHome">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, excepturi molestiae. Vel velit minima officiis culpa, voluptas similique dolorum omnis porro vitae totam repellat consectetur provident quam reiciendis adipisci molestias.</p>
      </div>
      <div class="buttonsHome">
        <button><img src="#" alt=">">Play</button>
        <button><img src="#" alt="#">Mais Info</button>
      </div>
    </div>
  </main>
</template>
<style scoped>
  main{
    width: 100%;
  }

  #banner {
  position: absolute;
  width: 100%;
  height: 80dvh;
  object-fit: cover;
}

  .mainHome{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 30px;
    padding: 50px;
  }

  .mainHome .titleHome{
    text-align: center;
    font-size: 40px;
    max-width: 45dvw;
  }

  .mainHome .descriptionHome{
    text-align: justify;
    font-size: 16px;
    letter-spacing: 1px;
    max-width: 45dvw;
    color: #424242;
  }

  .mainHome .buttonsHome{
    display: flex;
    gap: 30px;
  }

  .mainHome .buttonsHome button{
    display: flex;
    gap: 7px;
    background-color: #313131;
    color: #fff;
    padding: 10px 20px;
    font-size: 20px;
    border-radius: 5px;
    transition: all .45s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .mainHome .buttonsHome button:nth-child(1){
    background: #fff;
    color: #000;
  }

  .mainHome .buttonsHome button:hover{
    transform: translateY(-3.5px);
  }
</style>