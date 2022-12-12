import { getAuth } from "firebase/auth"
import { getData } from "../utils/storage"

const update = (app, object) => {
    const auth = getAuth(app);
    console.log(auth)
}

export {
    update
}