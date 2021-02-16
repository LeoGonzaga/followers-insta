const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const port = 3000;
let followers;
async function getFollowrs() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.instagram.com/matheusyuji.s/?hl=pt-br");

  await page.waitForSelector(".g47SY");
  console.log("entrou aqui");
  const list = await page.evaluate(() => {
    let followersArray = [];

    const nodeList = document.querySelectorAll(".g47SY");
    const arrayInfo = [...nodeList];
    console.log(arrayInfo);
    const list = arrayInfo.map((i) => {
      console.log(i.innerText);
      followersArray.push(i.innerHTML);
    });
    console.log(followersArray);

    return followersArray;
  });
  followers = list[1];
  console.log(list);
}

app.get("/", async (req, res) => {
  await getFollowrs();
  res.send({ Seguidores: followers });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
