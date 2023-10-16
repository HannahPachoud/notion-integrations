var express = require("express");
require("dotenv").config();
var router = express.Router();
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: process.env.NOTION_KEY })

router.get("/", async function (request, res) {
    const dbValues = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
      });

    res.send([JSON.stringify(dbValues)]);
});

module.exports = router;

// // Create new databasn  e. The page ID is set in the environment variables.
// app.post("/databases", async function (request, response) {
//     const pageId = process.env.NOTION_PAGE_ID
//     const title = request.body.dbName
  
//     try {
//       const newDb = await notion.databases.create({
//         parent: {
//           type: "page_id",
//           page_id: pageId,
//         },
//         title: [
//           {
//             type: "text",
//             text: {
//               content: title,
//             },
//           },
//         ],
//         properties: {
//           Name: {
//             title: {},
//           },
//         },
//       })
//       response.json({ message: "success!", data: newDb })
//       console.log(newDb);
//     } catch (error) {
//       response.json({ message: "error", error })
//     }
//   })
  