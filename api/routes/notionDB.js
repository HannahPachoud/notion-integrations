var express = require("express");
require("dotenv").config();
var router = express.Router();
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: process.env.NOTION_KEY })

router.get("/", async function (request, res) {
    const startDate = request.query.startDate;
    const endDate = request.query.endDate;
    const dbValues = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
         filter: {
      and: [
        {
          property: "Date",
          date: {
            on_or_after: startDate,
          },
        },
        {
          property: "Date",
          date: {
            on_or_before: endDate,
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


router.get("/categories", async function (request, res) {
  const dbValues = await notion.databases.query({
      database_id: process.env.NOTION_CATEGORIES_DATABASE_ID,
    });

    const categories = [];
    dbValues.results.map(row => {
        categories.push({
            id: row.id,
            name: row.properties.Name.title[0].text.content,
        })
    })
    res.send(categories);

});

module.exports = router;