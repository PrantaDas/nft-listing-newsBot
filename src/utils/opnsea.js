import { Network, OpenSeaStreamClient } from "@opensea/stream-js";
import WebSocket from 'ws'

const client = new OpenSeaStreamClient({
    network: Network.TESTNET,
    connectOptions: {
        transport: WebSocket
    }
});

export default client;