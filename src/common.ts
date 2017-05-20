export type Rpc<A, B> = (a : A, cont : (b:B) => void) => void;

export type Names<A> = {[K in keyof A] : K};

export type Api<A, B> = {[K in keyof (A | B)] : Rpc<A[K], B[K]>};

export type RpcPayloadUntyped = {name : string, value : any, guid : string};
export type RpcPayload<A> = {name : string; value : A, guid : string};
