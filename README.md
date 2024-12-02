# Yalc Command Generator

A simple script to generate the commands necessary to cleanly yalc one or more packages into FES and run the desired services.

## Setup

```bash
yarn install
```

## Instructions

1. Add a `.env` file with the path to your frontend services directory.

   ```bash
   FES_DIRECTORY=/Users/joe.bloggs/development/WCP-Services/frontend-services
   ```

2. Install dependencies.

   ```bash
   yarn install
   ```

3. Run the script.

   ```bash
   yarn start:fes
   ```

4. Select the packages you want to install
