var express = require("express");
require("dotenv").config();
var router = express.Router();
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: process.env.NOTION_KEY })

router.get("/", async function (request, res) {
    const dbValues = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
         filter: {
      and: [
        {
          property: "Date",
          date: {
            on_or_after: "2023-10-17",
          },
        },
        {
          property: "Date",
          date: {
            on_or_before: "2023-10-17",
          },
        },
      ],
    },
      });

    const expenses = [];
    dbValues.results.map(row => {
        expenses.push({
            id: row.id,
            title: row.properties.Name.title[0].text.content,
            date: row.properties.Date.date.start,
            amount: row.properties.Amount.number,
            category: row.properties.Category.relation[0].id
        })
    })
    res.send(expenses);
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
  