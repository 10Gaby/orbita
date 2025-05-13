import '../css/login.css';

function Login(){
    return (
        <div className='contenedor-general'>
            <h2>Inicia Sesión</h2>
            <p>Por favor ingresa tus credenciales para iniciar sesión.</p>
            <form className='sf-1'>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="clave">Contraseña:</label>
                    <input type="password" id="clave" name="clave" required />
                </div>
                <button type="submit">Iniciar Sesión</button>
                <button type="button" onClick={() => alert('Forgot Password?')}>¿Olvidaste tu contrasña?</button>
            </form>
        </div>
    );
}

export default Login;