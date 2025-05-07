import ParticlesBackground from "../componentes/Particles";

function Carga({ className }) {
  return (
    <section className={`contenedor center global-carga ${className || ""}`}>
      <div className="contenedor-carga">
        <img src="/Nave.svg" alt="" />
        <div className="cargador">
            <div className="carga"></div>
        </div>
      </div>
    </section>
  );
}

export default Carga;