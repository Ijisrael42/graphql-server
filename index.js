import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

//DB
import db from './_db.js';

//Types
import { typeDefs } from './schema.js';

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, { id }) { //args as {id} 
            return db.games.find((g) => g.id === id);
        },
        reviews() {
            return db.reviews
        },
        review(_, { id }){
            return db.reviews.find((r) => r.id === id);
        },
        authors() {
            return db.authors
        },
        author(_, { id }) {
            return db.authors.find((a) => a.id === id);
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent){
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    Review: {
        game(parent) {
            return db.games.find((g) => g.id === parent.game_id)
        },
        author(parent) {
            return db.authors.find((a) => a.id === parent.author_id)
        }
    },
    Mutation: {
        deleteGame(_, args) {
            db.games = db.games.filter((g) => g.id !== args.id)

            return db.games;
        },
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 1000)
            }
            db.games.push(game);

            return game;
        },
        updateGame(_, args) {
            let game = [];
            db.games.map((g) => {
                if (g.id === args.id) {
                    game = {...g, ...args.edits};
                    return game
                }
                return g
            })

            return game; //db.games.find((g) => g.id === args.id);
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log('Server ready at port', 4000);