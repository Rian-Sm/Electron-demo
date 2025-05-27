const information = document.getElementById('info')
const appVersion = document.getElementById('appVersion')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`

const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'

  information.innerText += ` \nResponse from main process: ${response}`

  const version = await window.versions.version()
  appVersion.innerHTML += ` \n App version: ${version}`
}

func()