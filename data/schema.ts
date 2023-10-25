import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import {
  addStatisticsPlayedGame,
  getAllStatistic,
  getStatisticById,
} from './database';

import { isUndef } from '../utils/misc';

const StatisticItem = new GraphQLObjectType({
  name: 'StatisticItem',
  fields: {
    id: { type: GraphQLInt },
    score: { type: GraphQLInt },
    playerName1: { type: GraphQLString },
    playerName2: { type: GraphQLString },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createStatistic: {
      type: StatisticItem,
      args: {
        score: { type: GraphQLInt },
      },
      resolve(root, { score }: { score: number }) {
        return addStatisticsPlayedGame('p1', 'p2', 0, score);
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    statistics: {
      args: {
        id: { type: GraphQLString },
      },
      type: new GraphQLList(StatisticItem),
      resolve(root, { id }: { id: string }) {
        return isUndef(id)
          ? getAllStatistic()
          : getStatisticById(id);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});