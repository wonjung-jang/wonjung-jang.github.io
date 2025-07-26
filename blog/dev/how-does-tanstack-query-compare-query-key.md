---
title: TanStack Query는 어떻게 queryKey를 비교할까?
description: TanStack Query의 queryKey 비교 메커니즘을 분석해 봤습니다.
slug: how-does-tanstack-query-compare-query-key
authors: wonjung
tags: [TanStackQuery]
hide_table_of_contents: false
---

```ts
// 서로 같은 쿼리
useQuery({ queryKey: ["hello", "world", 123, { a: 1, b: 2 }] });
useQuery({ queryKey: ["hello", "world", 123, { b: 2, c: undefined, a: 1 }] });
```

TanStack Query를 학습하던 도중에 의문이 들었습니다.
왜 두 쿼리가 같다고 인식될까요?

궁금증을 해결하기 위해 TanStack Query 내부 코드를 뜯어보며 어떻게 `queryKey`를 저장하고 비교하는지 살펴봤습니다.

## 1. 쿼리 저장 형태

---

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const client = new QueryClient();

  return <QueryClientProvider client={client}>...</QueryClientProvider>;
}
```

저희가 TanStack Query를 사용하기 위해서 처음으로 하는 일은 `QueryClientProvider`를 선언해주는 일입니다.

```ts
export class QueryClient {
  #queryCache: QueryCache
  #mutationCache: MutationCache
  #defaultOptions: DefaultOptions
  #queryDefaults: Map<string, QueryDefaults>
  #mutationDefaults: Map<string, MutationDefaults>
  #mountCount: number
  #unsubscribeFocus?: () => void
  #unsubscribeOnline?: () => void

  constructor(config: QueryClientConfig = {}) {
    this.#queryCache = config.queryCache || new QueryCache()
    this.#mutationCache = config.mutationCache || new MutationCache()
    this.#defaultOptions = config.defaultOptions || {}
    this.#queryDefaults = new Map()
    this.#mutationDefaults = new Map()
    this.#mountCount = 0
  }

  ...
}
```

props으로 넘기는 `QueryClient` 인스턴스는 `#queryCache`를 갖고 있는데요.

```ts
export class QueryCache extends Subscribable<QueryCacheListener> {
  #queries: QueryStore

  constructor(public config: QueryCacheConfig = {}) {
    super()
    this.#queries = new Map<string, Query>()
  }

  ...
}
```

`QueryCache` 내부에서 `#queries`로 쿼리들이 저장됩니다.
생성자 함수를 보면 `#queries`는 `Map<string, Query>` 형태로 저장되는 걸 확인할 수 있습니다.

저희가 `useQuery`를 사용해서 배열 형태로 넘긴 `queryKey`는 어떠한 과정을 거쳐 string 형태로 저장되게 됩니다.

결론부터 말씀드리면 직렬화 과정을 통해 앞서 본 두 쿼리를 같다고 인식합니다.

그렇다면 `useQuery`를 호출했을 때 내부적으로 어떤 직렬화 과정을 거쳐 `queryKey`가 비교되는지 살펴보겠습니다.

## 2. useQuery 호출

---

```ts
export function useQuery(options: UseQueryOptions, queryClient?: QueryClient) {
  return useBaseQuery(options, QueryObserver, queryClient);
}
```

`useQuery`를 호출하면 내부에서 `useBaseQuery`를 실행합니다.

```ts
// note: this must be called before useSyncExternalStore
const result = observer.getOptimisticResult(defaultedOptions);
```

`useBaseQuery` 내부에서는 위 코드가 실행되는데요.

```ts
const query = this.#client.getQueryCache().build(this.#client, options);
```

`getOptimisticResult`는 `QueryObserver` 클래스의 메서드로 실행 시에 `QueryClient`의 `QueryCache`를 가져와 `build` 메서드를 실행 시킵니다.

`build` 메서드는 기존에 저장된 쿼리가 있는지 조회하고 없다면 새로 생성하는 역할을 합니다.

사용자가 `options`로 넣어준 커스텀 해싱 함수가 없다면 `hashKey` 함수에 `queryKey`를 넘겨줍니다.

정리하면 `useQuery`를 호출하면 내부적으로 저장된 `queryKey`를 불러와서 새로운 키인지 비교하고 없다면 추가, 있으면 재사용하게 됩니다.

```ts
/**
 * Default query & mutation keys hash function.
 * Hashes the value into a stable hash.
 */
export function hashKey(queryKey: QueryKey | MutationKey): string {
  return JSON.stringify(queryKey, (_, val) =>
    isPlainObject(val)
      ? Object.keys(val)
          .sort()
          .reduce((result, key) => {
            result[key] = val[key];
            return result;
          }, {} as any)
      : val
  );
}
```

`JSON.stringify`의 두 번째 매개변수는 replacer가 들어갑니다.
조금 생소할 수도 있는데요(저는 생소했습니다).

먼저 JSON이 어떤 타입을 표현할 수 있는지 확인하고 넘어가겠습니다.

## 3. JSON

---

JSON은 다음 타입만 표현할 수 있습니다.

- number
- string
- boolean
- null
- object (단, 값은 위 타입이어야 한다)
- array

여기서 주목할 것은 undefined는 JSON 사양에 존재하지 않는 타입이라는 점입니다.
그래서 JSON.stringify는 이를 무시하거나 null로 대체하거나 제거합니다.

### 3.1. replacer

`replacer`는 문자열로 직렬화하기 전에 내부 값들을 순회하면서 재구성할 수 있도록 하는 매개변수입니다.
`replacer` 가 함수일 때 문자열화 될 key와 value, 두 개의 매개변수를 받는데요.
코드를 통해서 알아보겠습니다!

```js
// number를 넣은 경우
JSON.stringify(1, (key, value) => {
  console.log("key:", key, "value:", value); // key:  value: 1
  return value;
}); // '1'

// string을 넣은 경우
JSON.stringify("1", (key, value) => {
  console.log("key:", key, "value:", value); // key:  value: 1
  return value;
}); // '"1"'

// boolean을 넣은 경우
JSON.stringify(true, (key, value) => {
  console.log("key:", key, "value:", value); // key:  value: true
  return value;
}); // 'true'

// null을 넣은 경우
JSON.stringify(null, (key, value) => {
  console.log("key:", key, "value:", value);
  return value;
}); // 'null'

// undefined를 넣은 경우
JSON.stringify(undefined, (key, value) => {
  console.log("key:", key, "value:", value); // key:  value: undefined
  return value;
}); // undefined
```

먼저 원시 데이터를 넣은 경우를 살펴보면 key 속성이 없기 때문에 value에 값이 그대로 담겨 반환됩니다.

다만 undefined를 단일값으로 넣은 경우, 문자열화되지 못하고 그대로 undefined로 반환되게 됩니다.

```js
JSON.stringify(undefined, (key, value) => {
  if (value === undefined) return "__undefined__";
  return value;
}); // '"__undefined__"'
```

replacer 메서드를 통해 undefined를 처리할 수 있는 로직을 만들 수 있습니다.
replacer는 이렇게 JSON이 문자열로 직렬화하기 전에 재구성할 수 있습니다.

```js
// array를 넣은 경우
JSON.stringify([1, "2", true, null, undefined], (key, value) => {
  console.log("key:", key, "value:", value);
  // key:  value: (3) [1, 2, '3']
  // key: 0 value: 1
  // key: 1 value: 2
  // key: 2 value: true
  // key: 3 value: null
  // key: 4 value: undefined
  return value;
}); // '[1,"2",true,null,null]'
```

배열을 넣은 경우 key에 index가 담기고 각 요소의 값이 value에 담깁니다.
undefined를 제외한 각 요소는 동일하게 동작하지만 undefined가 있을 경우 null로 처리됩니다.

```js
// object를 넣은 경우
JSON.stringify(
  { a: 1, b: "2", c: true, d: null, e: undefined },
  (key, value) => {
    console.log("key:", key, "value:", value);
    // key: a value: 1
    // key: b value: 2
    // key: c value: true
    // key: d value: null
    // key: e value: undefined
    return value;
  }
); // '{"a":1,"b":"2","c":true,"d":null}'
```

객체를 넣은 경우 value가 undefined라면 제거되는 걸 확인할 수 있습니다.

## 4. 결론

---

```ts
export function hashKey(queryKey: QueryKey | MutationKey): string {
  return JSON.stringify(queryKey, (_, val) =>
    isPlainObject(val)
      ? Object.keys(val)
          .sort()
          .reduce((result, key) => {
            result[key] = val[key];
            return result;
          }, {} as any)
      : val
  );
}
```

다시 `hashKey` 함수를 살펴보겠습니다.

`queryKey`는 배열이기 때문에 replacer에서 각 배열을 순회하면서 직렬화되기 전에 각 요소를 재구성하게 됩니다.

1. `isPlainObject`는 배열과 null의 타입이 object이기 때문에 정말로 객체인 요소인지 확인하는 함수입니다. -> `{ b: 2, c: undefined, a: 1 } 통과!`
2. 요소가 객체라면 객체의 key들을 배열로 뽑아내어 정렬합니다. 정렬하는 이유는 JS에서 객체의 순서가 보장되지 않기 때문입니다. -> `['b', 'c', 'a'] -> ['a', 'b', 'c']`
3. 정렬된 key 배열을 다시 순회하며 알맞은 value를 넣어줍니다. -> `{ a: 1, b: 2, c: undefined}`
4. 마지막으로 직렬화 과정을 거치면서 undefined가 제거됩니다. -> `{ a: 1, b: 2 }`

```ts
// 서로 같은 쿼리
useQuery({ queryKey: ["hello", "world", 123, { a: 1, b: 2 }] });
useQuery({ queryKey: ["hello", "world", 123, { b: 2, c: undefined, a: 1 }] });
```

결론적으로, 두 `useQuery` 호출에서 전달한 `queryKey`는 배열 내부의 객체가 순서만 다를 뿐 같은 내용을 담고 있기 때문에, `hashKey` 함수에 의해 같은 문자열로 직렬화됩니다.

- 객체의 키는 `hashKey`에서 정렬된 순서로 재구성되고,
- `undefined` 값은 `JSON.stringify`에서 자동으로 제거되므로,
- 최종적으로 두 `queryKey`는 동일한 문자열로 직렬화되어 같은 쿼리로 인식됩니다.

결국 TanStack Query는 내부적으로 일관된 문자열로 정규화하여 비교하기 때문에 순서가 다르거나 undefined가 포함된 경우라도 동일한 키로 처리할 수 있게 됩니다.
