
import Cookies from 'universal-cookie'
import jwtDecode from "jwt-decode"

const cookies = new Cookies();

export const getCookiesLoginedUser = () => {

    let securedData = cookies.get("securedData")

    if (!securedData)
        return null

    try {
        let decodedData = jwtDecode(securedData)
        return decodedData
    } catch (error) {
        return null
    }

}

export const setCookiesLoginedUser = (user) => {

    let now = new Date()
    let time = now.getTime()
    time += 3600 * 1000
    now.setTime(time)
    cookies.set("securedData", JSON.stringify(user), { path: '/', expires: now })
}

export const removeCookiesLoginedUser = () => {

    cookies.remove("securedData")
}