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

## Installation

To install, follow these steps:

2. npm i (node >= 18)
3. npm run start

## Test

To run test:

1. npm run test

## Infrastructure
![](./doc/mahjong.drawio.png)