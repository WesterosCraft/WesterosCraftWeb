const sanityClient = require("@sanity/client");

const client = sanityClient({
  apiVersion: "2021-08-31",
  projectId: "",
  dataset: "production",
  token: process.env.SANITY_STUDIO_API_TOKEN,
  useCdn: true,
});

// Delete all documents in a collection by type
client.delete({
  query: `*[_type == "wiki"]`,
});

export {};
