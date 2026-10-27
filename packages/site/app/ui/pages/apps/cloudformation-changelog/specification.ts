export type UpdateType = 'Mutable' | 'Immutable' | 'Conditional';
export type PrimitiveItemType = 'String' | 'Long' | 'Integer' | 'Double' | 'Boolean' | 'Timestamp';
export type PrimitiveType = PrimitiveItemType | 'Json';

export interface Property {
  Documentation?: string;
  Required?: boolean;
  UpdateType?: UpdateType;
  PrimitiveType?: PrimitiveType;
  Type?: string;
  ItemType?: string;
  PrimitiveItemType?: PrimitiveItemType;
  DuplicatesAllowed?: boolean;
}

export interface Definition extends Property {
  Properties?: Record<string, Property>;
  Attributes?: Record<string, Property>;
}

export interface Specification {
  ResourceSpecificationVersion: string;
  ResourceTypes: Record<string, Definition>;
  PropertyTypes: Record<string, Definition>;
}

export interface Neighbor {
  version: string;
  date?: string;
}

export const regions = [
  'af-south-1',
  'ap-east-1',
  'ap-northeast-1',
  'ap-northeast-2',
  'ap-northeast-3',
  'ap-south-1',
  'ap-south-2',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-southeast-3',
  'ap-southeast-4',
  'ca-central-1',
  'ca-west-1',
  'eu-central-1',
  'eu-central-2',
  'eu-north-1',
  'eu-south-1',
  'eu-south-2',
  'eu-west-1',
  'eu-west-2',
  'eu-west-3',
  'il-central-1',
  'me-central-1',
  'me-south-1',
  'sa-east-1',
  'us-east-1',
  'us-east-2',
  'us-gov-east-1',
  'us-gov-west-1',
  'us-west-1',
  'us-west-2',
];

function bucketUrl(region: string) {
  const bucket = `cfn-resource-specifications-${region}-prod`;
  return region.startsWith('us-gov-')
    ? `https://s3.${region}.amazonaws.com/${bucket}`
    : `https://${bucket}.s3.${region}.amazonaws.com`;
}

const fileUrl = (region: string, version: string, folder = '') =>
  `${bucketUrl(region)}/${version}/${folder}CloudFormationResourceSpecification.json`;

export async function listCfnVersions(region: string) {
  const versions: string[] = [];
  let token: string | undefined;
  do {
    const query = new URLSearchParams({ 'list-type': '2', delimiter: '/' });
    if (token) query.set('continuation-token', token);
    const response = await fetch(`${bucketUrl(region)}/?${query}`);
    if (!response.ok) throw new Error(`Listing ${region} failed: ${response.status}`);
    const xml = await response.text();
    for (const [, prefix] of xml.matchAll(/<Prefix>(\d+\.\d+\.\d+)\/<\/Prefix>/g)) versions.push(prefix);
    token = xml.match(/<NextContinuationToken>([^<]+)<\/NextContinuationToken>/)?.[1];
  } while (token);
  return versions.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

async function neighbor(region: string, version: string | undefined): Promise<Neighbor | undefined> {
  if (!version) return undefined;
  const response = await fetch(fileUrl(region, version), { method: 'HEAD' }).catch(() => undefined);
  const modified = response?.ok && response.headers.get('last-modified');
  return { version, date: modified ? new Date(modified).toISOString().slice(0, 10) : undefined };
}

export async function neighbors(region: string, version: string, list: string[]) {
  const index = list.indexOf(version);
  const [previous, current, next] = await Promise.all([
    neighbor(region, list[index - 1]),
    neighbor(region, version),
    neighbor(region, list[index + 1]),
  ]);
  return { previous, current: current as Neighbor, next };
}

export async function specification(region: string, version: string) {
  let response = await fetch(fileUrl(region, version, 'gzip/'));
  if (!response.ok) response = await fetch(fileUrl(region, version));
  if (!response.ok) throw new Error(`Download ${region}/${version} failed: ${response.status}`);
  return (await response.json()) as Specification;
}
