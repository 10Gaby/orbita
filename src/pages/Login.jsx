import '../css/login.css';

function Login(){
    return (
        <div>
            <h1>Inicia Sesión</h1>
            <p>Por favor ingresa tus credenciales para iniciar sesión.</p>
            <form>
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