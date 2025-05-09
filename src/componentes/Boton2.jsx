import '../css/boton2.css';

function Boton2({ href, children }) {
  return (
        <a class="uiverse" href={href}>
        <div class="wrapper">
            <span>{children || 'Clic Aquí'}</span>
            <div class="circle circle-12"></div>
            <div class="circle circle-11"></div>
            <div class="circle circle-10"></div>
            <div class="circle circle-9"></div>
            <div class="circle circle-8"></div>
            <div class="circle circle-7"></div>
            <div class="circle circle-6"></div>
            <div class="circle circle-5"></div>
            <div class="circle circle-4"></div>
            <div class="circle circle-3"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-1"></div>
        </div>
        </a>

  );
}

export default Boton2;