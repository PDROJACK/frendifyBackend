const User = require("../models/userModel");
const Room = require("../models/roomModel");

module.exports = (io) => {
  // Handle the user ID
  io.use((socket, next) => {
    const id = socket.handshake.auth.id;
    if (!id || id === socket.id) {
      return next(new Error("invalid id"));
    }
    socket.id = id;
    next();
  });

  // Handle connection event
  io.on("connection", async (socket) => {
    // User trying to connect to our application, find if it exists in db
    var user = await User.findOne({ id: socket.handshake.auth.id });

    // Check if song room exist in db
    let room = await Room.findOne({ trackId: socket.handshake.auth.trackId });
    
    // console.log(socket.handshake.auth)
    
    // If not then add it to db and also add the user in song room
    if (!user) {
      
        user = {
            profile: socket.handshake.auth.profile,
            display_name: socket.handshake.auth.display_name,
            id: socket.handshake.auth.id,
            trackId: socket.handshake.auth.trackId,
            profile: socket.handshake.auth.profile[0] ? socket.handshake.auth.profile[0].url :"https://fillmurray.com/200/300"
        };
        
        var userData = User({
            ...user
        });
        
        userData = await userData.save();
    }


    if (!room){

        let room = {
            trackName: socket.handshake.auth.trackName,
            trackId: socket.handshake.auth.trackId,
            users: [user ? user.id : userData.id]
        }

        room = await Room.create(room);
    } else {
        let k = await Room.updateOne({trackId: socket.handshake.auth.trackId}, {
            $addToSet: {
                users: user ? user.id : userData.id
            }
        }, {new: true});
    }

    // const users =  await Room.findOne({trackId: socket.handshake.auth.trackId}).populate("users")

    // Sending all users in current room to the listeners 
    // socket.emit("users", users.users);
    
    // console.log(socket.handshake.auth.trackId)
    socket.join(socket.handshake.auth.trackId);

    socket.on("send-message", (message) => { 
      console.log(message);
      message.content.username = message.username;
      socket.broadcast.to(message.trackId).emit("get-message", message);
    });

    socket.on("disconnect", async() => {
      console.log("socket disconnected");

      // Find user using spotify id
      // const user = await User.findOne({id: socket.handshake.auth.id});

      // // Removing user from room 
      // await Room.updateOne({trackId: socket.handshake.auth.trackId},{
      //     $pull: {
      //         users: user.id
      //     }
      // })
        
      // socket.leave(socket.handshake.auth.trackId);
    });

    socket.on("changeroom", (user) => {
      console.log("changeroom");
      socket.join(user.trackId);
    });
    
  });
};
