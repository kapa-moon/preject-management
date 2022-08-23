const { projects, clients } = require('../sampleData');

// Mongoose models
const Project = require('../models/Project');
const Client = require('../models/Client');
// const graphql = require('graphql');
// destrucure?
const {
    GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt, GraphQLNonNull
} = require('graphql');;

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
});

// ProjectType
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                // later MongoDB
                return clients.findById(parent.clientId);
            }
        }
    })
});

// const RootQuery = new GraphQLObjectove({});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find();
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                // later will use mongo functions
                return Project.findById(args.id);
                // return projects.find(project => project.id === args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            },
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                // later will use mongo functions
                // return clients.find(client => client.id === args.id);
                return Client.findById(args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});