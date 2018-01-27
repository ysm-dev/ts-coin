<h1 align="center">TS-Coin</h1>

[golbin](https://github.com/golbin)님의 [G-Coin](https://github.com/golbin/g-coin)
을 보고 [Express](http://expressjs.com), [TypeScript](https://www.typescriptlang.org)
로 작성한 TS-Coin 입니다.

Simple BlockChain implementation with [Express](http://expressjs.com), [TypeScript](https://www.typescriptlang.org).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [References](#references)


## Installation

```sh
$ git clone https://github.com/ysm0622/ts-coin.git
$ node index.js
```

And go to [http://localhost:3000](http://localhost:3000)

## Usage

Using [Postman](https://www.getpostman.com/apps) which is API test tool.

![Postman](https://www.getpostman.com/img/v2/postman/gifs/import-file.gif)

## Endpoints

- `POST` /transaction
    - Add transaction.
    - Transaction format :
    ```json
    {
      "sender": "0",
      "recipient": "foo",
      "amount": 0
    }
    ```
    
- `GET` /transaction
    - Get pending transactions.

- `POST` /mine
    - Mining. Find proof and make block with rewards.
    
- `GET` /chain
    - Get full chain to validate.
    
- `POST` /node
    - Add a node.
    
- `GET` /node
    - Get all nodes.
    
- `GET` /chain/valid
    - Valid chain.
    
## References

- [https://tykimos.github.io/2018/01/21/g_coin_analysis_part1/](https://tykimos.github.io/2018/01/21/g_coin_analysis_part1/) (Korean)
- [https://github.com/golbin/g-coin](https://github.com/golbin/g-coin)
- [http://ecomunsing.com/build-your-own-blockchain](http://ecomunsing.com/build-your-own-blockchain)