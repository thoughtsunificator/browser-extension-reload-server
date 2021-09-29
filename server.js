import WS from "ws"

let addons = null

const _websocketServer = new WS.Server({ port: 7879 })

_websocketServer.on('connection', async webSocket => {

	webSocket.on('message', message => {
		const { query, data } = JSON.parse(message)

		console.log(query, data)

		if(query === "reload") {
			_websocketServer.clients.forEach(client => {
				client.send(JSON.stringify({ query: "reload", data }))
			})
		} else if(query === "addons load") {
			addons = data
		} else if(query === "initialize") {
			if(addons === null) {
				_websocketServer.clients.forEach(client => {
					client.send(JSON.stringify({ query: "addons load" }));
				})
			} else {
				webSocket.send(JSON.stringify({ query: "initialize", data: addons }))
			}
		}

	})

})

