import axios from 'axios'
const host = process.env.REACT_APP_SERVER

export const getCars = async () => {
  try {
    return await axios.get(`${host}/getCars`).then(res => {
      return res
    })
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getCarsBy = async (filter, id) => {
  try {
    return await axios.get(`${host}/getBy/${filter}/${id}`).then(res => {
      return res
    })
  } catch (e) {
    console.log(e)
    return null
  }
}

export const setNewCar = async newCar => {
  try {
    return await axios
      .post(`${host}/newCar`, newCar)
      .then(res => {
        return res
      })
  } catch (e) {
    console.log(e)
    return null
  }
}

export const delCar = async (idCar) => {
  try {
    return await axios
      .delete(`${host}/${idCar}`)
      .then(res => {
        return res
      })
  } catch (e) {
    console.log(e)
    return null
  }
}

export const upCar = async setCar => {
  try {
    return await axios
      .put(`${host}/setCar`, setCar)
      .then(res => {
        return res
      })
  } catch (e) {
    console.log(e)
    return null
  }
}
