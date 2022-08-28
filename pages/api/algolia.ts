import algoliasearch from 'algoliasearch';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isEmpty } from 'lodash';
import { slugify } from '../../utils';
import { sanityClient } from '../../lib/sanity.server';

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? 'undefined',
  process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY ?? 'undefined',
);
interface GuideWikiItem {
  _id: string;
  _type: 'guide';
  name: string;
  guideCategory: { title: string };
  slug: { current: string };
}

interface DestinationWikiItem {
  _id: string;
  _type: 'location';
  name: string;
  slug: { current: string };
  region: string;
}

function mapDataToAlgoliaObject(items: GuideWikiItem[] | DestinationWikiItem[]) {
  return items.map(item => ({
    objectID: item._id,
    title: item.name,
    type: item._type,
    url:
      item._type === 'guide'
        ? `/wiki/guides/${slugify(item?.guideCategory?.title)}/${item.slug.current}`
        : `/wiki/locations/${slugify(item.region)}/slug.current`,
  }));
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const index = client.initIndex('Wiki');

  const { payload } = req.body;
  const { created, updated, deleted } = payload?.ids;

  if (!isEmpty(deleted)) {
    const deletedItems = await sanityClient.fetch('*[_id in $ids]{ _id, _type }', { ids: deleted });
    const transformed = deletedItems.map((i: GuideWikiItem | DestinationWikiItem) => i._id);
    await index.deleteObjects(transformed);
    return res.status(202).end();
  }

  if (!isEmpty(created) || !isEmpty(updated)) {
    const createdItems = await sanityClient.fetch(
      '*[_id in $ids]{ _id, _type, name, slug, region, guideCategory->{ title } }',
      {
        ids: [...created, ...updated],
      },
    );
    const transformed = mapDataToAlgoliaObject(createdItems);

    await index.partialUpdateObjects(transformed, { createIfNotExists: true });
    return res.status(200).send({ success: true });
  }

  res.send({
    message: `Error updating, deleting or creating index item`,
  });
};
