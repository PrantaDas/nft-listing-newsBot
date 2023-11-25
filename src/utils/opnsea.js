/**
 * OpenSeaStreamClient module for interacting with the OpenSea WebSocket API.
 *
 * @module openSeaStreamClient
 * @see {@link https://github.com/ProjectOpenSea/opensea-js OpenSea-Stream-JS Documentation}
 */

import { Network, OpenSeaStreamClient } from "@opensea/stream-js";
import WebSocket from 'ws';

/**
 * OpenSeaStreamClient instance for connecting to the OpenSea WebSocket API on the TESTNET network.
 *
 * @type {OpenSeaStreamClient}
 * @property {Network} network - The network configuration for the OpenSeaStreamClient (TESTNET in this case).
 * @property {Object} connectOptions - The options for connecting to the WebSocket.
 * @property {WebSocket} connectOptions.transport - The transport option for WebSocket connection.
 */
const client = new OpenSeaStreamClient({
    network: Network.TESTNET,
    connectOptions: {
        transport: WebSocket
    }
});

export default client;
