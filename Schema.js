const graphql = require('graphql');

const Details = require('./Details/myDetail')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLID,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    
} = graphql;




const personType = new GraphQLObjectType({
    name: 'Details',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        country: {
            type: GraphQLString
        },
        age: {
            type: GraphQLString

        }
       
    })
});





const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        person: {
            type: personType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Details.findById(args.id);
            }
        },
       
        persons: {
            type: new GraphQLList(personType),
            resolve(parent, args) {
                return Details.find({});
            }
        },
      
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {


        addPerson: {
            type: personType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                country: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let person = new Details({
                    name: args.name,
                    country: args.country,
                    age: args.age,
                });
                return person.save();
            }
        },




        updatePerson: {
            type: personType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                country: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (root, args) => {
                if (!args.id) return;
                  return person.findByIdAndUpdate(
                   {
                     _id: args.id
                   },
                   {
                     $set: {
                       name: args.name,
                       country: args.country,
                       age: args.age,
                     }
                   }, {new: true}, (err, person) => {
                     if (err) {
                       console.log('Something went wrong when updating the person');
                     } else {
                     }
                   }
                );
              }
        },

    }

})












module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});