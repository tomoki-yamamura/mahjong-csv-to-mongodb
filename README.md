# Convert Mahjong Score to MongoDB

This repository contains a system for converting the score which is retrived from GoogleSpreadsheet to MongDB.


## Features

- Converting the GoogleSpreadsheet data to MongoDB after inserting the data to GoogleSpreadsheet.

## Prerequisite

1. You have to set up [mahjong-score function](https://github.com/tomoki-yamamura/mahjong-score)

2. Set up the SQS to polling a queue.

3. You create a monogDB and set uri like below
```
MONGO_URI=mongodb+srv://email:password@cluster0.pozonqm.mongodb.net/mahjong?retryWrites=true&w=majority&appName=Cluster0
```

4. You create and set environment value in env.json

```json
{
  "MahjongCsvToMongoDBFunction": {
    "GOOGLE_SERVICE_ACCOUNT_EMAIL": "",
    "GOOGLE_PRIVATE_KEY": "",
    "GOOGLE_SHEET_ID": "",
    "MONGO_URI": ""
  }
}

```


## How to run

1. npm run sam:build
2. npm run sam:invoke

## Test

To run test:

1. npm run test

## Infrastructure
![](./doc/mahjong.png)