# wire_challenge
Repository for this Challenge: https://github.com/wirecardBrasil/challenge/tree/master/backend

## Prerequisite

- NPM

```Bash
npm install npm@latest -g
```

## Installation Steps

1. Clone the repository

```Bash
git clone https://github.com/mpfdev/cli-emoji.git
```

2.  Install NPM packages

```Bash
npm install
```

## Endpoint

```Bash
POST http://localhost:3000/api/payment/create
```

```bash
POST http://localhost:3000/api/payment/create HTTP/1.1
Content-Type: application/json

{
    "amount": 1999,
    "payment_method": "boleto",
    "buyerCpf": "00001111111111112",
    "buyerName": "marie",
    "buyerEmail": "Jãasdo@jao1a.com"
}
```

## Future Updates

- [ ] Update Documentation
- [ ] Unit Testing
- [ ] Front-End