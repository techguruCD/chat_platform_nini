import { toast } from 'react-toastify'

export default function toast1(content, type) {
    console.log(123)
    toast(content, {
        type,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}