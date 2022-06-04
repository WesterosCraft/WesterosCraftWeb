export interface LocationPageResponse {
  createdAt: Date;
  id: string;
  rev: string;
  type: string;
  updatedAt: Date;
  regions: Region[];
  slug: Slug;
  title: string;
  copy: string;
}

export interface Region {
  heading: string;
  image: ExtendedImage;
  name: string;
  notableBuild: NotableBuild;
  ordinal: number;
  percentComplete: number;
  recentlyUpdated: RecentlyUpdated;
  slug: Slug;
  subheading: string;
}

export interface ExtendedImage {
  metadata: Metadata;
  url: string;
}

export interface Metadata {
  lqip: string;
}

export interface NotableBuild {
  slug: Slug;
  title: string;
}

export interface RecentlyUpdated {
  updatedAt: Date;
  slug: Slug;
  title: string;
}

export interface RegionPageResponse {
  locations: Location[];
  name: string;
}

export interface Location {
  createdAt: Date;
  id: string;
  rev: string;
  type: string;
  updatedAt: Date;
  additionalImages: AdditionalImages;
  application: string;
  bannerImage: BannerImage;
  body?: Body[];
  buildCategory: BuildCategory[];
  dateCompleted?: Date;
  dateStarted?: Date;
  difficulty: string;
  house: string;
  projectLead: string;
  projectStatus: string;
  region: Region;
  slug: Slug;
  title: string;
  warp?: string;
}

export interface AdditionalImages {
  images: ImageElement[];
}

export interface ImageElement {
  key: string;
  type: string;
  asset: Region;
}

export interface Region {
  ref: string;
  type: RegionType;
}

export enum RegionType {
  Reference = "reference",
}

export interface BannerImage {}

export interface Body {
  key: string;
  type: BodyType;
  children?: Child[];
  markDefs?: MarkDef[];
  style?: Style;
  level?: number;
  listItem?: string;
  image?: BodyImage;
}

export interface Child {
  key: string;
  type: ChildType;
  marks: string[];
  text: string;
}

export enum ChildType {
  Span = "span",
}

export interface BodyImage {
  type: string;
  asset: Region;
}

export interface MarkDef {
  key: string;
  type: string;
  href: string;
}

export enum Style {
  H3 = "h3",
  Normal = "normal",
}

export enum BodyType {
  Block = "block",
  Figure = "figure",
}

export interface BuildCategory {
  key: string;
  ref: string;
  type: RegionType;
  title: string;
}

export interface Slug {
  type: string;
  current: string;
}
