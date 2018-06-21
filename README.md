 # Worducate

[Summary](#summary) | [Prerequisites](#pre-reqs) | [Quickstart](#quickstart) | [Tests](#tests) | [Specification](#spec) | [User Stories](#stories)

## Summary
<a id="summary"></a>
A web application that aims to help enrich the vocabulary of those learning English by:
- Presenting users with a new word each day along with its definition, usage and audio
- Functioning as a vocabulary tracking tool, allowing users to add new words they have learnt from other sources to build up a bank of vocabulary

<a id="pre-reqs"></a>

## Prerequisites

- Ensure you have [Node](https://nodejs.org/en/download/) and [MongoDB](https://docs.mongodb.com/manual/installation/) installed

- Create an account with [WordNik](https://developer.wordnik.com/) to retrieve an API key

<a id="quickstart"></a>

## Quickstart

- Clone the repository by running the following command in your terminal:

```
$ git clone https://github.com/serenahathi/worducate.git
```

- Create a ```.env``` file in the root of the project directory and add your API key to the file as follows:


```
API_KEY="yourKey"
```

- Navigate to the root of the project directory and install dependencies by running:

```
$ npm install
```

- Run mongod in the terminal
```
$ mongod
```

- In a new terminal window, start the server by running ```npm start``` and navigate to http://localhost:3000/


## Tests
<a id="tests"></a>

Run the following command in the root of the project directory:

```
$ npm test
```

## Specification
<a id="spec"></a>

## User Stories
<a id="stories"></a>

MVP
```
As a user,
So that I can enrich my vocabulary,
I would like to be presented with a new word every day
```

```
As a user,
So that I can understand the meaning of new words,
I would like to be see a definition of the word alongside a sentence that correctly uses the word
```

```
As a user,
So that I can share interesting new English words,
I would like to be able to send the new word to my friends via Twitter
```

V1

```
As a user,
So that I can retrieve all of the words I have learnt,
I would like to view all the words that I have been shown so far
```

```
As a user,
So that I can keep track of other vocabulary I have learnt,
I would like to add a new word to my vocabulary bank
```

```
As a user,
So that I can correctly add a new word to the vocabulary bank,
I would like to be able to edit my entry in case I make a mistake
```

V2

```
As a user,
So that I can review my words on any device and keep my words secure,
I would like to be able to sign up for an account
```

```
As a user,
So that I can retrieve the words that I particularly like,
I would like to be able to mark a word as a favourite and view all my favourite words
```

```
As a user,
So that I can review the different types of words I have learnt,
I would like to be able to filter by category
```