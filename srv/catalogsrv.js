const cds = require("@sap/cds");
const { Books } = cds.entities;

module.exports = srv => {
    const db = cds.db;

    //Read
        srv.on("READ", "Books", async (req) => {
            results = [];
            results = await db.run(SELECT.from(Books));//.where({ ID: req.data.ID }));
            return results;
        });
    
    //Before Create
        srv.before("CREATE", "Books", async (request) => {
            if(request.data.price < 0){
                return request.error(400, "Price cannot be negative");
            }
        });    



    //Create
        srv.on("CREATE", "Books", async (req) => {
            results = [];
            results = await db.run([INSERT.into(Books).entries(req.data)]).then((resolve, reject) => {
                if(resolve){
                    return req.data;
                }else{
                    return req.error(400, "Error creating book entry");
                }
            }).catch((err) => {
                return req.error(500, "Server down"+ err.toString());
            });

            return results;
            })
    
    //Update
    srv.on("UPDATE", "Books", async (req) => {
            results = [];
            results = await db.run([UPDATE(Books).set(req.data).where({ ID: req.data.ID })]).then((resolve, reject) => {
                if(resolve){
                    return req.data;
                }else{
                    return req.error(400, "Error updating book entry");
                }
            }).catch((err) => {
                return req.error(500, "Server down"+ err.toString());
            });

            return results;
            })
    
    //After Update
    srv.after("UPDATE", "Books", async (req) => {
       console.log("Book entry updated successfully with ID: "+ req.data.ID);
    })
    
    
    
    //DELETE
    srv.on("DELETE", "Books", async (req) => {
            results = [];
            results = await db.run([DELETE.from(Books).where({ ID: req.data.ID })]).then((resolve, reject) => {
                if(resolve){
                    return req.data;
                }else{
                    return req.error(400, "Error deleting book entry");
                }
            }).catch((err) => {
                return req.error(500, "Server down"+ err.toString());
            });

            return results;
            })
}