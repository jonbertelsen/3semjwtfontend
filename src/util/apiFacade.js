const URL = "http://localhost:7070/api/v1/";

function handleHttpErrors(res)
{
    if (!res.ok)
    {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

function apiFacade()
{
    /* Insert utility-methods from a later step (d) 
    here (REMEMBER to uncomment in the returned 
    object when you do)*/

    const setToken = (token) =>
    {
        localStorage.setItem('jwtToken', token)
    }
    const getToken = () =>
    {
        return localStorage.getItem('jwtToken')
    }
    const loggedIn = () =>
    {
        const loggedIn = getToken() != null;
        return loggedIn;
    }
    const logout = () =>
    {
        localStorage.removeItem("jwtToken");
    }

    const getUserRoles = () =>
    {
        const token = getToken()
        if (token != null)
        {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const roles = decodedClaims.roles
            return roles
        } else return ""
    }

    const hasUserAccess = (neededRole, loggedIn) =>
    {
        const roles = getUserRoles().split(',')
        return loggedIn && roles.includes(neededRole)
    }


    const login = (user, password) =>
    {
        const options = makeOptions("POST", true, { username: user, password: password });
        return fetch(URL + "auth/login", options)
            .then(handleHttpErrors)
            .then(res => { setToken(res.token) })
    }
    const fetchData = (endpoint, method, body) =>
    {
        const options = makeOptions(method, true, body); //True add's the token
        return fetch(URL + endpoint, options).then(handleHttpErrors);
    }

    const makeOptions = (method, addToken, body) =>
    {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken && loggedIn())
        {
            opts.headers["Authorization"] = `Baerer ${getToken()}`;
        }
        if (body)
        {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }

    return {
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        fetchData,
        getUserRoles,
        hasUserAccess
    }
}
const facade = apiFacade();
export default facade;