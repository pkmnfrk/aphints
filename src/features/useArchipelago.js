import { Client, ITEMS_HANDLING_FLAGS, COMMON_TAGS } from "archipelago.js";
import {useState, useEffect} from "react";

function useArchipelagoInternal(server, port, game, name, onError) {
    const [client] = useState(() => new Client());

    useEffect(() => {
        client.connect({
            hostname: server,
            port: port,
            game: game,
            name: name,
            items_handling: ITEMS_HANDLING_FLAGS.REMOTE_ALL,
            tags: [COMMON_TAGS.TRACKER],
        }).catch((e) => {
            if(onError) {
                onError(e);
            }
        });

        return () => {
            client.disconnect();
        }
    }, [server, port, game, name])

    return client;
}
export function useArchipelago(server, port, game, name, onAuthenticated, onReceivedItem, onError) {
    const client = useArchipelagoInternal(server, port, game, name, onError);

    useEffect(() => {
        /** @param {import("archipelago.js").ConnectedPacket} data */
        const _onConnected = (data) => {
            if(onAuthenticated) {
                onAuthenticated(data);
            }

            if(onReceivedItem && data.checked_locations) {
                console.log("Sending items from connect", data);
                for(const loc of data.checked_locations) {
                    onReceivedItem(data.slot, loc);
                }
            }
        };
        
        const _onReceivedItems = (data) => {
            if(onReceivedItem) {
                console.log("Sending items from ReceivedItems", data);
                for(const item of data.items) {
                    onReceivedItem(item.player, item.location);
                }
            }
        };

        const _onRoomUpdate = (data) => {
            if(onReceivedItem && data.checked_locations) {
                console.log("Sending items from RoomUpdate", data);
                for(const item of data.checked_locations) {
                    onReceivedItem(client.data.slot, item);
                }
            }
        };

        client.addListener("Connected", _onConnected);
        client.addListener("ReceivedItems", _onReceivedItems);
        client.addListener("RoomUpdate", _onRoomUpdate);
        

        return () => {
            client.removeListener("Connected", _onConnected);
            client.removeListener("ReceivedItems", _onReceivedItems);
            client.removeListener("RoomUpdate", _onRoomUpdate);
        };
    }, [server, port, name, game]);

    return client;
}