const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const port = 3000;
let followers;
let followers2;

async function getFollowrs() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // await page.goto("https://www.instagram.com/leogonzaga__/?hl=pt-br");
  // await page.waitForSelector(".g47SY");

  await page.goto("https://instastatistics.com/#!/projota");
  await page.waitForSelector(".odometer-digit");

  const list = await page.evaluate(() => {
    let followersArray = [];
    let string = "";

    // const nodeList = document.querySelectorAll(".g47SY");
    const nodeList = document.querySelectorAll(".odometer-digit");
    const arrayInfo = [...nodeList];
    console.log(arrayInfo);
    arrayInfo.map((i) => {
      console.log("Texto", i.innerText);
      string += i.innerText;
      followersArray.push(i.innerHTML);
    });
    console.log("array", string);

    return string;
  });
  followers = list;
  console.log("Projota", list);
  await getFollowrs2();
}

async function getFollowrs2() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // await page.goto("https://www.instagram.com/leogonzaga__/?hl=pt-br");
  // await page.waitForSelector(".g47SY");

  await page.goto("https://instastatistics.com/#!/karolconka");
  await page.waitForSelector(".odometer-digit");

  console.log("entrou aqui");
  const list = await page.evaluate(() => {
    let followersArray = [];
    let string = "";

    // const nodeList = document.querySelectorAll(".g47SY");
    const nodeList = document.querySelectorAll(".odometer-digit");
    const arrayInfo = [...nodeList];
    console.log(arrayInfo);
    arrayInfo.map((i) => {
      console.log("Texto", i.innerText);
      string += i.innerText;
      followersArray.push(i.innerHTML);
    });
    console.log("array", string);

    return string;
  });
  followers2 = list;
  console.log("Karol", list);
}

app.get("/", async (req, res) => {
  await getFollowrs();
  res.send({ Seguidores: { Projota: followers, Karol: followers2 } });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
