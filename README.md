# Running TypeScript Files with `ts-node`

[![Test Coverage 🧙🏽‍♂️](https://github.com/iammorganparry/interview-stuff/actions/workflows/tests.yml/badge.svg)](https://github.com/iammorganparry/interview-stuff/actions/workflows/tests.yml)

This guide will show you how to use `ts-node` to run TypeScript files using yarn.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [Yarn](https://yarnpkg.com/) installed on your machine.

## Installation

1. Clone or download the repository to your local machine.
2. Open a terminal window and navigate to the project's root directory.
3. Run the following command to install the dependencies:

```sh
yarn install
```

## Usage

Open a terminal window and navigate to the project's root directory.
Run the following command to run the TypeScript file using ts-node:
```sh
yarn ts-node src/robots
```

## Complete!

You should see an output like below

```
 ______    ______    _______   ______   _________   ______    ________  ___ __ __   __  __   __       ________   _________  ______   ______
/_____/\  /_____/\ /_______/\ /_____/\ /________/\ /_____/\  /_______/\/__//_//_/\ /_/\/_/\ /_/\     /_______/\ /________/\/_____/\ /_____/\
\:::_ \ \ \:::_ \ \\::: _  \ \\:::_ \ \\__.::.__\/ \::::_\/_ \__.::._\/\::\| \| \ \\:\ \:\ \\:\ \    \::: _  \ \\__.::.__\/\:::_ \ \\:::_ \ \
 \:(_) ) )_\:\ \ \ \\::(_)  \/_\:\ \ \ \  \::\ \    \:\/___/\   \::\ \  \:.      \ \\:\ \:\ \\:\ \    \::(_)  \ \  \::\ \   \:\ \ \ \\:(_) ) )_
  \: __ `\ \\:\ \ \ \\::  _  \ \\:\ \ \ \  \::\ \    \_::._\:\  _\::\ \__\:.\-/\  \ \\:\ \:\ \\:\ \____\:: __  \ \  \::\ \   \:\ \ \ \\: __ `\ \
   \ \ `\ \ \\:\_\ \ \\::(_)  \ \\:\_\ \ \  \::\ \     /____\:\/__\::\__/\\. \  \  \ \\:\_\:\ \\:\/___/\\:.\ \  \ \  \::\ \   \:\_\ \ \\ \ `\ \ \
    \_\/ \_\/ \_____\/ \_______\/ \_____\/   \__\/     \_____\/\________\/ \__\/ \__\/ \_____\/ \_____\/ \__\/\__\/   \__\/    \_____\/ \_\/ \_\/

At any time to exit the program use CTRL + C / CMD + C
What size grid would you like? (ex: 5 x 5)
```
