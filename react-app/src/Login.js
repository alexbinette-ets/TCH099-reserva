const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;

        
    }
    return (
        <div>
            <form onSubmit={HandleSubmit} className="LoginForm">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
                <br />

                <label htmlFor="password" required>Password:</label>
                <input type="password" id="password" name="password" />
                <br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Login;