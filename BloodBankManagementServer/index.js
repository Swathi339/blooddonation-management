const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

const uri = "mongodb://admin:adminmongo@ac-au9ntnq-shard-00-00.f7ems7g.mongodb.net:27017,ac-au9ntnq-shard-00-01.f7ems7g.mongodb.net:27017,ac-au9ntnq-shard-00-02.f7ems7g.mongodb.net:27017/bloodBankCollection?ssl=true&replicaSet=atlas-37xn5y-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// mongodb
async function run() {
  try {
    // await client.connect();
    const bloodBankCollection = client
      .db("bloodBankCollection")
      .collection("users");
    const donationRequests = client
      .db("bloodBankCollection")
      .collection("donationRequests");
    const allBlogs = client.db("bloodBankCollection").collection("allBlogs");

    // Save user data into mongoDB
    app.post("/users", async (req, res) => {
      const userData = req.body;
      const result = await bloodBankCollection.insertOne(userData);
      res.send(result);
    });
    // Find logged user data
    app.get("/users/:email", async (req, res) => {
      const { email } = req.params;
      const user = await bloodBankCollection.findOne({ email });
      res.send(user);
    });

    // Search for donors based on blood group, district, and upazila
    app.get("/users", async (req, res) => {
      const { bloodGroup, district, upazila } = req.query;
      const query = {};

      if (bloodGroup) {
        query.bloodGroup = { $regex: new RegExp(bloodGroup, "i") };
      }
      if (district) {
        query.district = { $regex: new RegExp(district.trim(), "i") };
      }
      if (upazila) {
        query.upazila = { $regex: new RegExp(upazila.trim(), "i") };
      }

      try {
        const result = await bloodBankCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({ error: "An error occurred while querying the database" });
      }
    });

    app.get("/usermobilenumber", async (req, res) => {
      const {  district, upazila } = req.query;
      const query = {};

      if (district) {
        query.district = { $regex: new RegExp(district.trim(), "i") };
      }
      if (upazila) {
        query.upazila = { $regex: new RegExp(upazila.trim(), "i") };
      }

      try {
        const result = await bloodBankCollection
          .find(query, { projection: { mobilenumber: 1, _id: 0 } }) // Only get mobilenumber
          .toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({
          error: "An error occurred while querying the database",
        });
      }
    });
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    app.get("/usersnumber", async (req, res) => {
      const { district, upazila, message } = req.query
      const query = {};

      if (district) {
        query.district = { $regex: new RegExp(district.trim(), "i") };
      }
      if (upazila) {
        query.upazila = { $regex: new RegExp(upazila.trim(), "i") };
      }

      try {
        const result = await bloodBankCollection
          .find(query, { projection: { mobilenumber: 1, _id: 0 } }) // Only get mobilenumber
          .toArray();
          const smsResponses = [];
          console.log(result)

          for (const user of result) {
            const recipient = "+91" + user.mobilenumber;
            const smsText = message || "Default test message";
      
            const apiUrl = `http://api.textmebot.com/send.php?recipient=${encodeURIComponent(
              recipient
            )}&apikey=8m9Rv4nSSp2F&text=${encodeURIComponent(
              smsText
            )}&json=yes`;
      
            const response = await fetch(apiUrl);
            const data = await response.json();
            smsResponses.push({ mobilenumber: user.mobilenumber, response: data });
            console.log(recipient)
            if (data.status === "error") {
              console.log("Waiting 8 seconds due to rate limit...");
              await sleep(10000); // 8000ms = 8 seconds
              const response = await fetch(apiUrl);
              const data = await response.json();
              smsResponses.push({ mobilenumber: user.mobilenumber, response: data });
            }
          }

       console.log(smsResponses)
       
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({
          error: "An error occurred while querying the database",
        });
      }
  
   
    } );

    // Update user profile
    app.put("/users/:email", async (req, res) => {
      const { email } = req.params;
      const updatedUserData = req.body;
      delete updatedUserData._id;
      const result = await bloodBankCollection.updateOne(
        { email },
        { $set: updatedUserData }
      );
      res.send(result);
    });
    // Update user status or role
    app.patch("/users/:id", async (req, res) => {
      const { id } = req.params;
      const { status, role } = req.body;

      try {
        const updateData = {};
        if (status) updateData.status = status;
        if (role) updateData.role = role;

        const result = await bloodBankCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );

        if (result.matchedCount > 0) {
          res.json({ success: true, message: "User updated successfully." });
        } else {
          res.status(404).json({ success: false, message: "User not found." });
        }
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // delete user
    app.delete("/users/:id", async (req, res) => {
      const { id } = req.params;
      const result = await bloodBankCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // Save Create Donation data into mongoDB
    app.post("/donation-requests", async (req, res) => {
      const donationRequest = req.body;
      const result = await donationRequests.insertOne(donationRequest);
      res.send(result);
    });

    // Get Donation Requests data
    app.get("/donation-requests/:email", async (req, res) => {
      const { email } = req.params;
      const result = await donationRequests
        .find({ requesterEmail: email })
        .toArray();
      res.send(result);
    });

    // Get All Donation Requests data
    app.get("/donation-requests", async (req, res) => {
      const result = await donationRequests.find().toArray();
      res.send(result);
    });

    // Get Specific Donation Requests data
    app.get("/dashboard-donation-requests/:id", async (req, res) => {
      const id = req.params.id;
      const result = await donationRequests.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Delete donation request by ID
    app.delete("/donation-requests/:id", async (req, res) => {
      const { id } = req.params;
      const result = await donationRequests.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // Get pending Donation Requests  Data
    app.get("/donation-requests-pending", async (req, res) => {
      const result = await donationRequests
        .find({ donationStatus: "pending" })
        .toArray();
      res.send(result);
    });
    // Get donation request based on id
    app.get("/donation-requests-pending/:id", async (req, res) => {
      const { id } = req.params;
      const result = await donationRequests.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Update donation request status (done, canceled, etc.)

    app.put("/donation-requests/:id", async (req, res) => {
      const { id } = req.params;
      const { donationStatus, donorName, donorEmail } = req.body;
      const result = await donationRequests.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            donationStatus,
            donorName,
            donorEmail,
          },
        }
      );
      res.send(result);
    });
    //  // Update donation request status
    //  app.put("/donation-requests/:id", async (req, res) => {
    //   const { id } = req.params;
    //   const { donationStatus, donorName, donorEmail } = req.body;
    //   const result = await donationRequests.updateOne(
    //     { _id: new ObjectId(id) },
    //     {
    //       $set: {
    //         donationStatus,
    //         donorName,
    //         donorEmail,
    //       },
    //     }
    //   );
    //   res.send(result);
    // });


    // Save blogs data into mongoDB
    app.post("/blogs", async (req, res) => {
      const blogData = req.body;
      const result = await allBlogs.insertOne(blogData);
      res.send(result);
    });
    // Get Blogs data
    app.get("/blogs", async (req, res) => {
      const result = await allBlogs.find().toArray();
      res.send(result);
    });
    // Delete Blogs data
    app.delete("/blogs/:id", async (req, res) => {
      const { id } = req.params;
      const result = await allBlogs.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Update Blog Status (Publish/Unpublish)
    app.put("/blogs/:id", async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
      const result = await allBlogs.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: status } }
      );
      res.send(result);
    });

    // Get Blog details by id
    app.get("/blogs/:id", async (req, res) => {
      const { id } = req.params;
      const result = await allBlogs.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

   
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(error);
  }
}
run();

app.get("/", (req, res) => {
  res.send("Welcome to Blood-Bank-API");
});

app.listen(port, () => {
  `Server is running on port ${port}`;
});
