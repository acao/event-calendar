// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

exports.createSchemaCustomization = async ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type googleSheetEventsRow implements Node @dontInfer {
      id: ID!
      parent: Node
      children: [Node!]!
      internal: Internal!
      timestamp: String
      whatisthename: String
      when: String
      time: String
      linktotheevent: String
      where: String
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const queryResults = await graphql(`
    query AllRows {
      rows: allGoogleSheetEventsRow {
        nodes {
          id
          eventName: whatisthename
          date: when
          eventtime: time
          eventLink: linktotheevent
          place: where
        }
      }
    }
  `);

  const eventTemplate = path.resolve(`src/templates/event.tsx`);

  queryResults.data.rows.nodes.forEach((node) => {
    createPage({
      path: `/event/${node.id}`,
      component: eventTemplate,
      context: {
        event: node,
      },
    });
  });
};
