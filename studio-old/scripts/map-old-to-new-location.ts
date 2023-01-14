// import fs from "fs";
// import ndjson from "ndjson";
// import path from "path";

// const file = path.resolve(__dirname, "./data/current-prod-data.ndjson");

// const writer = fs.createWriteStream("new_generated_locations.ndjson");

// const buildCategoryMap = (buildType) => {
//   switch (buildType) {
//     case "city":
//       return {
//         _type: "reference",
//         _ref: "3c75eaa9-3405-48d6-9aa1-82a7e49ff08a",
//         _weak: false,
//       };
//     case "castle":
//       return {
//         _type: "reference",
//         _ref: "aa78e9be-b3ce-4112-9ab3-7a052ac5b020",
//         _weak: false,
//       };
//     case "town":
//       return {
//         _type: "reference",
//         _ref: "f47f7fe4-7684-46cc-86aa-9b7275f4e0de",
//         _weak: false,
//       };
//     case "village":
//       return {
//         _type: "reference",
//         _ref: "2a760f6a-022e-4f0c-9cff-9a9d9e613f6c",
//         _weak: false,
//       };
//     case "holdfast":
//       return {
//         _type: "reference",
//         _ref: "0532d707-dcfa-455c-847a-c3c6121ab875",
//         _weak: false,
//       };
//     case "keep":
//       return {
//         _type: "reference",
//         _ref: "d2532a38-7ecc-43d9-9769-ddd442d0d831",
//         _weak: false,
//       };
//     case "tower":
//       return {
//         _type: "reference",
//         _ref: "932860c4-afd3-4ddf-8f7e-24706a24c8f1",
//         _weak: false,
//       };
//     case "clan":
//       return {
//         _type: "reference",
//         _ref: "f7e66aa6-0612-4c05-a4cf-9a29b113b855",
//         _weak: false,
//       };
//     case "crannog":
//       return {
//         _type: "reference",
//         _ref: "b27697c2-ffc7-4339-aa55-b9d248c4d015",
//         _weak: false,
//       };
//     case "landmark":
//       return {
//         _type: "reference",
//         _ref: "925faa14-5220-4bda-9d69-024f6366019d",
//         _weak: false,
//       };
//     case "ruin":
//       return {
//         _type: "reference",
//         _ref: "eea65049-09b1-4a2d-b340-cfa23c676618",
//         _weak: false,
//       };
//     case "miscellaneous":
//       return {
//         _type: "reference",
//         _ref: "666e74f4-1fd4-4c1d-a829-53ba176ba8cb",
//         _weak: false,
//       };
//     case "miscellaneous":
//       return {
//         _type: "reference",
//         _ref: "666e74f4-1fd4-4c1d-a829-53ba176ba8cb",
//         _weak: false,
//       };

//     default:
//       return buildType;
//   }
// };

// const difficultyMap = (difficulty) => {
//   switch (difficulty) {
//     case "one":
//       return "1";
//     case "two":
//       return "2";
//     case "three":
//       return "3";
//     case "four":
//       return "4";
//     case "five":
//       return "5";
//     case "six":
//       return "6";
//     default:
//       return "1";
//   }
// };

// const regionMap = (region) => {
//   switch (region) {
//     case "dorne":
//       return {
//         _ref: "333b1884-bdae-43e2-8a96-b2c89ea89c79",
//         _type: "reference",
//         _weak: false,
//       };
//     case "riverlands":
//       return {
//         _ref: "bef10f36-8ac8-4780-894e-bbc1978884d3",
//         _type: "reference",
//         _weak: false,
//       };
//     case "theWall":
//       return {
//         _ref: "94dceb06-f437-481e-b8f7-eac882e6d9c3",
//         _type: "reference",
//         _weak: false,
//       };
//     case "north":
//       return {
//         _ref: "a5b3b817-c80d-4621-967c-f13b619ae235",
//         _type: "reference",
//         _weak: false,
//       };
//     case "vale":
//       return {
//         _ref: "a6b0523a-c2a7-48cd-9132-86a92cd8ba9f",
//         _type: "reference",
//         _weak: false,
//       };
//     case "ironIslands":
//       return {
//         _ref: "4a1046e1-af4c-4e58-8beb-1db82b0562c7",
//         _type: "reference",
//         _weak: false,
//       };
//     case "westerlands":
//       return {
//         _ref: "fa9b1818-54dc-4799-a10b-9e25b8f0c547",
//         _type: "reference",
//         _weak: false,
//       };
//     case "crownlands":
//       return {
//         _ref: "cf2197be-be99-4d62-95f6-ff452b07f0ec",
//         _type: "reference",
//         _weak: false,
//       };
//     case "stormlands":
//       return {
//         _ref: "fb625d70-c2f1-4625-91b5-68b9f89064a4",
//         _type: "reference",
//         _weak: false,
//       };
//     case "reach":
//       return {
//         _ref: "12692247-e688-4d81-838a-083b12548ece",
//         _type: "reference",
//         _weak: false,
//       };
//     case "beyondTheWall":
//       return {
//         _ref: "d077ff2b-0ba9-48f0-b018-72dccda16187",
//         _type: "reference",
//         _weak: false,
//       };
//   }
// };

// const deepReplace = (
//   obj: object,
//   keyName: string,
//   replacer: (from: any) => string
// ) => {
//   for (const key in obj) {
//     if (key === keyName) {
//       obj[key] = replacer(obj[key]);
//     } else if (Array.isArray(obj[key])) {
//       (obj[key] as any[]).forEach((member) =>
//         deepReplace(member, keyName, replacer)
//       );
//     } else if (typeof obj[key] === "object") {
//       deepReplace(obj[key], keyName, replacer);
//     }
//   }
// };

// const bodyMap = (body) => {
//   const imageReplace = new RegExp("file://./images", "g");
//   const youtubeUrlreplace = new RegExp("//www.youtube.com/embed", "g");
//   return (
//     body &&
//     JSON.parse(
//       JSON.stringify(body)
//         ?.replace(
//           imageReplace,
//           "https://cdn.sanity.io/images/n9rqt6s5/production"
//         )
//         .replace(youtubeUrlreplace, "https://www.youtube.com/embed")
//     )
//   );
// };

// const mapOldFormatToNewFormat = (obj) => ({
//   _id: obj?._id,
//   _createdAt: obj?._createdAt,
//   _type: "location",
//   buildCategory: [buildCategoryMap(obj?.buildType)],
//   dateCompleted:
//     obj?.dateCompleted && !obj.dateCompleted.includes("T")
//       ? obj?.dateCompleted + "T01:38:00.000Z"
//       : obj?.dateCompleted
//       ? obj.dateStarted
//       : undefined,
//   dateStarted:
//     obj?.dateStarted && !obj.dateStarted.includes("T")
//       ? obj?.dateStarted + "T01:38:00.000Z"
//       : obj?.dateStarted
//       ? obj.dateStarted
//       : undefined,
//   difficulty: difficultyMap(obj?.difficultyLevel),
//   dynmapXcoord: obj?.dynmapInformation?.xCoord,
//   dynmapYcoord: obj?.dynmapInformation?.yCoord,
//   dynmapZoom: obj?.dynmapInformation?.zoom,
//   warp: obj?.warp,
//   additionalImages: {
//     images: obj?.images?.map((o) => ({
//       ...o,
//       _sanityAsset: o._sanityAsset.replace(
//         "file://./images",
//         "https://cdn.sanity.io/images/n9rqt6s5/production"
//       ),
//     })),
//   },
//   application: obj?.application,
//   bannerImage: {
//     ...obj?.banner,
//     _sanityAsset: obj?.banner?._sanityAsset.replace(
//       "file://./images",
//       "https://cdn.sanity.io/images/n9rqt6s5/production"
//     ),
//   },
//   house: obj?.house,
//   projectLead: obj?.projectLead,
//   projectStatus: obj?.projectStatus,
//   redoAvailable: obj?.redoAvailable,
//   region: regionMap(obj?.region),
//   serverProject: obj?.serverBuild,
//   slug: obj?.slug,
//   title: obj?.name,
//   body: bodyMap(obj.entry),
// });

// (async function startRead() {
//   const stream = fs
//     .createReadStream(file)
//     .pipe(ndjson.parse())
//     .on("data", async (obj) => {
//       try {
//         if (obj._type === "destination") {
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
