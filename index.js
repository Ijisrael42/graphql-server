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
        game(_, { id }) {
            return db.games.find((g) => g.id === id);
        },
        reviews() {
            return db.reviews
        },
        review(_, { id }) {
            return db.reviews.find((r) => r.id === id);
        },
        authors() {
            return db.authors
        },
        author(_, { id }) {
            return db.authors.find((a) => a.id === id);
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