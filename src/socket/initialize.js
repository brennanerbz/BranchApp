socket.on('connect', (res) => {
  console.log('connect:', res)
  socket.on('connected', (res) => {
    console.log('connected: ', res)
  })
  socket.emit('request connect', {
    user_id: this.props.user
  })
})
