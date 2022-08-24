import axios from 'axios'
const host = process.env.REACT_APP_SERVER

export const getPilots = async () => {
  try {
    return await axios.get(`${host}/getPilots`).then(res => {
      return res
    })
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getPilotsBy = async (filter, id) => {
  try {
    return await axios.get(`${host}/PilotsBy/${filter}/${id}`).then(res => {
      return res
    })
  } catch (e) {
    console.log(e)
    return null
  }
}

export const setNewPilot = async newCar => {
  try {
    return await axios
      .post(`${host}/newPilot`, newCar)
      .then(res => {
        return res
      })
  } catch (e) {
    console.log(e)
    return null
  }
}

export const delPilot = async (idCar) => {
  try {
    return await axios
      .delete(`${host}/pilot/${idCar}`)
      .then(res => {
        return res
      })
  } catch (e) {
    console.log(e)
    return null
  }
}

export const upPilot = async setCar => {
  try {
    return await axios
      .put(`${host}/setPilot`, setCar)
      .then(res => {
        return res
      })
  } catch (e) {
    console.log(e)
    return null
  }
}
