import { Server, Socket } from "socket.io";

export const socketEventHandler = (io: Server) => {
    const socketIdToUsersMap: { [key: string]: { username: string } } = {};
    const roomIdToCodeMap = {};

    async function getUsersInRoom(roomId: string, io) {
        const socketList = await io.in(roomId).allSockets()
        const userslist: string[] = []
        socketList.forEach(((each: string) => {
            (each in socketIdToUsersMap) && userslist.push(socketIdToUsersMap[each].username);
        }));
        return userslist
    }


    async function updateUserslistAndCodeMap(io: Server, socket: Socket, roomId: string) {
        //when user left
        socket.in(roomId).emit("member_left", { username: socketIdToUsersMap[socket.id].username })
        // update the user list
        delete socketIdToUsersMap[socket.id]
        const userslist = await getUsersInRoom(roomId, io)
        socket.in(roomId).emit("updating_client_list", { userslist: userslist })
        userslist.length === 0 && delete roomIdToCodeMap[roomId]
    };

    //Whenever someone connects this gets executed
    io.on('connection', async function (socket: Socket) {
        console.log('🚀 user connected', socket.id);

        socket.on("user_join", async ({ roomId, username }) => {

            console.log("🚀 user_join : username: ", username);

            socketIdToUsersMap[socket.id] = { username }
            socket.join(roomId)

            const userslist = await getUsersInRoom(roomId, io)

            // for other users, updating the client list
            socket.in(roomId).emit("updating_client_list", { userslist: userslist });
            // for this user, updating the client list
            io.to(socket.id).emit("updating_client_list", { userslist: userslist });

            // send the latest code changes to this user when joined to existing room
            if (roomId in roomIdToCodeMap) {
                io.to(socket.id).emit("on_language_change", { languageUsed: roomIdToCodeMap[roomId].languageUsed })
                io.to(socket.id).emit("on_code_change", { code: roomIdToCodeMap[roomId].code })
            }

            // alerting other users in room that new user joined
            socket.in(roomId).emit("new_member_joined", {
                username
            });
        });

        // for other users in room to view the changes
        socket.on("update_language", ({ roomId, languageUsed }) => {
            if (roomId in roomIdToCodeMap) {
                roomIdToCodeMap[roomId]['languageUsed'] = languageUsed;
            } else {
                roomIdToCodeMap[roomId] = { languageUsed };
            }
        })

        // for user editing the code to reflect on his/her screen
        socket.on("sync_language", ({ roomId }) => {
            if (roomId in roomIdToCodeMap) {
                socket.in(roomId).emit("on_language_change", { languageUsed: roomIdToCodeMap[roomId].languageUsed })
            }
        })

        // for other users in room to view the changes
        socket.on("update_code", ({ roomId, code }) => {
            if (roomId in roomIdToCodeMap) {
                roomIdToCodeMap[roomId]['code'] = code;
            } else {
                roomIdToCodeMap[roomId] = { code };
            }
        })

        // for user editing the code to reflect on his/her screen
        socket.on("sync_code", ({ roomId }) => {
            if (roomId in roomIdToCodeMap) {
                socket.in(roomId).emit("on_code_change", { code: roomIdToCodeMap[roomId].code })
            }
        });

        socket.on("leave_room", ({ roomId }) => {
            socket.leave(roomId)
            updateUserslistAndCodeMap(io, socket, roomId)
        });

        socket.on("disconnecting", (reason) => {
            socket.rooms.forEach(eachRoom => {
                if (eachRoom in roomIdToCodeMap) {
                    updateUserslistAndCodeMap(io, socket, eachRoom)
                }
            })
        })

        //Whenever someone disconnects this piece of code executed
        socket.on('disconnect', function () {
            console.log('🚀 user disconnected');
        })
    })

}