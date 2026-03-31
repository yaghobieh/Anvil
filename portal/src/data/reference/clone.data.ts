import { r } from './reference.helpers';
import type { ReferenceItem } from './reference.types';

const SHALLOW_DESC =
  'Shallow = only the top-level value is duplicated. For a plain object, Anvil uses object spread, so you get a new object whose keys point to the same nested values as before. Arrays become a new array with the same elements (nested arrays/objects are still shared). Map, Set, Date, and RegExp get new instances that still share nested references where applicable. Primitives are returned unchanged. If you change copy.nested on a shallow clone, you are mutating the same nested object as in the original—use deepClone when you need a fully independent tree.';

const DEEP_DESC =
  'Deep = recurse through objects, arrays, Map, Set, Date, RegExp, and plain objects, copying values so the result does not share nested references with the source. A WeakMap tracks already-visited objects so circular references (A → B → A) are cloned once and wired correctly instead of causing a stack overflow. Values that are not plain objects (e.g. class instances with methods) fall through and are returned as-is when not handled explicitly—typical JSON-like data is fully cloned.';

const FREEZE_DESC =
  'deepFreeze walks the object graph and applies Object.freeze at each level. A frozen object cannot have properties added, removed, or reassigned; nested objects are frozen too unless already frozen. This is runtime enforcement in development and production—TypeScript readonly types are separate and do not enforce anything at runtime.';

const SEAL_DESC =
  'deepSeal walks the graph and applies Object.seal recursively. A sealed object cannot have new properties added or old ones deleted, but existing writable data properties can still be updated. Contrast with deepFreeze, which also blocks value changes. Use seal when you want a stable “shape” (keys fixed) but may still mutate values.';

export const CLONE_REFERENCE: ReferenceItem[] = [
  r(
    'shallowClone',
    SHALLOW_DESC,
    `const original = { a: 1, nested: { b: 2 } };
const copy = shallowClone(original);

copy.a = 99; // only copy's top-level a — original.a is still 1
copy.nested.b = 3; // same object as original.nested — both see b === 3`,
  ),
  r(
    'deepClone',
    DEEP_DESC,
    `const original = { nested: { x: [1, { y: 2 }] } };
const copy = deepClone(original);

copy.nested.x[1] = { y: 99 };
// original is unchanged — nested values were fully copied`,
  ),
  r(
    'deepFreeze',
    FREEZE_DESC,
    `const obj = deepFreeze({ a: { b: 1 } });
// obj.a.b = 2; // in strict mode throws; silently fails in sloppy mode`,
  ),
  r(
    'deepSeal',
    SEAL_DESC,
    `const obj = deepSeal({ count: 0 });
obj.count = 1; // OK if property remains writable
// (cannot add/delete keys on sealed objects)`,
  ),
];
