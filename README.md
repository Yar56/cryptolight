# [Cryptolight](http://crypto-light.space) &middot; [![Build Status](https://github.com/Yar56/cryptolight/actions/workflows/vite.yml/badge.svg)](https://github.com/Yar56/cryptolight/actions)
[![Feature-Sliced Design][shields-fsd-white]](https://feature-sliced.design/)

[shields-fsd-white]: https://img.shields.io/badge/Feature--Sliced-Design?style=for-the-badge&labelColor=262224&color=F2F2F2&logoWidth=10&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA/SURBVHgB7dKxCgAgCIThs/d/51JoNQIdDrxvqMXlR4FmFs92KDIX/wI7JSdDN+eHtkxIycnQvMNW8hN/crsDc5QgGX9NvT0AAAAASUVORK5CYII=

Сryptolight is a project built on the new FSD architectural methodology. A fundamentally new approach to frontend project development.
This pet project was written to try FSD in action. The project has conventions and incompleteness.

## Getting Started
- Prerequisites:
    - node and npm on your machine
    - docker if necessary
- Installation:
    - npm install
    - or use docker
      - `docker build -t cryptolight .`
- Run
  - add .env file with the following contents
    `VITE_COIN_API_HOST=https://api.coingecko.com/api/v3/`
    `VITE_CRYPTO_LIGHT_API_HOST=http://crypto-light.space`
  - npm run dev
  - or use docker
    - `docker run -it -v ${PWD}:/app -v /app/node_modules -e CHOKIDAR_USEPOLLING=true --env-file .env -p 3000:3000 cryptolight`

## Architecture

Project based on [Feature-Sliced Design](https://feature-sliced.design/)

## Roadmap

- [ ] think about the functionality of modal windows (React Portal?)
- [ ] Multi-language Support (by FSD)
    - [ ] English
- [ ] Add a night theme (by FSD)
- [ ] Update PriceChart, add a time filter (Coin Page)
- [ ] add SystemLayout (/ping implementation), [api](https://www.coingecko.com/api/documentation)
- [ ] add husky pre-commit, lint-staged

See the [open issues](https://github.com/Yar56/cryptolight/issues) for a full list of proposed features (and known issues).

## Contributing
If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Create an issue in the project and describe it (label is welcome)
2. Create a branch locally in the format `[#issueNumber] issueName`
   - example: [#23] Modal window enhancement
3. Bind issue to pr (this is in issue in the right Development section)
4. Push to the Branch and open Pull Request

## Try it
[Cryptolight website](http://crypto-light.space)
