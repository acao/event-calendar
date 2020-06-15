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
      eventname: String
      eventdate: String
      eventtime: String
      location: String
      description: String
      eventlink: String
      eventtype: String
      shouldpublish: Boolean
      blmendorsed: Boolean
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const queryResults = await graphql(
    `
      query AllRows($filter: googleSheetEventsRowFilterInput) {
        rows: allGoogleSheetEventsRow(filter: $filter) {
          nodes {
            id
            eventname
            eventdate
            eventtime
            eventlink
            location
            description
            eventtype
            shouldpublish
            blmendorsed
          }
        }
      }
    `,
    {
      filter: {
        eventname: {
          ne: null,
        },
        eventdate: {
          ne: null,
        },
        shouldpublish: {
          ne: false,
        },
      },
    },
  );

  const eventTemplate = path.resolve(`src/templates/event.tsx`);

  queryResults.data.rows.nodes.forEach((node) => {
    console.log(node);
    createPage({
      path: `/event/${node.id}`,
      component: eventTemplate,
      context: {
        event: node,
      },
    });
  });
};
