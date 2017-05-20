import {Api, RpcPayloadUntyped} from "./common";

export const makeApi = <A, B>(functions : Api<A, B>) : void => {
    onmessage = (e : MessageEvent) => {
        const payload : RpcPayloadUntyped = e.data;
        const {name, value, guid} = payload;
        functions[name](value, value => postMessage({name, value, guid}));
    };
};
