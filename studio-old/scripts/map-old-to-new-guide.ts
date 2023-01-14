// import fs from "fs";
// import ndjson from "ndjson";
// import path from "path";

// const file = path.resolve(__dirname, "./data/current-prod-data-guide.ndjson");

// const writer = fs.createWriteStream("new_generated_guides.ndjson");

// const bodyMap = (body) => {
//   const imageReplace = new RegExp("file://./images", "g");
//   const fileReplace = new RegExp("file://./files", "g");
//   const youtubeUrlreplace = new RegExp("//www.youtube.com/embed", "g");
//   const videoFileReplace = new RegExp("videoFile", "g");

//   // const richTextReplace = new RegExp("richText", "g");
//   return (
//     body &&
//     JSON.parse(
//       JSON.stringify(body)
//         ?.replace(
//           imageReplace,
//           "https://cdn.sanity.io/images/n9rqt6s5/production"
//         )
//         .replace(
//           fileReplace,
//           "https://cdn.sanity.io/images/n9rqt6s5/production"
//         )
//         .replace(videoFileReplace, "file")
//         // .replace(richTextReplace, "blockContent")
//         .replace(youtubeUrlreplace, "https://www.youtube.com/embed")
//     )
//   );
// };

// const pageBuilderMap = (pageBuilder) => {
//   const imageReplace = new RegExp("file://./images", "g");
//   const fileReplace = new RegExp("file://./files", "g");

//   const newPB =
//     pageBuilder &&
//     JSON.parse(
//       JSON.stringify(pageBuilder)
//         ?.replace(
//           imageReplace,
//           "https://cdn.sanity.io/images/n9rqt6s5/production"
//         )
//         .replace(
//           fileReplace,
//           "https://cdn.sanity.io/images/n9rqt6s5/production"
//         )
//     );

//   return (
//     newPB &&
//     newPB.map((p) => {
//       if (p._type === "imageGallery") {
//         return {
//           _key: p?._key,
//           _type: "imageGallery",
//           title: p?.heading,
//           metadata: p.copyScript,
//           images: p.images.map((i) => ({
//             ...i,
//             alt: i?.alt ? i.alt : "",
//             title: i?.heading,
//           })),
//         };
//       }
//       if (p._type === "accordion") {
//         return {
//           _key: p?._key,
//           title: p?.heading,
//           _type: "accordion",
//           accordionContent: bodyMap(p?.accordionContent),
//         };
//       }
//       if (p._type === "richText") {
//         return undefined;
//       }
//     })
//   );
// };

// const mapOldFormatToNewFormat = (obj) => ({
//   _id: obj?._id,
//   _createdAt: obj?._createdAt,
//   _type: "guide",
//   description: obj?.description,
//   title: obj?.name,
//   slug: obj?.slug,
//   icon: {
//     ...obj?.icon,
//     _sanityAsset: obj?.icon?._sanityAsset.replace(
//       "file://./images",
//       "https://cdn.sanity.io/images/n9rqt6s5/production"
//     ),
//   },
//   body: bodyMap(obj?.pageBuilder.find((o) => o._type === "richText")?.copy),
//   pageBuilder: pageBuilderMap(obj?.pageBuilder),
// });

// (async function startRead() {
//   const stream = fs
//     .createReadStream(file)
//     .pipe(ndjson.parse())
//     .on("data", async (obj) => {
//       try {
//         if (obj._type === "guide") {
//           const objToSave = JSON.stringify(mapOldFormatToNewFormat(obj)) + "\n";
//           writer.write(objToSave);
//         }
//       } finally {
//         stream.resume();
//       }
//     })
//     .on("error", (err) => {
//       console.log("ERROR: ", err);
//     })
//     .on("end", () => {
//       console.log("File successfully converted");
//     });
// })();

export {};
