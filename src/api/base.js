
import axios from './axios'

export const enter = (opt) => {
    return axios.post(`/kiwiar/yang_he_game/page`,opt)
}
export const award = (opt) => {
    return axios.post(`/kiwiar/yang_he_game/draw`,opt)
}